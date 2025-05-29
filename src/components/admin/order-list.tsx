import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
type OrderStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";
type PaymentStatus = "unpaid" | "paid" | "refunded";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bikeTitle: string;
  bikeCategory: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  notes?: string;
}

// Моковые данные заказов
const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Иван Петров",
    customerEmail: "ivan@example.com",
    customerPhone: "+7 (999) 123-45-67",
    bikeTitle: "Горный велосипед Trek",
    bikeCategory: "Горные",
    startDate: new Date(2024, 4, 20),
    endDate: new Date(2024, 4, 22),
    totalPrice: 3600,
    status: "active",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 5),
  },
  {
    id: "ORD-002",
    customerName: "Мария Сидорова",
    customerEmail: "maria@example.com",
    customerPhone: "+7 (999) 234-56-78",
    bikeTitle: "Городской велосипед",
    bikeCategory: "Городские",
    startDate: new Date(2024, 4, 25),
    endDate: new Date(2024, 4, 27),
    totalPrice: 2400,
    status: "pending",
    paymentStatus: "unpaid",
    createdAt: subDays(new Date(), 2),
  },
  {
    id: "ORD-003",
    customerName: "Алексей Козлов",
    customerEmail: "alex@example.com",
    customerPhone: "+7 (999) 345-67-89",
    bikeTitle: "Электровелосипед Premium",
    bikeCategory: "Электро",
    startDate: new Date(2024, 4, 15),
    endDate: new Date(2024, 4, 18),
    totalPrice: 7200,
    status: "completed",
    paymentStatus: "paid",
    createdAt: subDays(new Date(), 10),
  },
];

/**
 * Компонент для управления заказами
 */
