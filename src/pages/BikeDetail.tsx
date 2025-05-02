
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Icon from "@/components/ui/icon";
import { bikeData } from "@/data/bike-data";
import { Bike } from "@/types/bike";
import RelatedBikes from "@/components/bike-detail/related-bikes";
import BikeReviews from "@/components/bike-detail/bike-reviews";
import { useToast } from "@/hooks/use-toast";

const BikeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rentalDuration, setRentalDuration] = useState(1); // часы
  const { toast } = useToast();

  useEffect(() => {
    // Имитация загрузки данных
    setLoading(true);
    setTimeout(() => {
      const foundBike = bikeData.find((b) => b.id === Number(id));
      setBike(foundBike || null);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleAddToCart = () => {
    toast({
      title: "Велосипед добавлен в корзину",
      description: `${bike?.title} добавлен в корзину на ${rentalDuration} ч.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <Icon name="Loader2" className="animate-spin mr-2 mb-2" size={24} />
            <p>Загрузка данных...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12 text-center">
            <Icon name="AlertCircle" size={48} className="mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold mb-4">Велосипед не найден</h1>
            <p className="mb-6">Извините, запрашиваемый велосипед не найден в нашем каталоге.</p>
            <Link to="/catalog">
              <Button>
                <Icon name="ArrowLeft" className="mr-2" size={16} />
                Вернуться в каталог
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link to="/" className="hover:text-primary">Главная</Link>
              <Icon name="ChevronRight" size={14} className="mx-2" />
              <Link to="/catalog" className="hover:text-primary">Каталог</Link>
              <Icon name="ChevronRight" size={14} className="mx-2" />
              <span className="text-gray-900 font-medium">{bike.title}</span>
            </div>
          </div>
        </div>

        {/* Product Detail */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="w-full lg:w-1/2">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-[4/3]">
                <img
                  src={bike.image}
                  alt={bike.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-gray-100 rounded cursor-pointer aspect-square overflow-hidden">
                    <img
                      src={bike.image}
                      alt={`${bike.title} view ${index + 1}`}
                      className="w-full h-full object-cover hover:opacity-80 transition"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="px-3 py-1">
                  {bike.category}
                </Badge>
                {bike.available ? (
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    В наличии
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                    Недоступен
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-2">{bike.title}</h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < Math.floor(bike.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                      fill={i < Math.floor(bike.rating || 0) ? "currentColor" : "none"}
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{bike.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {bike.reviewsCount} отзывов
                </span>
              </div>

              <div className="text-2xl font-bold mb-4 flex items-center">
                <span>{bike.pricePerHour} ₽/час</span>
                <span className="text-sm text-gray-500 font-normal ml-2">
                  ({bike.pricePerHour * 24} ₽/день)
                </span>
              </div>

              <p className="text-gray-700 mb-6">{bike.description}</p>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Особенности:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {bike.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Icon name="CheckCircle" className="text-green-500 mr-2" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="my-6" />

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="mr-8">
                    <label className="block text-sm font-medium mb-1">
                      Количество
                    </label>
                    <div className="flex items-center border rounded-md">
                      <button
                        className="px-3 py-1 text-lg"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x">{quantity}</span>
                      <button
                        className="px-3 py-1 text-lg"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={!bike.available}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Длительность (часов)
                    </label>
                    <select
                      className="border rounded-md p-2 w-24"
                      value={rentalDuration}
                      onChange={(e) => setRentalDuration(Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6, 12, 24, 48, 72].map((hours) => (
                        <option key={hours} value={hours}>
                          {hours}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Итого:</span>
                  <span className="text-xl font-bold">
                    {bike.pricePerHour * quantity * rentalDuration} ₽
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  * Для аренды необходим залог (документ или денежный залог)
                </p>

                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={!bike.available}
                  >
                    <Icon name="ShoppingCart" className="mr-2" size={18} />
                    Добавить в корзину
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    disabled={!bike.available}
                  >
                    <Icon name="Heart" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start border-b mb-0 rounded-none bg-transparent h-auto">
                <TabsTrigger value="details" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Детали
                </TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Отзывы ({bike.reviewsCount})
                </TabsTrigger>
                <TabsTrigger value="policy" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">
                  Правила аренды
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Спецификации</h3>
                    <div className="space-y-2">
                      <div className="flex border-b pb-2">
                        <span className="font-medium w-1/2">Бренд</span>
                        <span className="w-1/2">Trek</span>
                      </div>
                      <div className="flex border-b pb-2">
                        <span className="font-medium w-1/2">Модель</span>
                        <span className="w-1/2">{bike.title}</span>
                      </div>
                      <div className="flex border-b pb-2">
                        <span className="font-medium w-1/2">Тип</span>
                        <span className="w-1/2">{bike.category}</span>
                      </div>
                      <div className="flex border-b pb-2">
                        <span className="font-medium w-1/2">Вес</span>
                        <span className="w-1/2">11.2 кг</span>
                      </div>
                      <div className="flex border-b pb-2">
                        <span className="font-medium w-1/2">Год</span>
                        <span className="w-1/2">2023</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Описание</h3>
                    <p className="text-gray-700">
                      {bike.description}
                    </p>
                    <p className="text-gray-700 mt-4">
                      Наши велосипеды регулярно проходят техническое обслуживание и всегда находятся в отличном состоянии. 
                      Мы предлагаем велосипеды различных размеров для райдеров любого роста.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <BikeReviews bikeId={bike.id} reviewsCount={bike.reviewsCount || 0} rating={bike.rating || 0} />
              </TabsContent>
              <TabsContent value="policy" className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Правила аренды</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Для аренды необходим паспорт или другой документ, удостоверяющий личность</li>
                      <li>Необходимо внести залог (денежные средства или документ)</li>
                      <li>Минимальное время аренды - 1 час</li>
                      <li>В случае повреждения велосипеда клиент несет материальную ответственность</li>
                      <li>Бронь необходимо подтвердить за 24 часа до аренды</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Возврат и отмена</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Отмена брони возможна за 12 часов до начала аренды</li>
                      <li>При отмене менее чем за 12 часов возвращается 50% предоплаты</li>
                      <li>При возврате велосипеда раньше срока разница не возвращается</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Похожие велосипеды</h2>
            <RelatedBikes currentBikeId={bike.id} category={bike.category} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BikeDetail;
