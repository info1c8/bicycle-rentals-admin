
import { useState } from "react";
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Icon from "@/components/ui/icon";
import { bikeData } from "@/data/bike-data";
import { Bike } from "@/types/bike";

const AdminBikeManagement = () => {
  const [bikes, setBikes] = useState<Bike[]>(bikeData);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBike, setEditingBike] = useState<Bike | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bikeToDelete, setBikeToDelete] = useState<Bike | null>(null);
  const { toast } = useToast();

  // Фильтрация велосипедов по поиску
  const filteredBikes = bikes.filter(bike => 
    bike.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bike.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBike = (newBike: Bike) => {
    // Создаем новый велосипед с ID, на 1 больше чем максимальный ID в массиве
    const maxId = Math.max(...bikes.map(bike => bike.id), 0);
    const bikeWithId = { ...newBike, id: maxId + 1 };
    
    setBikes([...bikes, bikeWithId]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Велосипед добавлен",
      description: `${newBike.title} был успешно добавлен в каталог.`,
    });
  };

  const handleEditBike = (updatedBike: Bike) => {
    // Обновляем велосипед в массиве
    const updatedBikes = bikes.map(bike => 
      bike.id === updatedBike.id ? updatedBike : bike
    );
    
    setBikes(updatedBikes);
    setEditingBike(null);
    
    toast({
      title: "Велосипед обновлен",
      description: `${updatedBike.title} был успешно обновлен.`,
    });
  };

  const handleDeleteBike = () => {
    if (!bikeToDelete) return;
    
    // Удаляем велосипед из массива
    const updatedBikes = bikes.filter(bike => bike.id !== bikeToDelete.id);
    setBikes(updatedBikes);
    setIsDeleteDialogOpen(false);
    setBikeToDelete(null);
    
    toast({
      title: "Велосипед удален",
      description: `${bikeToDelete.title} был успешно удален из каталога.`,
    });
  };

  const handleAvailabilityToggle = (id: number, available: boolean) => {
    const updatedBikes = bikes.map(bike => 
      bike.id === id ? { ...bike, available } : bike
    );
    
    setBikes(updatedBikes);
    
    toast({
      title: available ? "Велосипед доступен" : "Велосипед недоступен",
      description: `Статус велосипеда был успешно изменен.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Управление велосипедами</CardTitle>
              <CardDescription>Добавляйте, редактируйте и удаляйте велосипеды из каталога</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить велосипед
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <BikeForm 
                  onSubmit={handleAddBike} 
                  onCancel={() => setIsAddDialogOpen(false)} 
                  title="Добавить новый велосипед"
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative">
              <Input
                placeholder="Поиск велосипедов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Icon name="Search" size={18} />
              </div>
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                  onClick={() => setSearchQuery("")}
                >
                  <Icon name="X" size={16} />
                </Button>
              )}
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Фото</TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Цена (₽/ч)</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBikes.length > 0 ? (
                  filteredBikes.map((bike) => (
                    <TableRow key={bike.id}>
                      <TableCell>
                        <div className="w-12 h-12 rounded overflow-hidden">
                          <img
                            src={bike.image}
                            alt={bike.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{bike.title}</TableCell>
                      <TableCell>{bike.category}</TableCell>
                      <TableCell>{bike.pricePerHour}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={bike.available}
                            onCheckedChange={(checked) => 
                              handleAvailabilityToggle(bike.id, checked)
                            }
                          />
                          <Badge 
                            variant={bike.available ? "outline" : "secondary"}
                            className={bike.available 
                              ? "bg-green-50 text-green-600 border-green-200" 
                              : "bg-gray-100 text-gray-600"
                            }
                          >
                            {bike.available ? "Доступен" : "Недоступен"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingBike(bike)}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => {
                              setBikeToDelete(bike);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Icon name="Trash" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      {searchQuery 
                        ? "Велосипеды не найдены. Попробуйте изменить запрос поиска." 
                        : "Нет доступных велосипедов. Добавьте новый велосипед."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Всего велосипедов: {bikes.length} | Доступно: {bikes.filter(bike => bike.available).length}
          </div>
        </CardFooter>
      </Card>

      {/* Диалог редактирования */}
      {editingBike && (
        <Dialog open={!!editingBike} onOpenChange={(open) => !open && setEditingBike(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <BikeForm 
              bike={editingBike}
              onSubmit={handleEditBike} 
              onCancel={() => setEditingBike(null)} 
              title="Редактировать велосипед"
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Диалог подтверждения удаления */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Подтверждение удаления</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить велосипед "{bikeToDelete?.title}"? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={handleDeleteBike}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface BikeFormProps {
  bike?: Bike;
  onSubmit: (bike: Bike) => void;
  onCancel: () => void;
  title: string;
}

const BikeForm = ({ bike, onSubmit, onCancel, title }: BikeFormProps) => {
  const isEditing = !!bike;
  const [formData, setFormData] = useState<Partial<Bike>>(
    bike || {
      title: "",
      category: "Горный",
      pricePerHour: 200,
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1470",
      available: true,
      description: "",
      features: [],
      rating: 0,
      reviewsCount: 0
    }
  );

  const categories = ["Горный", "Городской", "Шоссейный", "Электрический", "Детский"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').filter(line => line.trim() !== '');
    setFormData({ ...formData, features });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setFormData({ ...formData, available: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Убедимся, что у нас есть все необходимые поля
    if (!formData.title || !formData.category || !formData.pricePerHour) {
      return;
    }
    
    onSubmit(formData as Bike);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          Заполните информацию о велосипеде. Нажмите Сохранить, когда закончите.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Название</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Категория</Label>
            <Select
              value={formData.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pricePerHour">Цена за час (₽)</Label>
            <Input
              id="pricePerHour"
              name="pricePerHour"
              type="number"
              min="0"
              value={formData.pricePerHour}
              onChange={handleNumberInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">URL изображения</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleInputChange}
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="features">Особенности (каждая с новой строки)</Label>
          <Textarea
            id="features"
            value={formData.features?.join('\n') || ""}
            onChange={handleFeaturesChange}
            rows={4}
            placeholder="Алюминиевая рама&#10;Дисковые тормоза&#10;27 скоростей"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="available"
            checked={formData.available}
            onCheckedChange={handleAvailabilityChange}
          />
          <Label htmlFor="available">Доступен для аренды</Label>
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">Сохранить</Button>
      </DialogFooter>
    </form>
  );
};

export default AdminBikeManagement;