const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const { toast } = useToast();

  // Фильтрация заказов
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.bikeTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Функции для получения статистики
  const getOrderStats = () => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const active = orders.filter((o) => o.status === "active").length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const totalRevenue = orders
      .filter((o) => o.paymentStatus === "paid")
      .reduce((sum, o) => sum + o.totalPrice, 0);

    return { total, pending, active, completed, totalRevenue };
  };

  const stats = getOrderStats();

  // Функция для изменения статуса заказа
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
    toast({
      title: "Статус обновлен",
      description: `Заказ ${orderId} переведен в статус "${getStatusText(newStatus)}"`,
    });
  };

  // Функция для экспорта в CSV
  const exportToCSV = () => {
    const headers = [
      "ID",
      "Клиент",
      "Велосипед",
      "Начало",
      "Конец",
      "Сумма",
      "Статус",
    ];
    const csvData = filteredOrders.map((order) => [
      order.id,
      order.customerName,
      order.bikeTitle,
      format(order.startDate, "dd.MM.yyyy"),
      format(order.endDate, "dd.MM.yyyy"),
      order.totalPrice,
      getStatusText(order.status),
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Экспорт завершен",
      description: "Данные заказов успешно экспортированы в CSV",
    });
  };

  // Вспомогательные функции
  const getStatusText = (status: OrderStatus) => {
    const statusMap = {
      pending: "Ожидает",
      confirmed: "Подтвержден",
      active: "Активный",
      completed: "Завершен",
      cancelled: "Отменен",
    };
    return statusMap[status];
  };

  const getStatusColor = (status: OrderStatus) => {
    const colorMap = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colorMap[status];
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    const colorMap = {
      unpaid: "bg-red-100 text-red-800",
      paid: "bg-green-100 text-green-800",
      refunded: "bg-gray-100 text-gray-800",
    };
    return colorMap[status];
  };

  return (
    <div className="space-y-6">
      {/* Статистические карточки */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Icon name="ShoppingCart" size={20} className="text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Всего заказов</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Ожидающие</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Play" size={20} className="text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Активные</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Check" size={20} className="text-gray-600" />
              <div>
                <p className="text-sm text-muted-foreground">Завершенные</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Icon name="DollarSign" size={20} className="text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Выручка</p>
                <p className="text-2xl font-bold">
                  {stats.totalRevenue.toLocaleString()} ₽
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Основная карточка со списком заказов */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Управление заказами</CardTitle>
              <CardDescription>
                Просмотр и управление всеми заказами на аренду велосипедов
              </CardDescription>
            </div>
            <Button onClick={exportToCSV} variant="outline">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт CSV
            </Button>
          </div>

          {/* Фильтры и поиск */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по клиенту, ID заказа или велосипеду..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Фильтр по статусу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="pending">Ожидающие</SelectItem>
                <SelectItem value="confirmed">Подтвержденные</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
                <SelectItem value="cancelled">Отмененные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID заказа</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Велосипед</TableHead>
                <TableHead>Период аренды</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Оплата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.customerEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.bikeTitle}</p>
                      <Badge variant="secondary" className="text-xs">
                        {order.bikeCategory}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        {format(order.startDate, "dd.MM.yyyy", { locale: ru })}
                      </p>
                      <p className="text-muted-foreground">
                        до {format(order.endDate, "dd.MM.yyyy", { locale: ru })}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.totalPrice.toLocaleString()} ₽
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getPaymentStatusColor(order.paymentStatus)}
                    >
                      {order.paymentStatus === "paid"
                        ? "Оплачен"
                        : order.paymentStatus === "unpaid"
                          ? "Не оплачен"
                          : "Возврат"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Icon name="MoreHorizontal" size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedOrder(order);
                            setIsOrderDialogOpen(true);
                          }}
                        >
                          <Icon name="Eye" size={16} className="mr-2" />
                          Подробности
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "confirmed")
                          }
                        >
                          <Icon name="Check" size={16} className="mr-2" />
                          Подтвердить
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "active")}
                        >
                          <Icon name="Play" size={16} className="mr-2" />
                          Активировать
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "completed")
                          }
                        >
                          <Icon name="CheckCircle" size={16} className="mr-2" />
                          Завершить
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            updateOrderStatus(order.id, "cancelled")
                          }
                          className="text-red-600"
                        >
                          <Icon name="X" size={16} className="mr-2" />
                          Отменить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <p className="text-sm text-muted-foreground">
            Показано {filteredOrders.length} из {orders.length} заказов
          </p>
        </CardFooter>
      </Card>

      {/* Диалог с подробностями заказа */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Подробности заказа {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Полная информация о заказе и клиенте
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <Tabs defaultValue="order" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="order">Заказ</TabsTrigger>
                  <TabsTrigger value="customer">Клиент</TabsTrigger>
                </TabsList>

                <TabsContent value="order" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Велосипед</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.bikeTitle}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Категория</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.bikeCategory}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Начало аренды
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {format(selectedOrder.startDate, "dd.MM.yyyy HH:mm", {
                          locale: ru,
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Конец аренды
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {format(selectedOrder.endDate, "dd.MM.yyyy HH:mm", {
                          locale: ru,
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Общая стоимость
                      </label>
                      <p className="text-lg font-bold">
                        {selectedOrder.totalPrice.toLocaleString()} ₽
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Дата создания
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {format(selectedOrder.createdAt, "dd.MM.yyyy HH:mm", {
                          locale: ru,
                        })}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {getStatusText(selectedOrder.status)}
                      </Badge>
                      <Badge
                        className={getPaymentStatusColor(
                          selectedOrder.paymentStatus,
                        )}
                      >
                        {selectedOrder.paymentStatus === "paid"
                          ? "Оплачен"
                          : selectedOrder.paymentStatus === "unpaid"
                            ? "Не оплачен"
                            : "Возврат"}
                      </Badge>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="customer" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium">Имя клиента</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.customerName}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.customerEmail}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Телефон</label>
                      <p className="text-sm text-muted-foreground">
                        {selectedOrder.customerPhone}
                      </p>
                    </div>
                    {selectedOrder.notes && (
                      <div>
                        <label className="text-sm font-medium">
                          Примечания
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {selectedOrder.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOrderDialogOpen(false)}
            >
              Закрыть
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderList;
