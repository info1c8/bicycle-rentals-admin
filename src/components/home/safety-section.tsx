import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const SafetySection = () => {
  const safetyFeatures = [
    {
      icon: "Shield",
      title: "Страхование",
      description: "Полная страховка велосипеда и велосипедиста на время аренды"
    },
    {
      icon: "Wrench",
      title: "Техосмотр",
      description: "Каждый велосипед проходит проверку перед выдачей"
    },
    {
      icon: "HardHat",
      title: "Защитная экипировка",
      description: "Бесплатные шлемы и светоотражающие жилеты"
    },
    {
      icon: "Phone",
      title: "Экстренная связь",
      description: "Круглосуточная поддержка и помощь на дороге"
    },
    {
      icon: "MapPin",
      title: "GPS-трекинг",
      description: "Отслеживание местоположения для вашей безопасности"
    },
    {
      icon: "BookOpen",
      title: "Инструктаж",
      description: "Обучение правилам безопасности для новичков"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ваша безопасность - наш приоритет</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы обеспечиваем максимальную безопасность каждой поездки
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safetyFeatures.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon as any} className="text-green-600" size={32} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 bg-green-50 rounded-lg p-8 text-center">
          <Icon name="ShieldCheck" className="text-green-600 mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4">Сертифицированная безопасность</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Наш сервис сертифицирован по международным стандартам безопасности. 
            Все велосипеды проходят регулярное техническое обслуживание, 
            а наши сотрудники имеют соответствующую квалификацию.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;