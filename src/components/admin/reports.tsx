
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
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { DateRangePicker, DateRange } from "@/components/ui/date-range-picker";
import { addDays, format, subDays, subMonths } from "date-fns";
import { ru } from "date-fns/locale";

/**
 * Компонент для генерации отчетов админ-панели
 */
const AdminReports = () => {
  const [reportType, setReportType] = useState("rentals");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });
  
  // Функция для форматирования даты
  const formatDate = (date: Date) => {
    return format(date, "dd.MM.yyyy", { locale: ru });
  };

  // Функция для отображения отчета в зависимости от типа
  const renderReport = () => {
    switch (reportType) {
      case "rentals":
        return <RentalsReport dateRange={dateRange} />;
      case "revenue":
        return <RevenueReport dateRange={dateRange} />;
      case "bikes":
        return <BikesReport dateRange={dateRange} />;
      case "customers":
        return <CustomersReport dateRange={dateRange} />;
      default:
        return <RentalsReport dateRange={dateRange} />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Отчеты</CardTitle>
          <CardDescription>
            Генерация отчетов по работе проката велосипедов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Фильтры отчетов */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Тип отчета</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип отчета" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rentals">Отчет по арендам</SelectItem>
                    <SelectItem value="revenue">Отчет по выручке</SelectItem>
                    <SelectItem value="bikes">Отчет по велосипедам</SelectItem>
                    <SelectItem value="customers">Отчет по клиентам</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-1 block">Период отчета</label>
                <div className="flex gap-4">
                  <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDateRange({
                        from: subDays(new Date(), 7),
                        to: new Date()
                      })}
                    >
                      7 дней
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDateRange({
                        from: subMonths(new Date(), 1),
                        to: new Date()
                      })}
                    >
                      30 дней
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setDateRange({
                        from: subMonths(new Date(), 3),
                        to: new Date()
                      })}
                    >
                      90 дней
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Вывод отчета */}
            <div className="mt-6">
              <Card className="border-dashed">
                <CardHeader className="py-4 px-5 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">
                      {reportType === "rentals" && "Отчет по арендам"}
                      {reportType === "revenue" && "Отчет по выручке"}
                      {reportType === "bikes" && "Отчет по велосипедам"}
                      {reportType === "customers" && "Отчет по клиентам"}
                      {" "} • {" "}
                      {dateRange.from && dateRange.to && (
                        <span className="text-sm font-normal">
                          {formatDate(dateRange.from)} — {formatDate(dateRange.to)}
                        </span>
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Printer" className="mr-2" size={16} />
                      Печать
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="FileDown" className="mr-2" size={16} />
                      Экспорт
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {renderReport()}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Компонент отчета по арендам
interface ReportProps {
  dateRange: DateRange;
}

const RentalsReport = ({ dateRange }: ReportProps) => {
  // Генерируем моковые данные для отчета
  const generateRentalData = () => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      const startDate = subDays(new Date(), Math.floor(Math.random() * 30));
      const endDate = addDays(startDate, Math.floor(Math.random() * 3) + 1);
      
      data.push({
        id: 100 + i,
        customer: ['Иван П.', 'Анна С.', 'Максим К.', 'Ольга В.', 'Дмитрий Н.'][Math.floor(Math.random() * 5)],
        bikeId: Math.floor(Math.random() * 10) + 1,
        bikeName: [
          'Горный велосипед Trek', 
          'Городской велосипед Schwinn', 
          'Шоссейный велосипед Giant',
          'Складной велосипед Brompton',
          'Электровелосипед Haibike'
        ][Math.floor(Math.random() * 5)],
        startDate,
        endDate,
        duration: Math.floor(Math.random() * 24) + 1,
        amount: (Math.floor(Math.random() * 10) + 1) * 500,
        status: ['Активен', 'Завершен', 'Отменен'][Math.floor(Math.random() * 3)]
      });
    }
    return data;
  };
  
  const rentalData = generateRentalData();

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Клиент</TableHead>
              <TableHead>Велосипед</TableHead>
              <TableHead>Дата начала</TableHead>
              <TableHead>Дата конца</TableHead>
              <TableHead>Длит. (ч)</TableHead>
              <TableHead className="text-right">Сумма</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rentalData.map((rental) => (
              <TableRow key={rental.id}>
                <TableCell>{rental.id}</TableCell>
                <TableCell>{rental.customer}</TableCell>
                <TableCell>{rental.bikeName}</TableCell>
                <TableCell>{format(rental.startDate, "dd.MM.yyyy")}</TableCell>
                <TableCell>{format(rental.endDate, "dd.MM.yyyy")}</TableCell>
                <TableCell>{rental.duration}</TableCell>
                <TableCell className="text-right">{rental.amount} ₽</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    rental.status === "Активен" 
                      ? "bg-green-100 text-green-800" 
                      : rental.status === "Завершен"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {rental.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Всего аренд: <span className="font-medium">{rentalData.length}</span>
          </div>
          <div className="text-sm font-medium">
            Итого: <span className="font-bold">{rentalData.reduce((acc, curr) => acc + curr.amount, 0)} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент отчета по выручке
const RevenueReport = ({ dateRange }: ReportProps) => {
  // Генерируем моковые данные для отчета
  const generateRevenueData = () => {
    const categories = [
      'Горные велосипеды', 
      'Городские велосипеды', 
      'Шоссейные велосипеды', 
      'Складные велосипеды', 
      'Электровелосипеды',
      'Детские велосипеды'
    ];
    
    return categories.map(category => {
      const rentalCount = Math.floor(Math.random() * 100) + 20;
      const avgAmount = (Math.floor(Math.random() * 10) + 1) * 100;
      const totalAmount = rentalCount * avgAmount;
      
      return {
        category,
        rentalCount,
        avgAmount,
        totalAmount,
        percentOfTotal: 0 // Заполним позже
      };
    });
  };
  
  const revenueData = generateRevenueData();
  
  // Рассчитываем общую сумму
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.totalAmount, 0);
  
  // Рассчитываем процент от общей суммы для каждой категории
  revenueData.forEach(item => {
    item.percentOfTotal = Math.round((item.totalAmount / totalRevenue) * 100);
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Категория</TableHead>
              <TableHead className="text-right">Кол-во аренд</TableHead>
              <TableHead className="text-right">Средняя сумма</TableHead>
              <TableHead className="text-right">Общая сумма</TableHead>
              <TableHead className="text-right">% от общей</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {revenueData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{item.rentalCount}</TableCell>
                <TableCell className="text-right">{item.avgAmount} ₽</TableCell>
                <TableCell className="text-right">{item.totalAmount} ₽</TableCell>
                <TableCell className="text-right">{item.percentOfTotal}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Всего категорий: <span className="font-medium">{revenueData.length}</span>
          </div>
          <div className="text-sm font-medium">
            Общая выручка: <span className="font-bold">{totalRevenue} ₽</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент отчета по велосипедам
const BikesReport = ({ dateRange }: ReportProps) => {
  // Генерируем моковые данные для отчета
  const generateBikesData = () => {
    const bikes = [
      { id: 1, name: 'Горный велосипед Trek', category: 'Горный' },
      { id: 2, name: 'Городской велосипед Schwinn', category: 'Городской' },
      { id: 3, name: 'Шоссейный велосипед Giant', category: 'Шоссейный' },
      { id: 4, name: 'Складной велосипед Brompton', category: 'Складной' },
      { id: 5, name: 'Электровелосипед Haibike', category: 'Электро' },
      { id: 6, name: 'Детский велосипед Cube', category: 'Детский' },
      { id: 7, name: 'Горный велосипед Specialized', category: 'Горный' },
      { id: 8, name: 'Городской велосипед Merida', category: 'Городской' },
      { id: 9, name: 'Шоссейный велосипед Cannondale', category: 'Шоссейный' },
      { id: 10, name: 'Складной велосипед Dahon', category: 'Складной' },
    ];
    
    return bikes.map(bike => {
      const rentalCount = Math.floor(Math.random() * 50) + 10;
      const totalHours = rentalCount * (Math.floor(Math.random() * 10) + 1);
      const totalRevenue = totalHours * ((Math.floor(Math.random() * 5) + 1) * 100);
      const utilization = Math.floor(Math.random() * 100) + 1;
      
      return {
        ...bike,
        rentalCount,
        totalHours,
        totalRevenue,
        utilization
      };
    });
  };
  
  const bikesData = generateBikesData();

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead className="text-right">Кол-во аренд</TableHead>
              <TableHead className="text-right">Всего часов</TableHead>
              <TableHead className="text-right">Выручка</TableHead>
              <TableHead className="text-right">Загруженность</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bikesData.map((bike) => (
              <TableRow key={bike.id}>
                <TableCell>{bike.id}</TableCell>
                <TableCell>{bike.name}</TableCell>
                <TableCell>{bike.category}</TableCell>
                <TableCell className="text-right">{bike.rentalCount}</TableCell>
                <TableCell className="text-right">{bike.totalHours} ч</TableCell>
                <TableCell className="text-right">{bike.totalRevenue} ₽</TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center">
                    <div className="w-16 h-2 bg-gray-200 rounded-full mr-2">
                      <div 
                        className="h-full rounded-full bg-primary" 
                        style={{ width: `${bike.utilization}%` }} 
                      />
                    </div>
                    {bike.utilization}%
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Всего велосипедов: <span className="font-medium">{bikesData.length}</span>
          </div>
          <div className="flex space-x-4">
            <div className="text-sm font-medium">
              Всего аренд: <span className="font-bold">{bikesData.reduce((acc, curr) => acc + curr.rentalCount, 0)}</span>
            </div>
            <div className="text-sm font-medium">
              Общая выручка: <span className="font-bold">{bikesData.reduce((acc, curr) => acc + curr.totalRevenue, 0)} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Компонент отчета по клиентам
const CustomersReport = ({ dateRange }: ReportProps) => {
  // Генерируем моковые данные для отчета
  const generateCustomersData = () => {
    const customers = [
      { id: 1, name: 'Иванов Павел', phone: '+7 (912) 345-67-89', email: 'ivanov@example.com' },
      { id: 2, name: 'Смирнова Анна', phone: '+7 (923) 456-78-90', email: 'smirnova@example.com' },
      { id: 3, name: 'Козлов Максим', phone: '+7 (934) 567-89-01', email: 'kozlov@example.com' },
      { id: 4, name: 'Васильева Ольга', phone: '+7 (945) 678-90-12', email: 'vasilyeva@example.com' },
      { id: 5, name: 'Николаев Дмитрий', phone: '+7 (956) 789-01-23', email: 'nikolaev@example.com' },
      { id: 6, name: 'Федоров Алексей', phone: '+7 (967) 890-12-34', email: 'fedorov@example.com' },
      { id: 7, name: 'Морозова Екатерина', phone: '+7 (978) 901-23-45', email: 'morozova@example.com' },
      { id: 8, name: 'Волков Артём', phone: '+7 (989) 012-34-56', email: 'volkov@example.com' },
      { id: 9, name: 'Лебедева Софья', phone: '+7 (990) 123-45-67', email: 'lebedeva@example.com' },
      { id: 10, name: 'Петров Игорь', phone: '+7 (901) 234-56-78', email: 'petrov@example.com' },
    ];
    
    return customers.map(customer => {
      const rentalCount = Math.floor(Math.random() * 15) + 1;
      const totalSpent = rentalCount * ((Math.floor(Math.random() * 10) + 1) * 500);
      const lastRentalDate = subDays(new Date(), Math.floor(Math.random() * 60));
      
      return {
        ...customer,
        rentalCount,
        totalSpent,
        lastRentalDate,
        avgSpent: Math.round(totalSpent / rentalCount)
      };
    });
  };
  
  const customersData = generateCustomersData();

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Имя клиента</TableHead>
              <TableHead>Контакты</TableHead>
              <TableHead className="text-right">Кол-во аренд</TableHead>
              <TableHead className="text-right">Общие расходы</TableHead>
              <TableHead className="text-right">Ср. чек</TableHead>
              <TableHead>Последняя аренда</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customersData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <div className="text-sm">{customer.phone}</div>
                  <div className="text-xs text-muted-foreground">{customer.email}</div>
                </TableCell>
                <TableCell className="text-right">{customer.rentalCount}</TableCell>
                <TableCell className="text-right">{customer.totalSpent} ₽</TableCell>
                <TableCell className="text-right">{customer.avgSpent} ₽</TableCell>
                <TableCell>{format(customer.lastRentalDate, "dd.MM.yyyy")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Всего клиентов: <span className="font-medium">{customersData.length}</span>
          </div>
          <div className="flex space-x-4">
            <div className="text-sm font-medium">
              Всего аренд: <span className="font-bold">{customersData.reduce((acc, curr) => acc + curr.rentalCount, 0)}</span>
            </div>
            <div className="text-sm font-medium">
              Общая выручка: <span className="font-bold">{customersData.reduce((acc, curr) => acc + curr.totalSpent, 0)} ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
