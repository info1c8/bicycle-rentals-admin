
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

/**
 * Компонент для управления клиентами (пока заглушка)
 */
const AdminCustomerList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление клиентами</CardTitle>
        <CardDescription>Просмотр информации о клиентах и их истории заказов</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="p-4 text-center text-muted-foreground">
            Здесь будет таблица с клиентами
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminCustomerList;
