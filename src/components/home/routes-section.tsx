import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const RoutesSection = () => {
  const routes = [
    {
      id: 1,
      name: "Парковый маршрут",
      distance: "8 км",
      duration: "45 мин",
      difficulty: "Легкий",
      description: "Спокойная поездка по парковым дорожкам, идеально для семей с детьми",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=400",
      highlights: ["Детские площадки", "Кафе", "Фонтаны"],
      difficultyColor: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      name: "Набережная",
      distance: "12 км",
      duration: "1 час",
      difficulty: "Средний",
      description: "Живописный маршрут вдоль реки с красивыми видами на город",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400",
      highlights: ["Речные виды", "Мосты", "Смотровые площадки"],
      difficultyColor: "bg-yellow-100 text-yellow-800"
    },
    {
      id: 3,
      name: "Горный трейл",
      distance: "15 км",
      duration: "1.5 часа",
      difficulty: "Сложный",
      description: "Экстремальный маршрут для опытных велосипедистов с подъемами",
      image: "https://images.unsplash.com/photo-1544191696-15693072e0b5?auto=format&fit=crop&q=80&w=400",
      highlights: ["Горные виды", "Лесные тропы", "Подъемы"],
      difficultyColor: "bg-red-100 text-red-800"
    },
    {
      id: 4,
      name: "Исторический центр",
      distance: "6 км",
      duration: "40 мин",
      difficulty: "Легкий",
      description: "Экскурсионный маршрут по историческим достопримечательностям",
      image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&q=80&w=400",
      highlights: ["Памятники", "Музеи", "Архитектура"],
      difficultyColor: "bg-green-100 text-green-800"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Популярные маршруты</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Откройте для себя лучшие велосипедные маршруты города
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {routes.map((route) => (
            <Card key={route.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={route.image} 
                  alt={route.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <Badge className={`absolute top-3 right-3 ${route.difficultyColor}`}>
                  {route.difficulty}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{route.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{route.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Icon name="MapPin" className="mr-1" size={14} />
                      Расстояние
                    </div>
                    <span className="font-medium">{route.distance}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Icon name="Clock" className="mr-1" size={14} />
                      Время
                    </div>
                    <span className="font-medium">{route.duration}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Особенности:</div>
                  <div className="flex flex-wrap gap-1">
                    {route.highlights.map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button size="sm" className="w-full">
                  <Icon name="Navigation" className="mr-2" size={14} />
                  Начать маршрут
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            <Icon name="Map" className="mr-2" size={16} />
            Посмотреть все маршруты
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoutesSection;