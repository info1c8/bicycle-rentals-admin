
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
  FormDescription,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  pricePerDay: z.number().min(1, "Цена должна быть больше 0"),
  pricePerWeek: z.number().min(1, "Цена должна быть больше 0"),
  availability: z.number().min(0, "Доступность не может быть отрицательной"),
  rating: z.number().min(0).max(5, "Рейтинг должен быть от 0 до 5"),
  features: z.array(z.string()).min(1, "Добавьте хотя бы одну характеристику"),
  specifications: z.object({
    brand: z.string().min(1, "Укажите бренд"),
    model: z.string().min(1, "Укажите модель"),
    frameSize: z.string().min(1, "Укажите размер рамы"),
    weight: z.string().min(1, "Укажите вес"),
    wheelSize: z.string().min(1, "Укажите размер колес"),
    brakeType: z.string().min(1, "Укажите тип тормозов"),
    gears: z.number().min(0, "Укажите количество передач"),
  }),
  isPopular: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

type BikeFormValues = z.infer<typeof bikeFormSchema>;

/**
 * Компонент управления велосипедами с расширенными возможностями
 */
const AdminBikeManagement = () => {
  const [bikes, setBikes] = useState<Bike[]>(
    bikeData.map(bike => ({
      ...bike,
      pricePerDay: bike.pricePerHour * 8,
      pricePerWeek: bike.pricePerHour * 40,
      specifications: {
        brand: bike.features[0] || "Trek",
        model: bike.title.split(" ").slice(-1)[0] || "X1",
        frameSize: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
        weight: `${Math.floor(Math.random() * 5) + 10} кг`,
        wheelSize: ["26\"", "27.5\"", "29\""][Math.floor(Math.random() * 3)],
        brakeType: ["Дисковые механические", "Дисковые гидравлические", "V-Brake"][Math.floor(Math.random() * 3)],
        gears: Math.floor(Math.random() * 18) + 6,
      },
      isPopular: Math.random() > 0.7,
      isNew: Math.random() > 0.8,
      isRecommended: Math.random() > 0.75,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
      updatedAt: new Date(),
    }))
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [bikeDetailOpen, setBikeDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<string>("table");
  const [activeTab, setActiveTab] = useState<string>("bikes");
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
      pricePerDay: 0,
      pricePerWeek: 0,
      availability: 0,
      rating: 0,
      features: [],
      specifications: {
        brand: "",
        model: "",
        frameSize: "",
        weight: "",
        wheelSize: "",
        brakeType: "",
        gears: 0,
      },
      isPopular: false,
      isNew: false,
      isRecommended: false,
    }
  });
  
  // Обработчик для фильтрации велосипедов
  const filteredBikes = bikes.filter(bike => {
    const matchesSearch = searchQuery.trim() === "" || 
      bike.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      bike.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "" || bike.category === categoryFilter;
    
    const matchesAvailability = availabilityFilter === "all" || 
      (availabilityFilter === "available" && bike.availability > 0) ||
      (availabilityFilter === "unavailable" && bike.availability === 0);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });
  
  // Сортировка велосипедов
  const sortedBikes = [...filteredBikes].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "oldest":
        return a.createdAt.getTime() - b.createdAt.getTime();
      case "priceAsc":
        return a.pricePerHour - b.pricePerHour;
      case "priceDesc":
        return b.pricePerHour - a.pricePerHour;
      case "nameAsc":
        return a.title.localeCompare(b.title);
      case "nameDesc":
        return b.title.localeCompare(a.title);
      case "popularityDesc":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
  
  // Получение уникальных категорий
  const categories = Array.from(new Set(bikes.map(bike => bike.category)));

  // Обработчик для добавления велосипеда
  const handleAddBike = (data: BikeFormValues) => {
    // Создаем новый велосипед со следующим id
    const newBike: Bike = {
      ...data,
      id: Math.max(...bikes.map(bike => bike.id), 0) + 1,
      updatedAt: new Date(),
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
      bike.id === selectedBike.id ? { ...data, id: bike.id, updatedAt: new Date(), createdAt: bike.createdAt } : bike
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
      pricePerDay: bike.pricePerDay || bike.pricePerHour * 8,
      pricePerWeek: bike.pricePerWeek || bike.pricePerHour * 40,
      availability: bike.availability,
      rating: bike.rating,
      features: bike.features,
      specifications: bike.specifications || {
        brand: bike.features[0] || "",
        model: bike.title.split(" ").slice(-1)[0] || "",
        frameSize: "M",
        weight: "12 кг",
        wheelSize: "26\"",
        brakeType: "Дисковые механические",
        gears: 21,
      },
      isPopular: bike.isPopular || false,
      isNew: bike.isNew || false,
      isRecommended: bike.isRecommended || false,
    });
    setIsEditDialogOpen(true);
  };
  
  // Обработчик для открытия диалога удаления
  const handleOpenDeleteDialog = (bike: Bike) => {
    setSelectedBike(bike);
    setIsDeleteDialogOpen(true);
  };
  
  // Обработчик для просмотра детальной информации о велосипеде
  const handleViewBikeDetails = (bike: Bike) => {
    setSelectedBike(bike);
    setBikeDetailOpen(true);
  };
  
  // Обработчик для быстрого изменения доступности
  const handleAvailabilityChange = (bikeId: number, newAvailability: number) => {
    const updatedBikes = bikes.map(bike => 
      bike.id === bikeId ? { ...bike, availability: newAvailability } : bike
    );
    setBikes(updatedBikes);
    
    toast({
      title: "Доступность обновлена",
      description: `Доступность велосипеда успешно изменена на ${newAvailability}.`,
    });
  };
  
  // Обработчик для дублирования велосипеда
  const handleDuplicateBike = (bike: Bike) => {
    const newBike: Bike = {
      ...bike,
      id: Math.max(...bikes.map(b => b.id), 0) + 1,
      title: `${bike.title} (копия)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setBikes([...bikes, newBike]);
    
    toast({
      title: "Велосипед дублирован",
      description: `Велосипед "${bike.title}" успешно дублирован.`,
    });
  };
  
  // Обработчик для переключения статусов
  const handleToggleStatus = (bikeId: number, statusField: 'isPopular' | 'isNew' | 'isRecommended') => {
    const updatedBikes = bikes.map(bike => {
      if (bike.id === bikeId) {
        return { ...bike, [statusField]: !bike[statusField], updatedAt: new Date() };
      }
      return bike;
    });
    
    setBikes(updatedBikes);
    
    const statusLabels = {
      isPopular: 'популярный',
      isNew: 'новый',
      isRecommended: 'рекомендуемый'
    };
    
    toast({
      title: "Статус обновлен",
      description: `Статус "${statusLabels[statusField]}" успешно изменен.`,
    });
  };
  
  // Обработчик для обновления цены
  const handleBulkPriceUpdate = (percentChange: number) => {
    if (!selectedBike) return;
    
    const updatedBikes = bikes.map(bike => {
      const priceMultiplier = 1 + (percentChange / 100);
      return {
        ...bike,
        pricePerHour: Math.round(bike.pricePerHour * priceMultiplier),
        pricePerDay: Math.round((bike.pricePerDay || bike.pricePerHour * 8) * priceMultiplier),
        pricePerWeek: Math.round((bike.pricePerWeek || bike.pricePerHour * 40) * priceMultiplier),
        updatedAt: new Date()
      };
    });
    
    setBikes(updatedBikes);
    
    toast({
      title: "Цены обновлены",
      description: `Цены всех велосипедов успешно изменены на ${percentChange > 0 ? '+' : ''}${percentChange}%.`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="bikes">Велосипеды</TabsTrigger>
            <TabsTrigger value="categories">Категории</TabsTrigger>
            <TabsTrigger value="features">Характеристики</TabsTrigger>
            <TabsTrigger value="statistics">Статистика</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <div className="border rounded-md p-1 flex">
              <Button 
                variant={viewMode === "table" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-2"
                onClick={() => setViewMode("table")}
              >
                <Icon name="Table" size={16} />
              </Button>
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-2"
                onClick={() => setViewMode("grid")}
              >
                <Icon name="Grid" size={16} />
              </Button>
            </div>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Icon name="Plus" className="mr-2" size={16} />
                  Добавить велосипед
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <BikeForm 
                  form={form} 
                  onSubmit={handleAddBike} 
                  onCancel={() => setIsAddDialogOpen(false)} 
                  mode="add"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <TabsContent value="bikes">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Каталог велосипедов</CardTitle>
                    <CardDescription>
                      Управление велосипедами в каталоге проката
                    </CardDescription>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Icon name="Settings" className="mr-2" size={16} />
                        Управление
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Действия с каталогом</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleBulkPriceUpdate(10)}>
                        <Icon name="TrendingUp" className="mr-2" size={14} />
                        Поднять все цены на 10%
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleBulkPriceUpdate(-10)}>
                        <Icon name="TrendingDown" className="mr-2" size={14} />
                        Снизить все цены на 10%
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Icon name="FileDown" className="mr-2" size={14} />
                        Экспорт каталога
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Icon name="FileUp" className="mr-2" size={14} />
                        Импорт каталога
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Фильтры и поиск */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <Input 
                      placeholder="Поиск по названию или описанию..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                      icon="Search"
                    />
                  </div>
                  
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
                  
                  <div className="flex gap-2">
                    <Select 
                      value={availabilityFilter} 
                      onValueChange={setAvailabilityFilter}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Доступность" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="available">В наличии</SelectItem>
                        <SelectItem value="unavailable">Нет в наличии</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select 
                      value={sortOption} 
                      onValueChange={setSortOption}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Сортировка" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Сначала новые</SelectItem>
                        <SelectItem value="oldest">Сначала старые</SelectItem>
                        <SelectItem value="priceAsc">По цене (возр.)</SelectItem>
                        <SelectItem value="priceDesc">По цене (убыв.)</SelectItem>
                        <SelectItem value="nameAsc">По имени (А-Я)</SelectItem>
                        <SelectItem value="nameDesc">По имени (Я-А)</SelectItem>
                        <SelectItem value="popularityDesc">По популярности</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              {viewMode === "table" ? (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead className="w-[250px]">Название</TableHead>
                        <TableHead>Категория</TableHead>
                        <TableHead className="text-right">Цена/час</TableHead>
                        <TableHead className="text-center">Доступно</TableHead>
                        <TableHead className="text-center">Статусы</TableHead>
                        <TableHead className="text-center">Рейтинг</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedBikes.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                            Нет велосипедов, соответствующих критериям поиска
                          </TableCell>
                        </TableRow>
                      ) : (
                        sortedBikes.map((bike) => (
                          <TableRow key={bike.id}>
                            <TableCell className="font-medium">{bike.id}</TableCell>
                            <TableCell>
                              <div 
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => handleViewBikeDetails(bike)}
                              >
                                <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                                  <img 
                                    src={bike.image} 
                                    alt={bike.title} 
                                    className="h-full w-full object-cover"
                                    onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
                                  />
                                </div>
                                <div>
                                  <div className="font-medium hover:text-primary transition-colors">
                                    {bike.title}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    ID: {bike.id} • Обновлено: {bike.updatedAt.toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{bike.category}</TableCell>
                            <TableCell className="text-right font-medium">
                              {bike.pricePerHour} ₽
                              <div className="text-xs text-muted-foreground">
                                День: {bike.pricePerDay || bike.pricePerHour * 8} ₽
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-center items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  disabled={bike.availability <= 0}
                                  onClick={() => handleAvailabilityChange(bike.id, bike.availability - 1)}
                                  className="h-6 w-6"
                                >
                                  <Icon name="Minus" size={12} />
                                </Button>
                                <span className={`px-2 py-1 rounded-full text-sm ${
                                  bike.availability > 0 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-red-100 text-red-800"
                                }`}>
                                  {bike.availability}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleAvailabilityChange(bike.id, bike.availability + 1)}
                                  className="h-6 w-6"
                                >
                                  <Icon name="Plus" size={12} />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap justify-center gap-1">
                                {bike.isNew && (
                                  <Badge variant="secondary" className="text-xs">Новый</Badge>
                                )}
                                {bike.isPopular && (
                                  <Badge variant="outline" className="text-xs">Популярный</Badge>
                                )}
                                {bike.isRecommended && (
                                  <Badge className="text-xs">Рекомендуем</Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center">
                                <span className="text-amber-500 mr-1">{bike.rating}</span>
                                <Icon name="Star" className="text-amber-500" size={14} />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-end space-x-1">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      className="h-8 w-8 p-0"
                                    >
                                      <Icon name="MoreHorizontal" size={16} />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Действия</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleViewBikeDetails(bike)}>
                                      <Icon name="Eye" className="mr-2" size={14} />
                                      Просмотр
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleOpenEditDialog(bike)}>
                                      <Icon name="Edit" className="mr-2" size={14} />
                                      Редактировать
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDuplicateBike(bike)}>
                                      <Icon name="Copy" className="mr-2" size={14} />
                                      Дублировать
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleOpenDeleteDialog(bike)}
                                      className="text-red-600"
                                    >
                                      <Icon name="Trash" className="mr-2" size={14} />
                                      Удалить
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Статусы</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleToggleStatus(bike.id, 'isNew')}>
                                      <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                          <Icon name="CirclePlus" className="mr-2" size={14} />
                                          Новинка
                                        </div>
                                        <Switch
                                          checked={bike.isNew}
                                          onClick={(e) => e.stopPropagation()}
                                          className="pointer-events-none"
                                        />
                                      </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleToggleStatus(bike.id, 'isPopular')}>
                                      <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                          <Icon name="Star" className="mr-2" size={14} />
                                          Популярный
                                        </div>
                                        <Switch
                                          checked={bike.isPopular}
                                          onClick={(e) => e.stopPropagation()}
                                          className="pointer-events-none"
                                        />
                                      </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleToggleStatus(bike.id, 'isRecommended')}>
                                      <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                          <Icon name="ThumbsUp" className="mr-2" size={14} />
                                          Рекомендуемый
                                        </div>
                                        <Switch
                                          checked={bike.isRecommended}
                                          onClick={(e) => e.stopPropagation()}
                                          className="pointer-events-none"
                                        />
                                      </div>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {sortedBikes.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                      Нет велосипедов, соответствующих критериям поиска
                    </div>
                  ) : (
                    sortedBikes.map((bike) => (
                      <Card key={bike.id} className="overflow-hidden">
                        <div className="relative h-40">
                          <img 
                            src={bike.image} 
                            alt={bike.title} 
                            className="h-full w-full object-cover"
                            onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
                          />
                          <div className="absolute top-2 right-2 flex flex-col gap-1">
                            {bike.isNew && <Badge variant="secondary">Новый</Badge>}
                            {bike.isPopular && <Badge variant="outline">Популярный</Badge>}
                            {bike.isRecommended && <Badge>Рекомендуем</Badge>}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold truncate" title={bike.title}>
                              {bike.title}
                            </h3>
                            <div className="flex items-center">
                              <span className="text-amber-500 mr-1">{bike.rating}</span>
                              <Icon name="Star" className="text-amber-500" size={14} />
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Категория: {bike.category}
                          </div>
                          <div className="flex justify-between items-center mb-3">
                            <div className="font-medium">{bike.pricePerHour} ₽/час</div>
                            <div className={`px-2 py-1 text-xs rounded-full ${
                              bike.availability > 0 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {bike.availability > 0 ? `Доступно: ${bike.availability}` : "Нет в наличии"}
                            </div>
                          </div>
                          <div className="flex justify-between gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => handleViewBikeDetails(bike)}
                            >
                              <Icon name="Eye" size={14} className="mr-1" />
                              Просмотр
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                              onClick={() => handleOpenEditDialog(bike)}
                            >
                              <Icon name="Edit" size={14} className="mr-1" />
                              Изменить
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Icon name="MoreVertical" size={16} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleDuplicateBike(bike)}>
                                  <Icon name="Copy" className="mr-2" size={14} />
                                  Дублировать
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(bike.id, 'isNew')}>
                                  <Icon name="CirclePlus" className="mr-2" size={14} />
                                  {bike.isNew ? "Убрать метку 'Новый'" : "Отметить как 'Новый'"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(bike.id, 'isPopular')}>
                                  <Icon name="Star" className="mr-2" size={14} />
                                  {bike.isPopular ? "Убрать из популярных" : "Добавить в популярные"}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleToggleStatus(bike.id, 'isRecommended')}>
                                  <Icon name="ThumbsUp" className="mr-2" size={14} />
                                  {bike.isRecommended ? "Убрать из рекомендуемых" : "Добавить в рекомендуемые"}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleOpenDeleteDialog(bike)}
                                  className="text-red-600"
                                >
                                  <Icon name="Trash" className="mr-2" size={14} />
                                  Удалить
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                Показано {filteredBikes.length} из {bikes.length} велосипедов
              </div>
              <div className="text-sm font-medium">
                Общая стоимость каталога: {filteredBikes.reduce((sum, bike) => sum + bike.pricePerHour, 0)} ₽/час
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Управление категориями</CardTitle>
              <CardDescription>
                Создавайте и редактируйте категории велосипедов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Категории велосипедов */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Категории</h3>
                    <Button size="sm">
                      <Icon name="Plus" className="mr-2" size={14} />
                      Добавить категорию
                    </Button>
                  </div>
                  
                  <div className="border rounded-md divide-y">
                    {categories.map((category, index) => (
                      <div key={index} className="p-3 flex justify-between items-center">
                        <div>
                          <div className="font-medium">{category}</div>
                          <div className="text-sm text-muted-foreground">
                            {bikes.filter(bike => bike.category === category).length} велосипедов
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Icon name="Trash" size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Статистика по категориям */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Статистика по категориям</h3>
                  <div className="border rounded-md divide-y">
                    {categories.map((category, index) => {
                      const bikesInCategory = bikes.filter(bike => bike.category === category);
                      const avgPrice = bikesInCategory.reduce((sum, bike) => sum + bike.pricePerHour, 0) / bikesInCategory.length;
                      const availableBikes = bikesInCategory.filter(bike => bike.availability > 0).length;
                      
                      return (
                        <div key={index} className="p-3">
                          <div className="font-medium mb-1">{category}</div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <div className="text-muted-foreground">Велосипедов</div>
                              <div className="font-medium">{bikesInCategory.length}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Средняя цена</div>
                              <div className="font-medium">{avgPrice.toFixed(0)} ₽/ч</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Доступно</div>
                              <div className="font-medium">{availableBikes} шт.</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Управление характеристиками</CardTitle>
              <CardDescription>
                Настройте характеристики и спецификации велосипедов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium">Общие характеристики</h3>
                  <Button size="sm">
                    <Icon name="Plus" className="mr-2" size={14} />
                    Добавить характеристику
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Применимо к категориям</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Бренд</TableCell>
                        <TableCell>Текст</TableCell>
                        <TableCell>Все категории</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Вес</TableCell>
                        <TableCell>Число с единицей измерения</TableCell>
                        <TableCell>Все категории</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Размер колес</TableCell>
                        <TableCell>Выбор из вариантов</TableCell>
                        <TableCell>Все категории</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Тип тормозов</TableCell>
                        <TableCell>Выбор из вариантов</TableCell>
                        <TableCell>Все категории</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Количество передач</TableCell>
                        <TableCell>Число</TableCell>
                        <TableCell>Горный, Шоссейный, Городской</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-between pt-4">
                  <h3 className="text-lg font-medium">Категория: Горный</h3>
                  <Button size="sm">
                    <Icon name="Plus" className="mr-2" size={14} />
                    Добавить специфику
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Тип</TableHead>
                        <TableHead>Описание</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Тип амортизации</TableCell>
                        <TableCell>Выбор из вариантов</TableCell>
                        <TableCell>Передняя, Двойная, Без амортизации</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Ход амортизатора</TableCell>
                        <TableCell>Число с единицей измерения</TableCell>
                        <TableCell>Ход передней вилки в мм</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Icon name="Trash" size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="statistics">
          <Card>
            <CardHeader>
              <CardTitle>Статистика каталога</CardTitle>
              <CardDescription>
                Аналитика по велосипедам в каталоге
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{bikes.length}</div>
                      <p className="text-xs text-muted-foreground">
                        Всего велосипедов
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">
                        {bikes.reduce((acc, bike) => acc + bike.availability, 0)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Доступно для аренды
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">
                        {categories.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Категорий велосипедов
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">
                        {bikes.reduce((acc, bike) => acc + bike.pricePerHour, 0) / bikes.length}₽
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Средняя цена аренды (час)
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Категории велосипедов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Icon name="PieChart" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Здесь будет круговая диаграмма категорий</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Наличие по категориям</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <Icon name="BarChart3" size={48} className="mx-auto mb-2 opacity-50" />
                          <p>Здесь будет столбчатая диаграмма наличия</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Популярные велосипеды</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead className="text-center">Рейтинг</TableHead>
                            <TableHead className="text-right">Цена/час</TableHead>
                            <TableHead className="text-center">Доступно</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bikes
                            .sort((a, b) => b.rating - a.rating)
                            .slice(0, 5)
                            .map((bike) => (
                              <TableRow key={bike.id}>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 rounded-md overflow-hidden flex-shrink-0">
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
                                <TableCell className="text-center">
                                  <div className="flex items-center justify-center">
                                    <span className="text-amber-500 mr-1">{bike.rating}</span>
                                    <Icon name="Star" className="text-amber-500" size={14} />
                                  </div>
                                </TableCell>
                                <TableCell className="text-right font-medium">{bike.pricePerHour} ₽</TableCell>
                                <TableCell className="text-center">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    bike.availability > 0 
                                      ? "bg-green-100 text-green-800" 
                                      : "bg-red-100 text-red-800"
                                  }`}>
                                    {bike.availability}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог просмотра деталей велосипеда */}
      <Dialog open={bikeDetailOpen} onOpenChange={setBikeDetailOpen}>
        <DialogContent className="sm:max-w-[800px]">
          {selectedBike && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedBike.title}</DialogTitle>
                <DialogDescription>
                  ID: {selectedBike.id} • Категория: {selectedBike.category} • Добавлен: {selectedBike.createdAt.toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <div className="rounded-md overflow-hidden mb-4">
                    <img 
                      src={selectedBike.image} 
                      alt={selectedBike.title} 
                      className="h-full w-full object-cover aspect-[4/3]"
                      onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedBike.isNew && (
                      <Badge variant="secondary">Новый</Badge>
                    )}
                    {selectedBike.isPopular && (
                      <Badge variant="outline">Популярный</Badge>
                    )}
                    {selectedBike.isRecommended && (
                      <Badge>Рекомендуем</Badge>
                    )}
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-md mb-4">
                    <h3 className="font-medium mb-2">Описание</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedBike.description}
                    </p>
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Особенности</h3>
                    <ul className="text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedBike.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Icon name="Check" className="mr-2 text-green-600" size={14} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div>
                  <div className="bg-muted/40 p-4 rounded-md mb-4">
                    <h3 className="font-medium mb-2">Ценообразование</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Час:</span>
                        <span className="font-medium">{selectedBike.pricePerHour} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">День (8 часов):</span>
                        <span className="font-medium">{selectedBike.pricePerDay || selectedBike.pricePerHour * 8} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Неделя:</span>
                        <span className="font-medium">{selectedBike.pricePerWeek || selectedBike.pricePerHour * 40} ₽</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-md mb-4">
                    <h3 className="font-medium mb-2">Доступность</h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full ${
                        selectedBike.availability > 0 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {selectedBike.availability > 0 ? `Доступно: ${selectedBike.availability} шт.` : "Нет в наличии"}
                      </span>
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={selectedBike.availability <= 0}
                          onClick={() => handleAvailabilityChange(selectedBike.id, selectedBike.availability - 1)}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <span className="px-3">{selectedBike.availability}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAvailabilityChange(selectedBike.id, selectedBike.availability + 1)}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-md mb-4">
                    <h3 className="font-medium mb-2">Характеристики</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Бренд:</span>
                        <span className="font-medium">{selectedBike.specifications?.brand || selectedBike.features[0] || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Модель:</span>
                        <span className="font-medium">{selectedBike.specifications?.model || selectedBike.title.split(" ").slice(-1)[0] || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Размер рамы:</span>
                        <span className="font-medium">{selectedBike.specifications?.frameSize || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Вес:</span>
                        <span className="font-medium">{selectedBike.specifications?.weight || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Размер колес:</span>
                        <span className="font-medium">{selectedBike.specifications?.wheelSize || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Тип тормозов:</span>
                        <span className="font-medium">{selectedBike.specifications?.brakeType || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Кол-во передач:</span>
                        <span className="font-medium">{selectedBike.specifications?.gears || "-"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Рейтинг:</span>
                        <span className="font-medium flex items-center">
                          {selectedBike.rating}
                          <Icon name="Star" className="ml-1 text-amber-500" size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/40 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Информация о последних изменениях</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Добавлен:</span>
                        <span>{selectedBike.createdAt.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Последнее обновление:</span>
                        <span>{selectedBike.updatedAt.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <div className="flex justify-between w-full">
                  <Button variant="outline" onClick={() => setBikeDetailOpen(false)}>
                    Закрыть
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setBikeDetailOpen(false);
                        handleOpenEditDialog(selectedBike);
                      }}
                    >
                      <Icon name="Edit" className="mr-2" size={16} />
                      Редактировать
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => {
                        setBikeDetailOpen(false);
                        handleOpenDeleteDialog(selectedBike);
                      }}
                    >
                      <Icon name="Trash" className="mr-2" size={16} />
                      Удалить
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
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
  const [featureInput, setFeatureInput] = useState("");
  
  // Обработчик для добавления характеристики
  const handleAddFeature = () => {
    if (featureInput.trim() === "") return;
    
    const currentFeatures = form.getValues("features") || [];
    form.setValue("features", [...currentFeatures, featureInput.trim()]);
    setFeatureInput("");
  };
  
  // Обработчик для удаления характеристики
  const handleRemoveFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue("features", currentFeatures.filter((_, i) => i !== index));
  };
  
  // Обработчик для автоматического расчета цен за день и неделю
  const handlePricePerHourChange = (value: number) => {
    form.setValue("pricePerHour", value);
    form.setValue("pricePerDay", value * 8);
    form.setValue("pricePerWeek", value * 40);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Добавить велосипед' : 'Редактировать велосипед'}</DialogTitle>
          <DialogDescription>
            Заполните все поля, чтобы {mode === 'add' ? 'добавить новый' : 'обновить'} велосипед в каталог.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">Основная информация</TabsTrigger>
            <TabsTrigger value="pricing">Ценообразование</TabsTrigger>
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 mt-4">
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
                  <FormDescription>
                    Укажите прямую ссылку на изображение велосипеда
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-2 gap-4">
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
            
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="isNew"
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Новинка</FormLabel>
                        <FormDescription>
                          Отметить как новый
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isPopular"
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Популярный</FormLabel>
                        <FormDescription>
                          Отметить как популярный
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isRecommended"
                  render={({ field }) => (
                    <FormItem className="space-y-0 flex items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Рекомендуемый</FormLabel>
                        <FormDescription>
                          Рекомендовать клиентам
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4 mt-4">
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
                        onChange={(e) => handlePricePerHourChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pricePerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена за день (₽)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      8 часов (расчитывается автоматически)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pricePerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цена за неделю (₽)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field} 
                        onChange={(e) => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormDescription>
                      7 дней (расчитывается автоматически)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Ценовая политика</CardTitle>
                <CardDescription>
                  Рекомендации по ценообразованию для проката велосипедов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <Icon name="Info" className="text-blue-500 mt-0.5 shrink-0" size={16} />
                    <span>Дневная ставка обычно равна 7-8 часам аренды</span>
                  </li>
                  <li className="flex gap-2">
                    <Icon name="Info" className="text-blue-500 mt-0.5 shrink-0" size={16} />
                    <span>Недельная ставка обычно дает скидку 15-20% от дневной ставки за 7 дней</span>
                  </li>
                  <li className="flex gap-2">
                    <Icon name="Info" className="text-blue-500 mt-0.5 shrink-0" size={16} />
                    <span>Рекомендуется устанавливать цену на 30-50% выше для электровелосипедов</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specs" className="space-y-4 mt-4">
            {/* Характеристики */}
            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <FormLabel>Особенности и характеристики</FormLabel>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Добавьте характеристику..."
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="secondary"
                      onClick={handleAddFeature}
                    >
                      Добавить
                    </Button>
                  </div>
                  
                  <div className="border rounded-md p-3 space-y-2">
                    {form.watch("features")?.length ? 
                      form.watch("features").map((feature: string, index: number) => (
                        <div key={index} className="flex items-center justify-between bg-muted/40 p-2 rounded-md">
                          <span>{feature}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleRemoveFeature(index)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </div>
                      )) : 
                      <div className="text-center text-muted-foreground py-2">
                        Нет добавленных характеристик
                      </div>
                    }
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Технические спецификации</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="specifications.brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Бренд</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specifications.model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Модель</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="specifications.frameSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Размер рамы</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите размер" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="XS">XS</SelectItem>
                          <SelectItem value="S">S</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="L">L</SelectItem>
                          <SelectItem value="XL">XL</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specifications.weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Вес</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="например: 12 кг" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="specifications.wheelSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Размер колес</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите размер" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='24"'>24"</SelectItem>
                          <SelectItem value='26"'>26"</SelectItem>
                          <SelectItem value='27.5"'>27.5"</SelectItem>
                          <SelectItem value='29"'>29"</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specifications.brakeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тип тормозов</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Дисковые механические">Дисковые механические</SelectItem>
                          <SelectItem value="Дисковые гидравлические">Дисковые гидравлические</SelectItem>
                          <SelectItem value="V-Brake">V-Brake</SelectItem>
                          <SelectItem value="Ободные">Ободные</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="specifications.gears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Количество передач</FormLabel>
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
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6">
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
