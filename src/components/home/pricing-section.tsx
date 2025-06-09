import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const PricingSection = () => {
  const plans = [
    {
      name: "Базовый",
      description: "Для редких поездок",
      price: "200",
      period: "час",
      popular: false,
      features: [
        "Городские велосипеды",
        "Базовая страховка",
        "Техподдержка 9-18",
        "Шлем в комплекте",
        "Замок в комплекте"
      ],
      buttonText: "Выбрать план",
      buttonVariant: "outline" as const
    },
    {
      name: "Популярный",
      description: "Для активного отдыха",
      price: "1500",
      period: "день",
      popular: true,
      features: [
        "Все типы велосипедов",
        "Расширенная страховка",
        "Техподдержка 24/7",
        "Полная экипировка",
        "Бесплатная доставка",
        "Скидка 15%"
      ],
      buttonText: "Выбрать план",
      buttonVariant: "default" as const
    },
    {
      name: "Премиум",
      description: "Для профессионалов",
      price: "8000",
      period: "неделя",
      popular: false,
      features: [
        "Премиум велосипеды",
        "VIP страховка",
        "Персональный менеджер",
        "Профессиональная экипировка",
        "Приоритетная доставка",
        "Скидка 25%",
        "Техобслуживание"
      ],
      buttonText: "Выбрать план",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Тарифные планы</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Выберите подходящий тариф для ваших потребностей
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  Популярный
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-gray-600">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  <span className="text-gray-500 ml-2">₽/{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Icon name="Check" className="text-green-500 mr-3" size={16} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  variant={plan.buttonVariant}
                  className="w-full"
                >
                  <Link to="/catalog">
                    {plan.buttonText}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Нужен индивидуальный тариф? Свяжитесь с нами!
          </p>
          <Button variant="outline" asChild>
            <Link to="/contacts">
              <Icon name="Phone" className="mr-2" size={16} />
              Связаться с нами
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;