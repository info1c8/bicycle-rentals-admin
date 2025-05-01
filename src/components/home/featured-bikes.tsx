
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

type BikeCardProps = {
  id: number;
  title: string;
  image: string;
  category: string;
  pricePerHour: number;
};

const BikeCard = ({ id, title, image, category, pricePerHour }: BikeCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs rounded-full px-2 py-1">
          {category}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <Icon name="Clock" size={14} className="mr-1" />
            <span>{pricePerHour} ₽/час</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/bikes/${id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Подробнее
            </Button>
          </Link>
          <Button size="sm" className="flex-1">
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            Забронировать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const FeaturedBikes = () => {
  const bikes = [
    {
      id: 1,
      title: "Горный велосипед XC Pro",
      image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1470",
      category: "Горный",
      pricePerHour: 250,
    },
    {
      id: 2,
      title: "Городской велосипед Urban Lite",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=1470",
      category: "Городской",
      pricePerHour: 200,
    },
    {
      id: 3,
      title: "Шоссейный велосипед Roadster",
      image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1476",
      category: "Шоссейный",
      pricePerHour: 300,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Популярные велосипеды</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите из нашей коллекции велосипедов разных типов и для разных целей
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} {...bike} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/catalog">
            <Button size="lg" variant="outline">
              Смотреть все велосипеды
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBikes;
