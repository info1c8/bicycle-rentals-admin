import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const StatsSection = () => {
  const stats = [
    {
      icon: "Users",
      number: "5000+",
      label: "Довольных клиентов",
      description: "За все время работы"
    },
    {
      icon: "Bike",
      number: "150+",
      label: "Велосипедов в парке",
      description: "Разных типов и моделей"
    },
    {
      icon: "MapPin",
      number: "12",
      label: "Пунктов проката",
      description: "По всему городу"
    },
    {
      icon: "Star",
      number: "4.9",
      label: "Средняя оценка",
      description: "На основе отзывов"
    },
    {
      icon: "Clock",
      number: "24/7",
      label: "Поддержка",
      description: "Круглосуточно"
    },
    {
      icon: "Award",
      number: "3",
      label: "Года на рынке",
      description: "Опыт и надежность"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши достижения</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Цифры, которые говорят о качестве нашего сервиса
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={stat.icon as any} className="text-primary" size={24} />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;