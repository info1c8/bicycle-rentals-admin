import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const LocationsSection = () => {
  const locations = [
    {
      id: 1,
      name: "Центральный парк",
      address: "ул. Парковая, 15",
      hours: "08:00 - 22:00",
      bikes: 25,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=500",
      features: ["Детские велосипеды", "Электровелосипеды", "Ремонт"]
    },
    {
      id: 2,
      name: "Набережная",
      address: "Набережная ул., 42",
      hours: "07:00 - 23:00",
      bikes: 30,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=500",
      features: ["Горные велосипеды", "Туристические", "Экскурсии"]
    },
    {
      id: 3,
      name: "Спортивный комплекс",
      address: "пр. Спортивный, 8",
      hours: "06:00 - 24:00",
      bikes: 40,
      image: "https://images.unsplash.com/photo-1544191696-15693072e0b5?auto=format&fit=crop&q=80&w=500",
      features: ["Профессиональные", "Шоссейные", "Тренировки"]
    },
    {
      id: 4,
      name: "Торговый центр",
      address: "ул. Торговая, 123",
      hours: "10:00 - 22:00",
      bikes: 20,
      image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&q=80&w=500",
      features: ["Городские", "Складные", "Быстрая аренда"]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши пункты проката</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Удобные локации по всему городу для быстрого получения велосипеда
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Icon name="MapPin" className="mr-2" size={14} />
                    {location.address}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Clock" className="mr-2" size={14} />
                    {location.hours}
                  </div>
                  <div className="flex items-center">
                    <Icon name="Bike" className="mr-2" size={14} />
                    {location.bikes} велосипедов
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-1">Особенности:</div>
                  <div className="flex flex-wrap gap-1">
                    {location.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Icon name="Navigation" className="mr-1" size={14} />
                    Маршрут
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Phone" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            <Icon name="Map" className="mr-2" size={16} />
            Посмотреть все на карте
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;