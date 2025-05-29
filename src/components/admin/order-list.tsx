
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { format, subDays } from "date-fns";
import { ru } from "date-fns/locale";

// Типы для заказов
interface Order {
  id: number;
  customer: {
    id: number;
    name: string;
    phone: string;
    email: string;
  };
  bikes: {
    id: number;
    name: string;
    quantity: number;
    pricePerHour: number;
    duration: number;
  }[];
  date: Date;
  startDate: Date;
  endDate: Date;
  status: "pending" | "active" | "completed" | "canceled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  paymentMethod: "cash" | "card" | "online";
  totalAmount: number;
  notes?: string;
}

/**
 * Компонент для управления заказами
 */
const AdminOrderList = () => {
  const [orders, setOrders] = useState<Order[]>(generateMockOrders());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const { toast } = useToast();

  // Фильтрация заказов
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      searchQuery.trim() === "" || 
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toString().includes(searchQuery) ||
      order.customer.phone.includes(searchQuery);
    
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    
    const matchesTab = 
      currentTab === "all" || 
      (currentTab === "active" && order.status === "active") ||
      (currentTab === "pending" && order.status === "pending") ||
      (currentTab === "completed" && order.status === "completed") ||
      (currentTab === "canceled" && order.status === "canceled");
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  // Изменение статуса заказа
  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus } 
          : order
      )
    );
    
    toast({
      title: "Статус заказа изменен",
      description: `Заказ #${orderId} теперь имеет статус "${getStatusLabel(newStatus)}".`,
    });
  };

  // Изменение статуса оплаты
  const handlePaymentStatusChange = (orderId: number, newStatus: Order["paymentStatus"]) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, paymentStatus: newStatus } 
          : order
      )
    );
    
    toast({
      title: "Статус оплаты изменен",
      description: `Заказ #${orderId} теперь имеет статус оплаты "${getPaymentStatusLabel(newStatus)}".`,
    });
  };

  // Открытие деталей заказа
  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };

  // Отмена заказа
  const handleCancelOrder = (orderId: number) => {
    handleStatusChange(orderId, "canceled");
  };

  // Сохранение примечаний к заказу
  const handleSaveNotes = (orderId: number, notes: string) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, notes } 
          : order
      )
    );
    
    toast({
      title: "Примечания сохранены",
      description: "Примечания к заказу успешно обновлены.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Управление заказами</CardTitle>
              <CardDescription>
                Просмотр и изменение статусов заказов
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="FileDown" className="mr-2" size={16} />
                Экспорт
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Printer" className="mr-2" size={16} />
                Печать
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Фильтры и поиск */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Поиск по имени, номеру заказа или телефону..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="active">Активен</SelectItem>
                <SelectItem value="completed">Завершен</SelectItem>
                <SelectItem value="canceled">Отменен</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Вкладки */}
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="pending">Ожидающие</TabsTrigger>
              <TabsTrigger value="active">Активные</TabsTrigger>
              <TabsTrigger value="completed">Завершенные</TabsTrigger>
              <TabsTrigger value="canceled">Отмененные</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Таблица заказов */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead className="hidden md:table-cell">Дата</TableHead>
                  <TableHead className="hidden md:table-cell">Период аренды</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                  <TableHead className="text-center">Статус</TableHead>
                  <TableHead className="text-center">Оплата</TableHead>
                  <TableHead className="w-[100px]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Заказы не найдены
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id}</TableCell>
                      <TableCell>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-xs text-muted-foreground">{order.customer.phone}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(order.date, "dd.MM.yyyy", { locale: ru })}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div>{format(order.startDate, "dd.MM.yyyy", { locale: ru })}</div>
                        <div className="text-xs text-muted-foreground">
                          до {format(order.endDate, "dd.MM.yyyy", { locale: ru })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {order.totalAmount} ₽
                      </TableCell>
                      <TableCell className="text-center">
                        <StatusBadge status={order.status} />
                      </TableCell>
                      <TableCell className="text-center">
                        <PaymentStatusBadge status={order.paymentStatus} />
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
                            <DropdownMenuItem onClick={() => openOrderDetails(order)}>
                              <Icon name="Eye" className="mr-2" size={14} />
                              Просмотр деталей
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Изменить статус</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order.id, "pending")}
                              disabled={order.status === "pending"}
                            >
                              <Icon name="Clock" className="mr-2" size={14} />
                              Ожидает
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order.id, "active")}
                              disabled={order.status === "active"}
                            >
                              <Icon name="Play" className="mr-2" size={14} />
                              Активен
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order.id, "completed")}
                              disabled={order.status === "completed"}
                            >
                              <Icon name="CheckCircle" className="mr-2" size={14} />
                              Завершен
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusChange(order.id, "canceled")}
                              disabled={order.status === "canceled"}
                            >
                              <Icon name="XCircle" className="mr-2" size={14} />
                              Отменен
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Статус оплаты</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handlePaymentStatusChange(order.id, "paid")}
                              disabled={order.paymentStatus === "paid"}
                            >
                              <Icon name="CreditCard" className="mr-2" size={14} />
                              Оплачен
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handlePaymentStatusChange(order.id, "unpaid")}
                              disabled={order.paymentStatus === "unpaid"}
                            >
                              <Icon name="AlertCircle" className="mr-2" size={14} />
                              Не оплачен
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handlePaymentStatusChange(order.id, "refunded")}
                              disabled={order.paymentStatus === "refunded"}
                            >
                              <Icon name="RotateCcw" className="mr-2" size={14} />
                              Возврат
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
            Показано {filteredOrders.length} из {orders.length} заказов
          </div>
          <div className="text-sm font-medium">
            Общая сумма: {filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0)} ₽
          </div>
        </CardFooter>
      </Card>

      {/* Диалог с деталями заказа */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Заказ #{selectedOrder.id}</span>
                  <StatusBadge status={selectedOrder.status} />
                </DialogTitle>
                <DialogDescription>
                  Детали заказа от {format(selectedOrder.date, "dd MMMM yyyy", { locale: ru })}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Информация о клиенте */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Информация о клиенте</h3>
                  <div className="bg-muted/40 p-3 rounded-md">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm font-medium">{selectedOrder.customer.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {selectedOrder.customer.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{selectedOrder.customer.phone}</div>
                        <div className="text-xs text-muted-foreground">{selectedOrder.customer.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Детали аренды */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Арендованные велосипеды</h3>
                  <div className="space-y-2">
                    {selectedOrder.bikes.map((bike, index) => (
                      <div key={index} className="bg-muted/40 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{bike.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {bike.pricePerHour} ₽/час × {bike.duration} час × {bike.quantity} шт.
                            </div>
                          </div>
                          <div className="text-right font-medium">
                            {bike.pricePerHour * bike.duration * bike.quantity} ₽
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Сводка заказа */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Сводка заказа</h3>
                  <div className="bg-muted/40 p-3 rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Период аренды:</span>
                      <span className="text-sm font-medium">
                        {format(selectedOrder.startDate, "dd.MM.yyyy", { locale: ru })} — {format(selectedOrder.endDate, "dd.MM.yyyy", { locale: ru })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Способ оплаты:</span>
                      <span className="text-sm font-medium">
                        {selectedOrder.paymentMethod === "cash" && "Наличные"}
                        {selectedOrder.paymentMethod === "card" && "Банковская карта"}
                        {selectedOrder.paymentMethod === "online" && "Онлайн-платеж"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Статус оплаты:</span>
                      <PaymentStatusBadge status={selectedOrder.paymentStatus} />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-sm font-bold">Итого:</span>
                      <span className="text-sm font-bold">{selectedOrder.totalAmount} ₽</span>
                    </div>
                  </div>
                </div>
                
                {/* Примечания */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Примечания к заказу</h3>
                  <textarea
                    className="w-full border rounded-md p-2 text-sm min-h-[80px]"
                    placeholder="Добавьте примечания к заказу здесь..."
                    defaultValue={selectedOrder.notes || ""}
                    onBlur={(e) => handleSaveNotes(selectedOrder.id, e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsOrderDetailsOpen(false)}
                  >
                    Закрыть
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleCancelOrder(selectedOrder.id);
                      setIsOrderDetailsOpen(false);
                    }}
                    disabled={selectedOrder.status === "canceled"}
                  >
                    Отменить заказ
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => {
                      // Имитируем отправку электронного письма
                      toast({
                        title: "Чек отправлен",
                        description: `Чек был отправлен на почту ${selectedOrder.customer.email}`,
                      });
                    }}
                  >
                    <Icon name="Mail" className="mr-2" size={16} />
                    Отправить чек
                  </Button>
                  <Button
                    onClick={() => {
                      // Имитируем печать чека
                      toast({
                        title: "Печать чека",
                        description: "Чек отправлен на печать",
                      });
                    }}
                  >
                    <Icon name="Printer" className="mr-2" size={16} />
                    Печать чека
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
  status: Order["status"];
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  let variant: "outline" | "secondary" | "destructive" = "outline";
  let label = getStatusLabel(status);
  
  if (status === "active") variant = "secondary";
  if (status === "canceled") variant = "destructive";
  
  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {label}
    </Badge>
  );
};

interface PaymentStatusBadgeProps {
  status: Order["paymentStatus"];
}

const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  let variant: "outline" | "secondary" | "destructive" = "outline";
  let label = getPaymentStatusLabel(status);
  
  if (status === "paid") variant = "secondary";
  if (status === "refunded") variant = "destructive";
  
  return (
    <Badge variant={variant} className="whitespace-nowrap">
      {label}
    </Badge>
  );
};

// Вспомогательные функции
function getStatusLabel(status: Order["status"]): string {
  switch (status) {
    case "pending": return "Ожидает";
    case "active": return "Активен";
    case "completed": return "Завершен";
    case "canceled": return "Отменен";
  }
}

function getPaymentStatusLabel(status: Order["paymentStatus"]): string {
  switch (status) {
    case "paid": return "Оплачен";
    case "unpaid": return "Не оплачен";
    case "refunded": return "Возврат";
  }
}

// Генерация моковых данных
function generateMockOrders(): Order[] {
  const orders: Order[] = [];
  
  const bikes = [
    { id: 1, name: "Горный велосипед Trek", pricePerHour: 250 },
    { id: 2, name: "Городской велосипед Schwinn", pricePerHour: 200 },
    { id: 3, name: "Шоссейный велосипед Giant", pricePerHour: 300 },
    { id: 4, name: "Складной велосипед Brompton", pricePerHour: 180 },
    { id: 5, name: "Электровелосипед Haibike", pricePerHour: 400 },
  ];
  
  const customers = [
    { id: 1, name: "Иванов Павел", phone: "+7 (912) 345-67-89", email: "ivanov@example.com" },
    { id: 2, name: "Смирнова Анна", phone: "+7 (923) 456-78-90", email: "smirnova@example.com" },
    { id: 3, name: "Козлов Максим", phone: "+7 (934) 567-89-01", email: "kozlov@example.com" },
    { id: 4, name: "Васильева Ольга", phone: "+7 (945) 678-90-12", email: "vasilyeva@example.com" },
    { id: 5, name: "Николаев Дмитрий", phone: "+7 (956) 789-01-23", email: "nikolaev@example.com" },
  ];
  
  const statuses: Order["status"][] = ["pending", "active", "completed", "canceled"];
  const paymentStatuses: Order["paymentStatus"][] = ["paid", "unpaid", "refunded"];
  const paymentMethods: Order["paymentMethod"][] = ["cash", "card", "online"];
  
  for (let i = 1; i <= 25; i++) {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const date = subDays(new Date(), Math.floor(Math.random() * 30));
    const startDate = subDays(new Date(), Math.floor(Math.random() * 14));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1);
    
    const bikeCount = Math.floor(Math.random() * 3) + 1;
    const orderBikes = [];
    let totalAmount = 0;
    
    for (let j = 0; j < bikeCount; j++) {
      const bike = bikes[Math.floor(Math.random() * bikes.length)];
      const quantity = Math.floor(Math.random() * 2) + 1;
      const duration = Math.floor(Math.random() * 24) + 1;
      
      orderBikes.push({
        id: bike.id,
        name: bike.name,
        quantity,
        pricePerHour: bike.pricePerHour,
        duration,
      });
      
      totalAmount += bike.pricePerHour * quantity * duration;
    }
    
    orders.push({
      id: 100 + i,
      customer,
      bikes: orderBikes,
      date,
      startDate,
      endDate,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      totalAmount,
    });
  }
  
  return orders;
}

export default AdminOrderList;
