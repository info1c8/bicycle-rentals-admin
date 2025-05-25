import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const AdminBikeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const bikes = [
    {
      id: 1,
      name: "Горный Trek X-Caliber",
      type: "Горный",
      status: "available",
      price: "300 ₽/час",
      location: "Станция А",
    },
    {
      id: 2,
      name: "Городской Giant Escape",
      type: "Городской",
      status: "rented",
      price: "200 ₽/час",
      location: "Станция Б",
    },
    {
      id: 3,
      name: "Электро Specialized Turbo",
      type: "Электро",
      status: "maintenance",
      price: "600 ₽/час",
      location: "Сервис",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "rented":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Доступен";
      case "rented":
        return "Арендован";
      case "maintenance":
        return "Ремонт";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Input
            placeholder="Поиск велосипедов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Icon name="Filter" className="h-4 w-4 mr-2" />
            Фильтр
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icon name="Plus" className="h-4 w-4 mr-2" />
              Добавить велосипед
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить новый велосипед</DialogTitle>
            </DialogHeader>
            <div className="p-4 text-center text-muted-foreground">
              Форма добавления велосипеда будет реализована в следующем
              обновлении
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список велосипедов</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Местоположение</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bikes.map((bike) => (
                <TableRow key={bike.id}>
                  <TableCell className="font-medium">{bike.name}</TableCell>
                  <TableCell>{bike.type}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(bike.status)}>
                      {getStatusText(bike.status)}
                    </Badge>
                  </TableCell>
                  <TableCell>{bike.price}</TableCell>
                  <TableCell>{bike.location}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Icon name="Edit" className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Eye" className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBikeList;
