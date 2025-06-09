import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Анна Петрова",
      role: "Туристка",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "Отличный сервис! Велосипеды в идеальном состоянии, персонал очень дружелюбный. Обязательно вернусь еще!",
      date: "2 дня назад"
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      role: "Бизнесмен",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Арендовал велосипед для деловой поездки. Все прошло быстро и без проблем. Рекомендую!",
      date: "1 неделю назад"
    },
    {
      id: 3,
      name: "Елена Козлова",
      role: "Мама двоих детей",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "Прекрасно провели выходные всей семьей! Детские велосипеды в отличном состоянии, есть все размеры.",
      date: "2 недели назад"
    },
    {
      id: 4,
      name: "Дмитрий Волков",
      role: "Спортсмен",
      avatar: "https://i.pravatar.cc/150?img=15",
      rating: 5,
      text: "Профессиональные горные велосипеды высокого качества. Отличная техническая поддержка.",
      date: "3 недели назад"
    },
    {
      id: 5,
      name: "Ольга Морозова",
      role: "Студентка",
      avatar: "https://i.pravatar.cc/150?img=6",
      rating: 4,
      text: "Доступные цены и удобное расположение пунктов проката. Пользуюсь регулярно!",
      date: "1 месяц назад"
    },
    {
      id: 6,
      name: "Александр Новиков",
      role: "Фотограф",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      text: "Арендую велосипеды для фотосессий. Всегда чистые, исправные. Отличный сервис!",
      date: "1 месяц назад"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Отзывы наших клиентов</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Узнайте, что говорят о нас наши довольные клиенты
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                
                <div className="text-xs text-gray-400">{testimonial.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;