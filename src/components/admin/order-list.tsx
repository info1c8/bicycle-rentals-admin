
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

/**
 * Компонент для управления заказами (пока заглушка)
 */
const AdminOrderList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Управление заказами</CardTitle>
        <CardDescription>Просмотр и изменение статусов заказов</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="p-4 text-center text-muted-foreground">
            Здесь будет таблица с заказами
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminOrderList;
