import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  bikeModel: string;
  text: string;
  likes: number;
  isVerified: boolean;
}

const Reviews = () => {
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState("recent");
  const [filterRating, setFilterRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Демо-данные отзывов
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      userName: "Александр К.",
      userAvatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      date: "15 апреля 2023",
      bikeModel: "Горный велосипед Trek",
      text: "Отличный велосипед! Очень комфортно кататься, все работает исправно. Сервис на высоте, буду арендовать еще.",
      likes: 12,
      isVerified: true
    },
    {
      id: 2,
      userName: "Елена М.",
      userAvatar: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      date: "3 мая 2023",
      bikeModel: "Городской велосипед Giant",
      text: "Хороший велосипед, удобные сиденья и легкое управление. Единственный минус - на больших скоростях немного шумит цепь.",
      likes: 8,
      isVerified: true
    },
    {
      id: 3,
      userName: "Дмитрий В.",
      userAvatar: "https://i.pravatar.cc/150?img=15",
      rating: 5,
      date: "20 июня 2023",
      bikeModel: "Электровелосипед Specialized",
      text: "Арендовал на выходные для поездки за город. Велосипед в идеальном состоянии, амортизация отлично справляется с неровностями дороги. Очень доволен!",
      likes: 15,
      isVerified: true
    },
    {
      id: 4,
      userName: "Ольга С.",
      rating: 3,
      date: "10 июля 2023",
      bikeModel: "Складной велосипед Brompton",
      text: "В целом неплохо, но есть некоторые нюансы. Механизм складывания немного тугой, нужно приловчиться.",
      likes: 4,
      isVerified: false
    },
    {
      id: 5,
      userName: "Максим П.",
      userAvatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      date: "25 июля 2023",
      bikeModel: "Горный велосипед Specialized",
      text: "Великолепный велосипед! Отличная геометрия рамы, качественное оборудование. Персонал очень внимательный, помогли с выбором размера.",
      likes: 21,
      isVerified: true
    }
  ]);

  // Фильтрация и сортировка отзывов
  const filteredAndSortedReviews = [...reviews]
    .filter(review => {
      const matchesSearch = review.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.bikeModel.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRating = filterRating === "all" || review.rating === parseInt(filterRating);
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "likes":
          return b.likes - a.likes;
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  // Статистика отзывов
  const stats = {
    total: reviews.length,
    average: (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1),
    verified: reviews.filter(review => review.isVerified).length,
    distribution: Array.from({ length: 5 }, (_, i) => {
      const count = reviews.filter(review => review.rating === i + 1).length;
      return {
        rating: i + 1,
        count,
        percentage: Math.round((count / reviews.length) * 100)
      };
    }).reverse()
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Отзывы наших клиентов</h1>
              <p className="text-lg text-white/80">
                Узнайте, что говорят о нас клиенты и поделитесь своим опытом
              </p>
            </div>
          </div>
        </section>

        {/* Reviews Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Статистика и фильтры */}
              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-6">
                  {/* Общая статистика */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-primary mb-1">{stats.average}</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            name="Star"
                            className={star <= parseFloat(stats.average) ? "text-yellow-400" : "text-gray-200"}
                            fill={star <= parseFloat(stats.average) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        На основе {stats.total} отзывов
                      </div>
                    </div>

                    <div className="space-y-2">
                      {stats.distribution.map((item) => (
                        <div key={item.rating} className="flex items-center gap-2">
                          <div className="w-12 text-sm text-gray-600">{item.rating} звезд</div>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <div className="w-12 text-sm text-gray-600 text-right">
                            {item.count}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Проверенных отзывов:</span>
                        <span>{stats.verified}</span>
                      </div>
                    </div>
                  </div>

                  {/* Фильтры */}
                  <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                    <h3 className="font-medium mb-4">Фильтры</h3>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Поиск</label>
                      <Input
                        placeholder="Поиск по отзывам..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Сортировка</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сортировку" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Сначала новые</SelectItem>
                          <SelectItem value="rating">По рейтингу</SelectItem>
                          <SelectItem value="likes">По популярности</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Фильтр по оценке</label>
                      <Select value={filterRating} onValueChange={setFilterRating}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите оценку" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Все оценки</SelectItem>
                          <SelectItem value="5">5 звезд</SelectItem>
                          <SelectItem value="4">4 звезды</SelectItem>
                          <SelectItem value="3">3 звезды</SelectItem>
                          <SelectItem value="2">2 звезды</SelectItem>
                          <SelectItem value="1">1 звезда</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {(searchQuery || filterRating !== "all") && (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSearchQuery("");
                          setFilterRating("all");
                        }}
                      >
                        <Icon name="RotateCcw" className="mr-2" size={16} />
                        Сбросить фильтры
                      </Button>
                    )}
                  </div>

                  {/* Форма добавления отзыва */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-medium mb-4">Оставить отзыв</h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        toast({
                          title: "Отзыв отправлен",
                          description: "Спасибо за ваш отзыв! После модерации он появится на сайте.",
                        });
                      }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ваша оценка</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Button
                              key={star}
                              variant="ghost"
                              size="icon"
                              className="hover:text-yellow-400"
                            >
                              <Icon
                                name="Star"
                                className="text-gray-300 hover:text-yellow-400"
                                fill="none"
                              />
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Велосипед</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите велосипед" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trek">Горный велосипед Trek</SelectItem>
                            <SelectItem value="giant">Городской велосипед Giant</SelectItem>
                            <SelectItem value="specialized">Электровелосипед Specialized</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ваш отзыв</label>
                        <Textarea
                          placeholder="Поделитесь своими впечатлениями..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Отправить отзыв
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Список отзывов */}
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  {filteredAndSortedReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white p-6 rounded-lg shadow-sm space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            {review.userAvatar ? (
                              <AvatarImage src={review.userAvatar} alt={review.userName} />
                            ) : (
                              <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                            )}
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.userName}</span>
                              {review.isVerified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Icon name="CheckCircle" className="mr-1" size={12} />
                                  Проверено
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Icon
                              key={star}
                              name="Star"
                              size={16}
                              className={star <= review.rating ? "text-yellow-400" : "text-gray-200"}
                              fill={star <= review.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-500 mb-2">{review.bikeModel}</div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-primary"
                          onClick={() => {
                            toast({
                              title: "Спасибо за оценку!",
                              description: "Ваш голос учтен.",
                            });
                          }}
                        >
                          <Icon name="ThumbsUp" className="mr-2" size={16} />
                          Полезно ({review.likes})
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          <Icon name="MessageSquare" className="mr-2" size={16} />
                          Комментировать
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredAndSortedReviews.length === 0 && (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
                        <Icon name="Search" className="text-gray-400" size={24} />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Отзывы не найдены</h3>
                      <p className="text-gray-500">
                        Попробуйте изменить параметры фильтрации
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;