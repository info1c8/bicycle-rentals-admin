
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { bikeData } from "@/data/bike-data";
import { Bike } from "@/types/bike";

interface RelatedBikesProps {
  currentBikeId: number;
  category: string;
}

const RelatedBikes = ({ currentBikeId, category }: RelatedBikesProps) => {
  const relatedBikes = useMemo(() => {
    // Находим похожие велосипеды той же категории, исключая текущий
    return bikeData
      .filter(bike => bike.id !== currentBikeId && bike.category === category)
      .slice(0, 4); // Ограничиваем 4 велосипедами
  }, [currentBikeId, category]);

  if (relatedBikes.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedBikes.map((bike) => (
        <RelatedBikeCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
};

const RelatedBikeCard = ({ bike }: { bike: Bike }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={bike.image} 
          alt={bike.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-primary text-white text-xs rounded-full px-2 py-1">
          {bike.category}
        </div>
        {!bike.available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-red-500 rounded">
              Недоступен
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{bike.title}</h3>
          <div className="flex items-center text-gray-500 text-xs">
            <Icon name="Clock" size={12} className="mr-1" />
            <span>{bike.pricePerHour} ₽/час</span>
          </div>
        </div>
        <div className="flex">
          <Link to={`/bikes/${bike.id}`} className="w-full">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Подробнее
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedBikes;
