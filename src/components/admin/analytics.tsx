
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

/**
 * Компонент аналитики для админ-панели
 */
const AdminAnalytics = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Аналитика</CardTitle>
          <CardDescription>
            Подробная статистика по аренде велосипедов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="revenue" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Выручка</TabsTrigger>
              <TabsTrigger value="rentals">Аренды</TabsTrigger>
              <TabsTrigger value="bikes">Велосипеды</TabsTrigger>
              <TabsTrigger value="customers">Клиенты</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue" className="space-y-6">
              <RevenueAnalytics />
            </TabsContent>
            
            <TabsContent value="rentals" className="space-y-6">
              <RentalAnalytics />
            </TabsContent>
            
            <TabsContent value="bikes" className="space-y-6">
              <BikeAnalytics />
            </TabsContent>
            
            <TabsContent value="customers" className="space-y-6">
              <CustomerAnalytics />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Компонент аналитики выручки
const RevenueAnalytics = () => {
  // Данные для графика доходов по месяцам
  const revenueData = [
    { name: 'Янв', value: 22000 },
    { name: 'Фев', value: 25000 },
    { name: 'Мар', value: 35000 },
    { name: 'Апр', value: 45000 },
    { name: 'Май', value: 68000 },
    { name: 'Июн', value: 93000 },
    { name: 'Июл', value: 120000 },
    { name: 'Авг', value: 115000 },
    { name: 'Сен', value: 89000 },
    { name: 'Окт', value: 58000 },
    { name: 'Ноя', value: 32000 },
    { name: 'Дек', value: 42000 },
  ];

  // Данные для графика доходов по категориям
  const categoryData = [
    { name: 'Горные', value: 185000 },
    { name: 'Городские', value: 145000 },
    { name: 'Шоссейные', value: 98000 },
    { name: 'Электро', value: 178000 },
    { name: 'Складные', value: 65000 },
    { name: 'Детские', value: 42000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9F88FF', '#FF6384'];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Общая выручка" 
          value="745 200 ₽" 
          trend="+12.5%" 
          trendUp={true}
          icon="DollarSign"
        />
        <AnalyticsCard 
          title="Средний чек" 
          value="3 240 ₽" 
          trend="+5.8%" 
          trendUp={true}
          icon="CreditCard"
        />
        <AnalyticsCard 
          title="Выручка за месяц" 
          value="58 000 ₽" 
          trend="-3.2%" 
          trendUp={false}
          icon="BarChart"
        />
        <AnalyticsCard 
          title="Прогноз на след. месяц" 
          value="62 000 ₽" 
          trend="+6.8%" 
          trendUp={true}
          icon="TrendingUp"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Выручка по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={revenueData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} ₽`, 'Выручка']}
                    labelFormatter={(label) => `${label} 2024`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Выручка"
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Выручка по категориям велосипедов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} ₽`, 'Выручка']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Компонент аналитики аренд
const RentalAnalytics = () => {
  // Данные аренд по месяцам
  const monthlyRentalsData = [
    { name: 'Янв', value: 42 },
    { name: 'Фев', value: 55 },
    { name: 'Мар', value: 78 },
    { name: 'Апр', value: 105 },
    { name: 'Май', value: 162 },
    { name: 'Июн', value: 205 },
    { name: 'Июл', value: 248 },
    { name: 'Авг', value: 236 },
    { name: 'Сен', value: 178 },
    { name: 'Окт', value: 120 },
    { name: 'Ноя', value: 68 },
    { name: 'Дек', value: 85 },
  ];

  // Данные по популярности длительности аренды
  const durationData = [
    { name: '1-3 часа', value: 485 },
    { name: '4-6 часов', value: 375 },
    { name: '7-12 часов', value: 210 },
    { name: '1 день', value: 178 },
    { name: '2-3 дня', value: 98 },
    { name: '4+ дней', value: 42 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Всего аренд" 
          value="1 582" 
          trend="+18.2%" 
          trendUp={true}
          icon="Calendar"
        />
        <AnalyticsCard 
          title="Аренд за месяц" 
          value="120" 
          trend="-5.1%" 
          trendUp={false}
          icon="CalendarDays"
        />
        <AnalyticsCard 
          title="Средняя длительность" 
          value="5.2 ч" 
          trend="+0.8%" 
          trendUp={true}
          icon="Clock"
        />
        <AnalyticsCard 
          title="Отмен аренды" 
          value="28" 
          trend="-12.5%" 
          trendUp={true}
          icon="XCircle"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Количество аренд по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRentalsData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Аренд" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Популярная длительность аренды</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={durationData}
                  margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Количество" 
                    fill="#82ca9d" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Компонент аналитики велосипедов
const BikeAnalytics = () => {
  // Данные популярности по категориям
  const categoryPopularityData = [
    { name: 'Горные', value: 425 },
    { name: 'Городские', value: 385 },
    { name: 'Шоссейные', value: 210 },
    { name: 'Электро', value: 305 },
    { name: 'Складные', value: 175 },
    { name: 'Детские', value: 82 },
  ];

  // Данные загруженности велосипедов
  const bikeUtilizationData = [
    { name: 'Янв', utilized: 32, idle: 68 },
    { name: 'Фев', utilized: 38, idle: 62 },
    { name: 'Мар', utilized: 45, idle: 55 },
    { name: 'Апр', utilized: 58, idle: 42 },
    { name: 'Май', utilized: 72, idle: 28 },
    { name: 'Июн', utilized: 85, idle: 15 },
    { name: 'Июл', utilized: 92, idle: 8 },
    { name: 'Авг', utilized: 88, idle: 12 },
    { name: 'Сен', utilized: 75, idle: 25 },
    { name: 'Окт', utilized: 56, idle: 44 },
    { name: 'Ноя', utilized: 38, idle: 62 },
    { name: 'Дек', utilized: 42, idle: 58 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9F88FF', '#FF6384'];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Всего велосипедов" 
          value="42" 
          trend="+7.1%" 
          trendUp={true}
          icon="Bike"
        />
        <AnalyticsCard 
          title="Загруженность" 
          value="76%" 
          trend="+3.5%" 
          trendUp={true}
          icon="BarChart3"
        />
        <AnalyticsCard 
          title="В ремонте" 
          value="3" 
          trend="-1" 
          trendUp={true}
          icon="Tool"
        />
        <AnalyticsCard 
          title="Средний износ" 
          value="22%" 
          trend="+2.5%" 
          trendUp={false}
          icon="Activity"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Популярность категорий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryPopularityData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="value" 
                    name="Количество аренд" 
                    fill="#8884d8" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Загруженность велосипедов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={bikeUtilizationData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  stackOffset="expand"
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} unit="%" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                  <Bar 
                    dataKey="utilized" 
                    name="Используется" 
                    stackId="a" 
                    fill="#82ca9d" 
                  />
                  <Bar 
                    dataKey="idle" 
                    name="Простаивает" 
                    stackId="a" 
                    fill="#ffc658" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Компонент аналитики клиентов
const CustomerAnalytics = () => {
  // Данные новых клиентов по месяцам
  const newCustomersData = [
    { name: 'Янв', value: 12 },
    { name: 'Фев', value: 15 },
    { name: 'Мар', value: 22 },
    { name: 'Апр', value: 28 },
    { name: 'Май', value: 38 },
    { name: 'Июн', value: 45 },
    { name: 'Июл', value: 52 },
    { name: 'Авг', value: 48 },
    { name: 'Сен', value: 35 },
    { name: 'Окт', value: 25 },
    { name: 'Ноя', value: 18 },
    { name: 'Дек', value: 22 },
  ];

  // Данные по возрастным группам клиентов
  const ageGroupData = [
    { name: '18-24', value: 85 },
    { name: '25-34', value: 120 },
    { name: '35-44', value: 68 },
    { name: '45-54', value: 42 },
    { name: '55+', value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9F88FF'];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard 
          title="Всего клиентов" 
          value="305" 
          trend="+18.2%" 
          trendUp={true}
          icon="Users"
        />
        <AnalyticsCard 
          title="Новых в этом месяце" 
          value="25" 
          trend="-10.7%" 
          trendUp={false}
          icon="UserPlus"
        />
        <AnalyticsCard 
          title="Активных клиентов" 
          value="175" 
          trend="+5.2%" 
          trendUp={true}
          icon="UserCheck"
        />
        <AnalyticsCard 
          title="Среднее кол-во аренд" 
          value="4.8" 
          trend="+0.3" 
          trendUp={true}
          icon="BarChart"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Новые клиенты по месяцам</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={newCustomersData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    name="Новых клиентов" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Возрастные группы клиентов</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageGroupData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ageGroupData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} клиентов`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Компонент карточки с показателем для аналитики
interface AnalyticsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: string;
}

const AnalyticsCard = ({ title, value, trend, trendUp, icon }: AnalyticsCardProps) => {
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
            {title}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAnalytics;
