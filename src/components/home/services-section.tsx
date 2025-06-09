import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      icon: "Bike",
      title: "Аренда велосипедов",
      description: "Широкий выбор велосипедов для любых целей: горные, городские, электрические и детские модели.",
      features: ["150+ велосипедов", "Все типы и размеры", "Регулярное ТО"],
      link: "/catalog"
    },
    {
      icon: "Truck",
      title: "Доставка",
      description: "Доставляем велосипеды прямо к вам домой или в офис. Быстро, удобно и надежно.",
      features: ["По всему городу", "В течение часа", "Бесплатно от 2000₽"],
      link: "/delivery"
    },
    {
      icon: "Users",
      title: "Групповые туры",
      description: "Организуем велосипедные экскурсии и туры для компаний, семей и друзей.",
      features: ["Опытные гиды", "Интересные маршруты", "Скидки группам"],
      link: "/tours"
    },
    {
      icon: "Wrench",
      title: "Техобслуживание",
      description: "Профессиональный ремонт и обслуживание велосипедов любой сложности.",
      features: ["Опытные мастера", "Оригинальные запчасти", "Гарантия качества"],
      link: "/service"
    },
    {
      icon: "GraduationCap",
      title: "Обучение",
      description: "Курсы вождения для начинающих и мастер-классы по велосипедному спорту.",
      features: ["Индивидуальные занятия", "Групповые курсы", "Сертификаты"],
      link: "/training"
    },
    {
      icon: "Shield",
      title: "Страхование",
      description: "Полная страховка велосипеда и велосипедиста на время аренды.",
      features: ["Полное покрытие", "Быстрые выплаты", "Без франшизы"],
      link: "/insurance"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Наши услуги</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Полный спектр услуг для комфортного велосипедного отдыха
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={service.icon as any} className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Icon name="Check" className="text-green-500 mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link to={service.link}>
                    Подробнее
                    <Icon name="ArrowRight" className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;