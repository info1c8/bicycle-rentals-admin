import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const PromotionsSection = () => {
  const promotions = [
    {
      id: 1,
      title: "Весенняя скидка 30%",
      description: "На все велосипеды при аренде от 3 дней",
      discount: "30%",
      validUntil: "31 мая 2024",
      code: "SPRING30",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400",
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Семейный пакет",
      description: "4 велосипеда по цене 3 для семей с детьми",
      discount: "25%",
      validUntil: "15 июня 2024",
      code: "FAMILY25",
      image: "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&q=80&w=400",
      color: "bg-blue-500"
    },
    {
      id: 3,
      title: "Первая аренда",
      description: "Скидка для новых клиентов на первую аренду",
      discount: "20%",
      validUntil: "Постоянно",
      code: "FIRST20",
      image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=400",
      color: "bg-purple-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-red-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Специальные предложения</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Воспользуйтесь выгодными акциями и сэкономьте на аренде велосипедов
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={promo.image} 
                  alt={promo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute top-4 right-4 ${promo.color} text-white px-3 py-1 rounded-full font-bold`}>
                  -{promo.discount}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{promo.title}</h3>
                  <p className="text-sm opacity-90">{promo.description}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="font-mono">
                      {promo.code}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      до {promo.validUntil}
                    </span>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link to="/catalog">
                      <Icon name="Tag" className="mr-2" size={16} />
                      Использовать промокод
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Подпишитесь на рассылку, чтобы первыми узнавать о новых акциях
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Ваш email" 
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button>
              <Icon name="Mail" className="mr-2" size={16} />
              Подписаться
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;