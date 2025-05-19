
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList
} from "@/components/ui/breadcrumb";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Icon from "@/components/ui/icon";
import BikeReviews from "@/components/bike-detail/bike-reviews";
import RelatedBikes from "@/components/bike-detail/related-bikes";
import { bikeData } from "@/data/bike-data";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import { Bike } from "@/types/bike";

interface RentalPeriod {
  id: string;
  name: string;
  duration: number;
  priceMultiplier: number;
}

/**
 * Страница детальной информации о велосипеде
 */
const BikeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();

  const [bike, setBike] = useState<Bike | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("specifications");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("hour");
  const [relatedBikes, setRelatedBikes] = useState<Bike[]>([]);
  const [isFullDescriptionShown, setIsFullDescriptionShown] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const rentalPeriods: RentalPeriod[] = [
    { id: "hour", name: "Час", duration: 1, priceMultiplier: 1 },
    { id: "day", name: "День (8 часов)", duration: 8, priceMultiplier: bike?.pricePerDay ? bike.pricePerDay / bike.pricePerHour : 8 },
    { id: "week", name: "Неделя", duration: 7 * 8, priceMultiplier: bike?.pricePerWeek ? bike.pricePerWeek / bike.pricePerHour : 40 },
  ];

  // Получение данных о велосипеде
  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    const bikeId = parseInt(id);
    const foundBike = bikeData.find(b => b.id === bikeId);

    if (!foundBike) {
      navigate("/not-found");
      return;
    }

    // Добавляем расширенную информацию для велосипеда
    const enhancedBike: Bike = {
      ...foundBike,
      pricePerDay: foundBike.pricePerHour * 8,
      pricePerWeek: foundBike.pricePerHour * 40,
      specifications: {
        brand: foundBike.features[0] || "Trek",
        model: foundBike.title.split(" ").slice(-1)[0] || "X1",
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
    };

    setBike(enhancedBike);

    // Генерация галерии изображений
    generateGalleryImages(foundBike.image);

    // Поиск похожих велосипедов
    const similar = bikeData
      .filter(b => b.id !== bikeId && (b.category === foundBike.category || b.pricePerHour <= foundBike.pricePerHour * 1.2 && b.pricePerHour >= foundBike.pricePerHour * 0.8))
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    setRelatedBikes(similar);
  }, [id, navigate]);

  // Генерирует дополнительные изображения для галереи
  const generateGalleryImages = (mainImage: string) => {
    // Используем основное изображение
    const images = [mainImage];

    // Добавляем несколько случайных изображений велосипедов
    const bikePlaceholders = [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde",
      "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7",
      "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91",
      "https://images.unsplash.com/photo-1505705694340-019e1e335916",
    ];

    // Добавляем 3-5 случайных изображений
    const extraImagesCount = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < extraImagesCount; i++) {
      const randomImageIndex = Math.floor(Math.random() * bikePlaceholders.length);
      images.push(bikePlaceholders[randomImageIndex]);
    }

    setGalleryImages(images);
  };

  // Обработчик добавления в корзину
  const handleAddToCart = () => {
    if (!bike) return;

    const selectedPeriodInfo = rentalPeriods.find(p => p.id === selectedPeriod);
    if (!selectedPeriodInfo) return;

    const unitPrice = bike.pricePerHour * selectedPeriodInfo.priceMultiplier;

    addItem({
      id: bike.id,
      title: bike.title,
      image: bike.image,
      quantity: selectedQuantity,
      unitPrice: unitPrice,
      rentalPeriod: selectedPeriodInfo.name,
      totalPrice: unitPrice * selectedQuantity,
      duration: selectedPeriodInfo.duration,
    });

    toast({
      title: "Добавлено в корзину",
      description: `${bike.title} (${selectedQuantity} шт.) добавлен в корзину.`,
    });
  };

  // Если данные о велосипеде еще не загружены
  if (!bike) {
    return (
      <div className="container py-12 flex justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin">
            <Icon name="Loader2" size={48} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Загрузка информации о велосипеде...</p>
        </div>
      </div>
    );
  }

  // Вычисление стоимости в зависимости от периода аренды
  const selectedPeriodInfo = rentalPeriods.find(p => p.id === selectedPeriod);
  const rentalPrice = selectedPeriodInfo
    ? bike.pricePerHour * selectedPeriodInfo.priceMultiplier
    : bike.pricePerHour;
  const totalPrice = rentalPrice * selectedQuantity;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container py-8">
        {/* Хлебные крошки */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/catalog?category=${bike.category}`}>{bike.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{bike.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Галерея изображений */}
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-muted">
              <img
                src={bike.image}
                alt={bike.title}
                className="w-full h-full object-cover"
                onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
              />
              {(bike.isNew || bike.isPopular || bike.isRecommended) && (
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {bike.isNew && <Badge variant="secondary">Новинка</Badge>}
                  {bike.isPopular && <Badge variant="outline">Популярный</Badge>}
                  {bike.isRecommended && <Badge>Рекомендуем</Badge>}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsGalleryOpen(true)}
              >
                <Icon name="Images" className="mr-2" size={16} />
                Все фото
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {galleryImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative rounded-md overflow-hidden aspect-square cursor-pointer"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <img
                    src={image}
                    alt={`${bike.title} - фото ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
                  />
                  {index === 3 && galleryImages.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium">
                      +{galleryImages.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Информация о велосипеде */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{bike.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="Star" className="mr-1 text-amber-500" size={16} />
                  <span>{bike.rating} (32 отзыва)</span>
                </div>
                <div className="flex items-center">
                  <Icon name="CheckCircle" className="mr-1 text-green-600" size={16} />
                  <span>В наличии: {bike.availability} шт.</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Tag" className="mr-1" size={16} />
                  <span>{bike.category}</span>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <p className={`text-muted-foreground ${isFullDescriptionShown ? '' : 'line-clamp-3'}`}>
                {bike.description}
              </p>
              {bike.description.length > 150 && (
                <Button
                  variant="link"
                  className="p-0 h-auto font-normal"
                  onClick={() => setIsFullDescriptionShown(!isFullDescriptionShown)}
                >
                  {isFullDescriptionShown ? "Свернуть" : "Читать полностью"}
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Стоимость аренды</h2>
              <div className="flex gap-4 flex-wrap">
                {rentalPeriods.map((period) => (
                  <Card
                    key={period.id}
                    className={`cursor-pointer hover:border-primary transition-colors ${selectedPeriod === period.id ? 'border-primary bg-muted/30' : ''}`}
                    onClick={() => setSelectedPeriod(period.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{period.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {period.id === "hour" && "Почасовая аренда"}
                          {period.id === "day" && "Скидка 10-15%"}
                          {period.id === "week" && "Скидка 20-25%"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {(bike.pricePerHour * period.priceMultiplier).toLocaleString()} ₽
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="w-full sm:w-1/3">
                  <label className="text-sm font-medium mb-1 block">Количество</label>
                  <Select
                    value={selectedQuantity.toString()}
                    onValueChange={(value) => setSelectedQuantity(parseInt(value))}
                    disabled={bike.availability === 0}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите количество" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: Math.min(bike.availability, 10) }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} шт.
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 sm:flex-none"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={bike.availability === 0}
                    >
                      <Icon name="ShoppingCart" className="mr-2" size={16} />
                      Добавить в корзину
                    </Button>
                    <div className="text-right flex-1 flex flex-col justify-center">
                      <div className="text-lg font-bold">{totalPrice.toLocaleString()} ₽</div>
                      <div className="text-xs text-muted-foreground">
                        {selectedQuantity} × {rentalPrice.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Основные характеристики</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Бренд:</span>
                  <span className="font-medium">{bike.specifications?.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Модель:</span>
                  <span className="font-medium">{bike.specifications?.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Размер рамы:</span>
                  <span className="font-medium">{bike.specifications?.frameSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Размер колес:</span>
                  <span className="font-medium">{bike.specifications?.wheelSize}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="mt-12">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start border-b rounded-none mb-6">
              <TabsTrigger value="specifications" className="text-base">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">Отзывы</TabsTrigger>
              <TabsTrigger value="rental-terms" className="text-base">Условия аренды</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Технические характеристики</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Бренд</span>
                      <span className="font-medium">{bike.specifications?.brand}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Модель</span>
                      <span className="font-medium">{bike.specifications?.model}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Размер рамы</span>
                      <span className="font-medium">{bike.specifications?.frameSize}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Вес</span>
                      <span className="font-medium">{bike.specifications?.weight}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Размер колес</span>
                      <span className="font-medium">{bike.specifications?.wheelSize}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Тип тормозов</span>
                      <span className="font-medium">{bike.specifications?.brakeType}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Количество передач</span>
                      <span className="font-medium">{bike.specifications?.gears}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Особенности и преимущества</h3>
                  <ul className="space-y-2">
                    {bike.features.map((feature, index) => (
                      <li key={index} className="flex items-start py-2 border-b">
                        <Icon name="CheckCircle" className="mr-2 text-green-600 shrink-0 mt-0.5" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <BikeReviews bikeId={bike.id} bikeName={bike.title} rating={bike.rating} />
            </TabsContent>

            <TabsContent value="rental-terms">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Общие условия аренды</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="rounded-full bg-primary/10 p-2 shrink-0">
                        <Icon name="Clock" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Время работы проката</h4>
                        <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="rounded-full bg-primary/10 p-2 shrink-0">
                        <Icon name="UserCheck" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Требования к арендатору</h4>
                        <p className="text-muted-foreground">Возраст от 18 лет, наличие паспорта и залога</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="rounded-full bg-primary/10 p-2 shrink-0">
                        <Icon name="ShieldCheck" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Залог</h4>
                        <p className="text-muted-foreground">Документы (паспорт) или денежный залог (от 2000 ₽, зависит от модели велосипеда)</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="rounded-full bg-primary/10 p-2 shrink-0">
                        <Icon name="CreditCard" className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Способы оплаты</h4>
                        <p className="text-muted-foreground">Наличные, банковская карта, онлайн-платеж</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Правила использования</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Icon name="AlertTriangle" className="mr-2 text-amber-500 shrink-0 mt-0.5" size={18} />
                      <span>Использовать велосипед только по назначению и соблюдать правила дорожного движения</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="AlertTriangle" className="mr-2 text-amber-500 shrink-0 mt-0.5" size={18} />
                      <span>Не передавать велосипед третьим лицам</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="AlertTriangle" className="mr-2 text-amber-500 shrink-0 mt-0.5" size={18} />
                      <span>Бережно относиться к арендованному имуществу</span>
                    </li>
                    <li className="flex items-start">
                      <Icon name="AlertTriangle" className="mr-2 text-amber-500 shrink-0 mt-0.5" size={18} />
                      <span>Вернуть велосипед в исходном состоянии в указанное время</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="InfoIcon" className="text-blue-500" size={18} />
                    <h4 className="font-medium">Важная информация</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    В случае повреждения или утери велосипеда, арендатор несет полную материальную ответственность.
                    При задержке возврата велосипеда взимается дополнительная плата за каждый час просрочки.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Похожие велосипеды */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Похожие велосипеды</h2>
          <RelatedBikes bikes={relatedBikes} />
        </div>

        {/* Диалог галереи */}
        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
            <DialogHeader className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/60 to-transparent">
              <DialogTitle className="text-white">{bike.title} - Фотогалерея</DialogTitle>
              <DialogDescription className="text-white/80">
                {galleryImages.length} фотографий
              </DialogDescription>
            </DialogHeader>

            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="flex aspect-[16/9] items-center justify-center overflow-hidden">
                      <img
                        src={image}
                        alt={`${bike.title} - фото ${index + 1}`}
                        className="h-full w-full object-cover"
                        onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>

            <DialogFooter className="p-4 border-t">
              <Button variant="outline" onClick={() => setIsGalleryOpen(false)}>
                Закрыть
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default BikeDetail;
