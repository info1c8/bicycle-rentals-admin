
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { bikeData } from "@/data/bike-data";
import { useToast } from "@/hooks/use-toast";
import { Bike } from "@/types/bike";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Схема валидации формы велосипеда
const bikeFormSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Название должно содержать минимум 3 символа"),
  description: z.string().min(10, "Описание должно содержать минимум 10 символов"),
  image: z.string().url("Введите корректный URL изображения"),
  category: z.string().min(1, "Выберите категорию"),
  pricePerHour: z.number().min(1, "Цена должна быть больше 0"),
  availability: z.number().min(0, "Доступность не может быть отрицательной"),
  rating: z.number().min(0).max(5, "Рейтинг должен быть от 0 до 5"),
  features: z.array(z.string()).optional(),
});

type BikeFormValues = z.infer<typeof bikeFormSchema>;

/**
 * Компонент управления велосипедами
 */
const AdminBikeManagement = () => {
  const [bikes, setBikes] = useState<Bike[]>(bikeData);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const { toast } = useToast();
  
  // Создание формы для добавления/редактирования велосипеда
  const form = useForm<BikeFormValues>({
    resolver: zodResolver(bikeFormSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
      pricePerHour: 0,
      availability: 0,
      rating: 0,
      features: [],
    }
  });
  
  // Обработчик для фильтрации велосипедов
  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = searchQuery.trim() === "" || 
      bike.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      bike.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || bike.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Получение уникальных категорий
  const categories = Array.from(new Set(bikes.map(bike => bike.category)));

  // Обработчик для добавления велосипеда
  const handleAddBike = (data: BikeFormValues) => {
    // Создаем новый велосипед со следующим id
    const newBike: Bike = {
      ...data,
      id: Math.max(...bikes.map(bike => bike.id), 0) + 1,
      features: data.features || [],
    };
    
    setBikes([...bikes, newBike]);
    setIsAddDialogOpen(false);
    form.reset();
    
    toast({
      title: "Велосипед добавлен",
      description: `Велосипед "${newBike.title}" успешно добавлен в каталог.`,
    });
  };
  
  // Обработчик для редактирования велосипеда
  const handleEditBike = (data: BikeFormValues) => {
    if (!selectedBike) return;
    
    const updatedBikes = bikes.map(bike => 
      bike.id === selectedBike.id ? { ...data, id: bike.id, features: data.features || [] } : bike
    );
    
    setBikes(updatedBikes);
    setIsEditDialogOpen(false);
    setSelectedBike(null);
    
    toast({
      title: "Велосипед обновлен",
      description: `Велосипед "${data.title}" успешно обновлен.`,
    });
  };
  
  // Обработчик для удаления велосипеда
  const handleDeleteBike = () => {
    if (!selectedBike) return;
    
    const updatedBikes = bikes.filter(bike => bike.id !== selectedBike.id);
    setBikes(updatedBikes);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Велосипед удален",
      description: `Велосипед "${selectedBike.title}" успешно удален из каталога.`,
    });
    
    setSelectedBike(null);
  };
  
  // Обработчик для открытия диалога редактирования
  const handleOpenEditDialog = (bike: Bike) => {
    setSelectedBike(bike);
    form.reset({
      id: bike.id,
      title: bike.title,
      description: bike.description,
      image: bike.image,
      category: bike.category,
      pricePerHour: bike.pricePerHour,
      availability: bike.availability,
      rating: bike.rating,
      features: bike.features,
    });
    setIsEditDialogOpen(true);
  };
  
  // Обработчик для открытия диалога удаления
  const handleOpenDeleteDialog = (bike: Bike) => {
    setSelectedBike(bike);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Управление велосипедами</CardTitle>
            <CardDescription>
              Добавляйте, редактируйте и удаляйте велосипеды из каталога
            </CardDescription>
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
                form={form} 
                onSubmit={handleAddBike} 
                onCancel={() => setIsAddDialogOpen(false)} 
                mode="add"
              />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Фильтры и поиск */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Поиск по названию или описанию..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-48">
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все категории</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Таблица велосипедов */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead className="w-[250px]">Название</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead className="text-right">Цена/час</TableHead>
                  <TableHead className="text-center">Доступно</TableHead>
                  <TableHead className="text-center">Рейтинг</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBikes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      Нет велосипедов, соответствующих критериям поиска
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBikes.map((bike) => (
                    <TableRow key={bike.id}>
                      <TableCell className="font-medium">{bike.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-md overflow-hidden">
                            <img 
                              src={bike.image} 
                              alt={bike.title} 
                              className="h-full w-full object-cover"
                              onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
                            />
                          </div>
                          <span className="font-medium">{bike.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{bike.category}</TableCell>
                      <TableCell className="text-right">{bike.pricePerHour} ₽</TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          bike.availability > 0 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {bike.availability}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          <span className="text-amber-500 mr-1">{bike.rating}</span>
                          <Icon name="Star" className="text-amber-500" size={14} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleOpenEditDialog(bike)}
                          >
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600"
                            onClick={() => handleOpenDeleteDialog(bike)}
                          >
                            <Icon name="Trash" size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Показано {filteredBikes.length} из {bikes.length} велосипедов
          </div>
        </CardFooter>
      </Card>

      {/* Диалог редактирования */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <BikeForm 
            form={form} 
            onSubmit={handleEditBike} 
            onCancel={() => setIsEditDialogOpen(false)} 
            mode="edit"
          />
        </DialogContent>
      </Dialog>

      {/* Диалог удаления */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удаление велосипеда</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить велосипед "{selectedBike?.title}"? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteBike}
            >
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Компонент формы для добавления/редактирования велосипеда
interface BikeFormProps {
  form: any;
  onSubmit: (data: BikeFormValues) => void;
  onCancel: () => void;
  mode: 'add' | 'edit';
}

const BikeForm = ({ form, onSubmit, onCancel, mode }: BikeFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Добавить велосипед' : 'Редактировать велосипед'}</DialogTitle>
          <DialogDescription>
            Заполните все поля, чтобы {mode === 'add' ? 'добавить новый' : 'обновить'} велосипед в каталог.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Категория</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Горный">Горный</SelectItem>
                      <SelectItem value="Городской">Городской</SelectItem>
                      <SelectItem value="Шоссейный">Шоссейный</SelectItem>
                      <SelectItem value="Складной">Складной</SelectItem>
                      <SelectItem value="Детский">Детский</SelectItem>
                      <SelectItem value="Электро">Электро</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    rows={3} 
                    placeholder="Подробное описание велосипеда" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL изображения</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="https://example.com/bike.jpg" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="pricePerHour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Цена в час (₽)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Доступно (шт.)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Рейтинг (0-5)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="5" 
                      step="0.1"
                      {...field} 
                      onChange={(e) => field.onChange(Number(e.target.value))} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" type="button" onClick={onCancel}>
            Отмена
          </Button>
          <Button type="submit">
            {mode === 'add' ? 'Добавить' : 'Сохранить'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AdminBikeManagement;
