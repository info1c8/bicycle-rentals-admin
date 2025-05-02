
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";

interface BikeReviewsProps {
  bikeId: number;
  reviewsCount: number;
  rating: number;
}

// Демо-данные для отзывов
const demoReviews = [
  {
    id: 1,
    userName: "Александр К.",
    userAvatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    date: "15 апреля 2023",
    text: "Отличный велосипед! Очень комфортно кататься, все работает исправно. Сервис на высоте, буду арендовать еще.",
  },
  {
    id: 2,
    userName: "Елена М.",
    userAvatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    date: "3 мая 2023",
    text: "Хороший велосипед, удобные сиденья и легкое управление. Единственный минус - на больших скоростях немного шумит цепь.",
  },
  {
    id: 3,
    userName: "Дмитрий В.",
    userAvatar: "https://i.pravatar.cc/150?img=15",
    rating: 5,
    date: "20 июня 2023",
    text: "Арендовал на выходные для поездки за город. Велосипед в идеальном состоянии, амортизация отлично справляется с неровностями дороги. Очень доволен!",
  },
];

const BikeReviews = ({ bikeId, reviewsCount, rating }: BikeReviewsProps) => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const generateRatingDistribution = () => {
    // Имитация распределения оценок
    return [
      { stars: 5, percentage: 70, count: Math.round(reviewsCount * 0.7) },
      { stars: 4, percentage: 20, count: Math.round(reviewsCount * 0.2) },
      { stars: 3, percentage: 7, count: Math.round(reviewsCount * 0.07) },
      { stars: 2, percentage: 2, count: Math.round(reviewsCount * 0.02) },
      { stars: 1, percentage: 1, count: Math.round(reviewsCount * 0.01) },
    ];
  };

  const ratingDistribution = generateRatingDistribution();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-1">Рейтинг</h3>
            <div className="flex items-center mb-4">
              <span className="text-4xl font-bold mr-2">{rating.toFixed(1)}</span>
              <div>
                <div className="flex mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}
                      fill={i < Math.floor(rating) ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">на основе {reviewsCount} отзывов</span>
              </div>
            </div>

            <div className="space-y-1">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center text-sm">
                  <div className="w-12">{item.stars} звезд</div>
                  <div className="flex-1 mx-3 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-yellow-400 h-full rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="w-8 text-right text-gray-500">{item.count}</div>
                </div>
              ))}
            </div>

            <Button
              className="w-full mt-6"
              onClick={() => setShowReviewForm(!showReviewForm)}
            >
              <Icon name="Star" className="mr-2" size={16} />
              Написать отзыв
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          {showReviewForm && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Оставить отзыв</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Ваша оценка</label>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={24}
                      className="mr-1 cursor-pointer text-gray-300 hover:text-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Ваш отзыв</label>
                <textarea
                  className="w-full border rounded-md p-2 min-h-24"
                  placeholder="Расскажите о вашем опыте использования..."
                />
              </div>
              <div className="flex gap-3">
                <Button>Отправить отзыв</Button>
                <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {demoReviews.map((review) => (
              <div key={review.id}>
                <div className="flex items-start mb-3">
                  <Avatar className="mr-3">
                    <AvatarImage src={review.userAvatar} alt={review.userName} />
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center mb-1">
                      <span className="font-medium mr-2">{review.userName}</span>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={14}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-300"}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                </div>
                <Separator />
              </div>
            ))}
          </div>

          {reviewsCount > 3 && (
            <Button variant="outline" className="mt-6">
              Показать больше отзывов
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BikeReviews;
