
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { Bike } from "@/types/bike";

interface BikeGridProps {
  bikes: Bike[];
}

const BikeCard = ({ id, title, image, category, pricePerHour, available }: Bike) => {
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
        {!available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-red-500 rounded">
              Недоступен
            </span>
          </div>
        )}
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
          <Button size="sm" className="flex-1" disabled={!available}>
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            Забронировать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BikeGrid = ({ bikes }: BikeGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bikes.map((bike) => (
        <BikeCard key={bike.id} {...bike} />
      ))}
    </div>
  );
};

export default BikeGrid;
