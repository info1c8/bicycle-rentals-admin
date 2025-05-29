import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const RecentOrdersCard = () => {
  const recentOrders = [
    {
      id: "001",
      customer: "Иван Петров",
      bike: "Горный велосипед",
      status: "active",
      amount: "1200 ₽",
    },
    {
      id: "002",
      customer: "Мария Сидорова",
      bike: "Городской велосипед",
      status: "completed",
      amount: "800 ₽",
    },
    {
      id: "003",
      customer: "Александр Козлов",
      bike: "Электровелосипед",
      status: "pending",
      amount: "2400 ₽",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активна";
      case "completed":
        return "Завершена";
      case "pending":
        return "Ожидает";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние заказы</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {order.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.bike}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
                <p className="text-sm font-medium mt-1">{order.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrdersCard;
