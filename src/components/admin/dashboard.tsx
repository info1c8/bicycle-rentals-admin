
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

/**
 * Компонент панели управления с обзорной информацией
 */
const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          icon="Bike" 
          title="Велосипеды" 
          value="42" 
          description="Всего в каталоге"
          trend="+3 за неделю"
          trendUp
        />
        <DashboardCard 
          icon="ShoppingBag" 
          title="Заказы" 
          value="128" 
          description="Всего заказов"
          trend="+12 за неделю"
          trendUp
        />
        <DashboardCard 
          icon="Users" 
          title="Клиенты" 
          value="305" 
          description="Зарегистрировано"
          trend="+8 за неделю"
          trendUp
        />
        <DashboardCard 
          icon="CreditCard" 
          title="Выручка" 
          value="458 200 ₽" 
          description="За все время"
          trend="+42 500 ₽ за неделю"
          trendUp
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <RecentOrdersCard />
        <PopularBikesCard />
      </div>
    </div>
  );
};

// Компонент карточки с показателем
interface DashboardCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
  trend?: string;
  trendUp?: boolean;
}

const DashboardCard = ({ 
  icon, 
  title, 
  value, 
  description, 
  trend, 
  trendUp 
}: DashboardCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icon name={icon as any} className="text-primary" size={24} />
          </div>
          {trend && (
            <span className={`text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend}
            </span>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold">{value}</p>
          <div className="text-xs text-muted-foreground">
            {title} • {description}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Компонент карточки с последними заказами
const RecentOrdersCard = () => {
  const recentOrders = [
    { id: 101, customer: "Иван П.", amount: 2500, date: new Date(Date.now() - 1 * 86400000), status: "Активен" },
    { id: 102, customer: "Анна С.", amount: 4200, date: new Date(Date.now() - 2 * 86400000), status: "Активен" },
    { id: 103, customer: "Максим К.", amount: 1800, date: new Date(Date.now() - 3 * 86400000), status: "Завершен" },
    { id: 104, customer: "Ольга В.", amount: 3600, date: new Date(Date.now() - 4 * 86400000), status: "Активен" },
    { id: 105, customer: "Дмитрий Н.", amount: 5100, date: new Date(Date.now() - 5 * 86400000), status: "Завершен" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Последние заказы</CardTitle>
        <CardDescription>Информация о последних 5 заказах</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex-1">
                <p className="font-medium">Заказ #{order.id}</p>
                <p className="text-sm text-muted-foreground">Клиент: {order.customer}</p>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-medium">{order.amount} ₽</span>
                <span className="text-xs text-muted-foreground">
                  {order.date.toLocaleDateString('ru-RU')}
                </span>
              </div>
              <div className={`px-2 py-1 text-xs rounded-full ${
                order.status === "Активен" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-blue-100 text-blue-800"
              }`}>
                {order.status}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Компонент карточки с популярными велосипедами
const PopularBikesCard = () => {
  const popularBikes = [
    { name: "Горный велосипед Trek", rentCount: 32 },
    { name: "Городской велосипед Schwinn", rentCount: 28 },
    { name: "Шоссейный велосипед Giant", rentCount: 25 },
    { name: "Складной велосипед Brompton", rentCount: 21 },
    { name: "Электровелосипед Haibike", rentCount: 18 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Популярные велосипеды</CardTitle>
        <CardDescription>Самые арендуемые модели</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularBikes.map((bike, i) => (
            <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Icon name="Bike" className="text-primary" size={20} />
              </div>
              <div className="flex-1">
                <p className="font-medium">{bike.name}</p>
                <p className="text-sm text-muted-foreground">{bike.rentCount} аренд</p>
              </div>
              <div className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">#{i + 1}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
