import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PopularBikesCard = () => {
  const popularBikes = [
    { name: "Горный велосипед Trek", rentals: 45, percentage: 85 },
    { name: "Городской велосипед Giant", rentals: 38, percentage: 72 },
    { name: "Электровелосипед Specialized", rentals: 32, percentage: 60 },
    { name: "BMX велосипед", rentals: 18, percentage: 34 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Популярные велосипеды</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {popularBikes.map((bike, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{bike.name}</span>
                <span className="text-muted-foreground">
                  {bike.rentals} аренд
                </span>
              </div>
              <Progress value={bike.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularBikesCard;
