
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { format, subDays } from "date-fns";
import { ru } from "date-fns/locale";

// Типы для клиентов
interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: "active" | "inactive" | "blocked";
  registrationDate: Date;
  lastActivity: Date;
  ordersCount: number;
  totalSpent: number;
  notes?: string;
  avatar?: string;
}

interface Order {
  id: number;
  date: Date;
  bikes: string[];
  amount: number;
  status: "pending" | "active" | "completed" | "canceled";
}

/**
 * Компонент для управления клиентами
 */
const AdminCustomerList = () => {
  const [customers, setCustomers] = useState<Customer[]>(generateMockCustomers());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [detailsTab, setDetailsTab] = useState("info");
  const { toast } = useToast();

  // Фильтрация клиентов
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      searchQuery.trim() === "" || 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === "" || customer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Изменение статуса клиента
  const handleStatusChange = (customerId: number, newStatus: Customer["status"]) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === customerId 
          ? { ...customer, status: newStatus } 
          : customer
      )
    );
    
    toast({
      title: "Статус клиента изменен",
      description: `Клиент №${customerId} теперь имеет статус "${getStatusLabel(newStatus)}".`,
    });
  };

  // Открытие деталей клиента
  const openCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    // Генерируем заказы для этого клиента
    setCustomerOrders(generateMockOrdersForCustomer(customer.id, customer.ordersCount));
    setIsCustomerDetailsOpen(true);
  };

  // Сохранение примечаний к клиенту
  const handleSaveNotes = (customerId: number, notes: string) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === customerId 
          ? { ...customer, notes } 
          : customer
      )
    );
    
    toast({
      title: "Примечания сохранены",
      description: "Примечания к клиенту успешно обновлены.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Управление клиентами</CardTitle>
              <CardDescription>
                Просмотр и управление клиентами проката
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="FileDown" className="mr-2" size={16} />
                Экспорт
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Users" className="mr-2" size={16} />
                Сегменты
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Фильтры и поиск */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Поиск по имени, email или телефону..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <select
              className="h-10 w-full sm:w-[180px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
              <option value="blocked">Заблокированные</option>
            </select>
          </div>

          {/* Таблица клиентов */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px]">ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead className="hidden md:table-cell">Контакты</TableHead>
                  <TableHead className="hidden md:table-cell">Регистрация</TableHead>
                  <TableHead className="text-right">Заказов</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                  <TableHead className="text-center">Статус</TableHead>
                  <TableHead className="w-[80px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Клиенты не найдены
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium">{customer.name}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-muted-foreground">{customer.phone}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>{format(customer.registrationDate, "dd.MM.yyyy", { locale: ru })}</div>
                        <div className="text-xs text-muted-foreground">
                          {getDaysAgo(customer.lastActivity)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{customer.ordersCount}</TableCell>
                      <TableCell className="text-right font-medium">
                        {customer.totalSpent} ₽
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={customer.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Icon name="MoreHorizontal" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Действия</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => openCustomerDetails(customer)}>
                              <Icon name="Eye" className="mr-2" size={14} />
                              Просмотр
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Изменить статус</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(customer.id, "active")}
                              disabled={customer.status === "active"}
                            >
                              <Icon name="CheckCircle" className="mr-2" size={14} />
                              Активен
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(customer.id, "inactive")}
                              disabled={customer.status === "inactive"}
                            >
                              <Icon name="Clock" className="mr-2" size={14} />
                              Неактивен
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(customer.id, "blocked")}
                              disabled={customer.status === "blocked"}
                            >
                              <Icon name="Ban" className="mr-2" size={14} />
                              Заблокирован
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Показано {filteredCustomers.length} из {customers.length} клиентов
          </div>
          <div className="text-sm font-medium">
            Общая сумма: {filteredCustomers.reduce((sum, customer) => sum + customer.totalSpent, 0)} ₽
          </div>
        </CardFooter>
      </Card>

      {/* Диалог с деталями клиента */}
      <Dialog open={isCustomerDetailsOpen} onOpenChange={setIsCustomerDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                    <AvatarFallback>{getInitials(selectedCustomer.name)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedCustomer.name}</span>
                  <StatusBadge status={selectedCustomer.status} className="ml-2" />
                </DialogTitle>
                <DialogDescription>
                  Клиент №{selectedCustomer.id} • С нами с {format(selectedCustomer.registrationDate, "dd MMMM yyyy", { locale: ru })}
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={detailsTab} onValueChange={setDetailsTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="info">Информация</TabsTrigger>
                  <TabsTrigger value="orders">Заказы</TabsTrigger>
                  <TabsTrigger value="activity">Активность</TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-4 mt-4">
                  {/* Основная информация */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Контактная информация</h3>
                      <div className="space-y-2">
                        <div className="bg-muted/40 p-3 rounded-md flex items-center">
                          <Icon name="Mail" size={16} className="mr-2 text-muted-foreground" />
                          <span>{selectedCustomer.email}</span>
                        </div>
                        <div className="bg-muted/40 p-3 rounded-md flex items-center">
                          <Icon name="Phone" size={16} className="mr-2 text-muted-foreground" />
                          <span>{selectedCustomer.phone}</span>
                        </div>
                        {selectedCustomer.address && (
                          <div className="bg-muted/40 p-3 rounded-md flex items-center">
                            <Icon name="MapPin" size={16} className="mr-2 text-muted-foreground shrink-0" />
                            <span>{selectedCustomer.address}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Статистика</h3>
                      <div className="space-y-2">
                        <div className="bg-muted/40 p-3 rounded-md flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon name="ShoppingBag" size={16} className="mr-2 text-muted-foreground" />
                            <span>Всего заказов</span>
                          </div>
                          <span className="font-medium">{selectedCustomer.ordersCount}</span>
                        </div>
                        <div className="bg-muted/40 p-3 rounded-md flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon name="CreditCard" size={16} className="mr-2 text-muted-foreground" />
                            <span>Общая сумма</span>
                          </div>
                          <span className="font-medium">{selectedCustomer.totalSpent} ₽</span>
                        </div>
                        <div className="bg-muted/40 p-3 rounded-md flex items-center justify-between">
                          <div className="flex items-center">
                            <Icon name="Calendar" size={16} className="mr-2 text-muted-foreground" />
                            <span>Последняя активность</span>
                          </div>
                          <span className="font-medium">{getDaysAgo(selectedCustomer.lastActivity)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Примечания */}
                  <div>
                    <h3 className="text-sm font-medium mb-2">Примечания</h3>
                    <textarea
                      className="w-full border rounded-md p-2 text-sm min-h-[100px]"
                      placeholder="Добавьте примечания к клиенту здесь..."
                      defaultValue={selectedCustomer.notes || ""}
                      onBlur={(e) => handleSaveNotes(selectedCustomer.id, e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="orders" className="mt-4">
                  <h3 className="text-sm font-medium mb-2">История заказов</h3>
                  {customerOrders.length === 0 ? (
                    <div className="text-center p-4 text-muted-foreground">
                      У этого клиента пока нет заказов
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {customerOrders.map((order) => (
                        <div key={order.id} className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center">
                                <span className="font-medium mr-2">Заказ #{order.id}</span>
                                <OrderStatusBadge status={order.status} />
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {format(order.date, "dd MMMM yyyy", { locale: ru })}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{order.amount} ₽</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {order.bikes.length} {getItemsText(order.bikes.length)}
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            {order.bikes.join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="activity" className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Активность клиента</h3>
                  <div className="space-y-3">
                    {generateMockActivity().map((activity, index) => (
                      <div key={index} className="flex items-start p-2 border-b last:border-0">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                          <Icon name={activity.icon as any} size={16} className="text-primary" />
                        </div>
                        <div>
                          <div>{activity.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {activity.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCustomerDetailsOpen(false)}
                  >
                    Закрыть
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      // Имитируем отправку электронного письма
                      toast({
                        title: "Сообщение отправлено",
                        description: `Сообщение отправлено на почту ${selectedCustomer.email}`,
                      });
                    }}
                  >
                    <Icon name="Mail" className="mr-2" size={16} />
                    Написать клиенту
                  </Button>
                  <Button>
                    <Icon name="Phone" className="mr-2" size={16} />
                    Позвонить
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Вспомогательные компоненты
interface StatusBadgeProps {
  status: Customer["status"];
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  let variant: "outline" | "secondary" | "destructive" = "outline";
  let label = getStatusLabel(status);
  
  if (status === "active") variant = "secondary";
  if (status === "blocked") variant = "destructive";
  
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
};

interface OrderStatusBadgeProps {
  status: Order["status"];
}

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  let variant: "outline" | "secondary" | "destructive" = "outline";
  let label = getOrderStatusLabel(status);
  
  if (status === "active") variant = "secondary";
  if (status === "canceled") variant = "destructive";
  
  return (
    <Badge variant={variant} className="text-xs">
      {label}
    </Badge>
  );
};

// Вспомогательные функции
function getStatusLabel(status: Customer["status"]): string {
  switch (status) {
    case "active": return "Активен";
    case "inactive": return "Неактивен";
    case "blocked": return "Заблокирован";
  }
}

function getOrderStatusLabel(status: Order["status"]): string {
  switch (status) {
    case "pending": return "Ожидает";
    case "active": return "Активен";
    case "completed": return "Завершен";
    case "canceled": return "Отменен";
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

function getDaysAgo(date: Date): string {
  const days = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (days === 0) return "Сегодня";
  if (days === 1) return "Вчера";
  
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;
  
  let daysText = "дней";
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    daysText = "день";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    daysText = "дня";
  }
  
  return `${days} ${daysText} назад`;
}

function getItemsText(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "велосипед";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return "велосипеда";
  } else {
    return "велосипедов";
  }
}

// Генерация моковых данных
function generateMockCustomers(): Customer[] {
  const customers: Customer[] = [];
  
  const names = [
    "Иванов Павел",
    "Смирнова Анна",
    "Козлов Максим",
    "Васильева Ольга",
    "Николаев Дмитрий",
    "Федоров Алексей",
    "Морозова Екатерина",
    "Волков Артём",
    "Лебедева Софья",
    "Петров Игорь",
    "Михайлова Ирина",
    "Соколов Кирилл",
    "Зайцева Мария",
    "Сергеев Виталий",
    "Новикова Юлия",
  ];
  
  const statuses: Customer["status"][] = ["active", "inactive", "blocked"];
  
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const nameParts = name.split(' ');
    const email = `${nameParts[0].toLowerCase()}${i}@example.com`;
    const phone = `+7 (9${i + 10}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 90) + 10}`;
    
    // Случайная дата регистрации в пределах последних 2 лет
    const registrationDate = new Date();
    registrationDate.setDate(registrationDate.getDate() - Math.floor(Math.random() * 730));
    
    // Последняя активность в пределах от последнего месяца до даты регистрации
    const lastActivity = new Date();
    const daysSinceRegistration = Math.floor((new Date().getTime() - registrationDate.getTime()) / (1000 * 60 * 60 * 24));
    lastActivity.setDate(lastActivity.getDate() - Math.floor(Math.random() * Math.min(daysSinceRegistration, 30)));
    
    const ordersCount = Math.floor(Math.random() * 15);
    const totalSpent = ordersCount * (Math.floor(Math.random() * 2000) + 1000);
    
    customers.push({
      id: i + 1,
      name,
      email,
      phone,
      address: Math.random() > 0.3 ? `ул. ${['Ленина', 'Пушкина', 'Гагарина', 'Мира', 'Советская'][Math.floor(Math.random() * 5)]}, д. ${Math.floor(Math.random() * 100) + 1}` : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      registrationDate,
      lastActivity,
      ordersCount,
      totalSpent,
      avatar: Math.random() > 0.5 ? `https://i.pravatar.cc/150?u=${i}` : undefined,
    });
  }
  
  return customers;
}

function generateMockOrdersForCustomer(customerId: number, count: number): Order[] {
  const orders: Order[] = [];
  
  const bikes = [
    "Горный велосипед Trek", 
    "Городской велосипед Schwinn", 
    "Шоссейный велосипед Giant",
    "Складной велосипед Brompton",
    "Электровелосипед Haibike",
    "Детский велосипед Cube",
    "Горный велосипед Specialized",
    "Городской велосипед Merida"
  ];
  
  const statuses: Order["status"][] = ["pending", "active", "completed", "canceled"];
  
  for (let i = 0; i < count; i++) {
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 365));
    
    const bikeCount = Math.floor(Math.random() * 3) + 1;
    const orderBikes: string[] = [];
    
    // Выбираем случайные велосипеды без повторений
    const availableBikes = [...bikes];
    for (let j = 0; j < bikeCount; j++) {
      if (availableBikes.length === 0) break;
      
      const index = Math.floor(Math.random() * availableBikes.length);
      orderBikes.push(availableBikes[index]);
      availableBikes.splice(index, 1);
    }
    
    const amount = orderBikes.length * (Math.floor(Math.random() * 1000) + 500);
    
    orders.push({
      id: 100 + customerId * 10 + i,
      date: orderDate,
      bikes: orderBikes,
      amount,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  
  // Сортируем заказы по дате (от новых к старым)
  return orders.sort((a, b) => b.date.getTime() - a.date.getTime());
}

function generateMockActivity() {
  return [
    {
      icon: "ShoppingCart",
      description: "Оформил заказ #115",
      date: "Сегодня, 14:32"
    },
    {
      icon: "Star",
      description: "Оставил отзыв о велосипеде 'Горный велосипед Trek'",
      date: "Вчера, 10:15"
    },
    {
      icon: "CheckCircle",
      description: "Завершил аренду велосипеда",
      date: "15.04.2025, 18:45"
    },
    {
      icon: "PhoneCall",
      description: "Звонил по поводу продления аренды",
      date: "12.04.2025, 11:20"
    },
    {
      icon: "Mail",
      description: "Отправлено напоминание о предстоящей аренде",
      date: "10.04.2025, 09:00"
    },
    {
      icon: "CreditCard",
      description: "Оплатил заказ #108",
      date: "05.04.2025, 16:35"
    }
  ];
}

export default AdminCustomerList;
