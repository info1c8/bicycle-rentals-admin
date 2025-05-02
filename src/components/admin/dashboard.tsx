
import Icon from "@/components/ui/icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


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
        <Card>
          <CardHeader>
            <CardTitle>Последние заказы</CardTitle>
            <CardDescription>Информация о последних 5 заказах</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex-1">
                    <p className="font-medium">Заказ #{100 + i}</p>
                    <p className="text-sm text-muted-foreground">Клиент: Иван П.</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{(Math.random() * 5000 + 1000).toFixed(0)} ₽</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(Date.now() - i * 86400000).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <div className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Активен</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Популярные велосипеды</CardTitle>
            <CardDescription>Самые арендуемые модели</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Горный велосипед Trek", rentCount: 32 },
                { name: "Городской велосипед Schwinn", rentCount: 28 },
                { name: "Шоссейный велосипед Giant", rentCount: 25 },
                { name: "Складной велосипед Brompton", rentCount: 21 },
                { name: "Электровелосипед Haibike", rentCount: 18 }
              ].map((bike, i) => (
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
      </div>
    </div>
  );
};


interface DashboardCardProps {
  icon: string;
  title: string;
  value: string;
  description: string;
  trend?: string;
  trendUp?: boolean;
}

const DashboardCard = ({ icon, title, value, description, trend, trendUp }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon name={icon} className="text-muted-foreground" size={18} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`flex items-center mt-1 text-xs ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            <Icon name={trendUp ? 'TrendingUp' : 'TrendingDown'} size={14} className="mr-1" />
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminDashboard;
