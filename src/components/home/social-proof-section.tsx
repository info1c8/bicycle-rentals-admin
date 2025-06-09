import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const SocialProofSection = () => {
  const achievements = [
    {
      icon: "Award",
      title: "Лучший сервис 2024",
      description: "По версии городского рейтинга",
      color: "text-yellow-600 bg-yellow-100"
    },
    {
      icon: "Star",
      title: "5 звезд на Яндекс.Картах",
      description: "Более 1000 положительных отзывов",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: "Users",
      title: "Более 5000 клиентов",
      description: "Доверяют нашему сервису",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: "Shield",
      title: "Сертификат качества",
      description: "ISO 9001:2015",
      color: "text-purple-600 bg-purple-100"
    }
  ];

  const mediaLogos = [
    { name: "РБК", logo: "https://via.placeholder.com/100x40/333333/ffffff?text=РБК" },
    { name: "Ведомости", logo: "https://via.placeholder.com/100x40/2563eb/ffffff?text=Ведомости" },
    { name: "Коммерсант", logo: "https://via.placeholder.com/100x40/059669/ffffff?text=Коммерсант" },
    { name: "Forbes", logo: "https://via.placeholder.com/100x40/dc2626/ffffff?text=FORBES" }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Нам доверяют</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Признание экспертов и доверие клиентов - наша главная награда
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${achievement.color}`}>
                  <Icon name={achievement.icon as any} size={32} />
                </div>
                <h3 className="font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="border-t pt-12">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">О нас пишут</h3>
            <p className="text-gray-600">Ведущие СМИ освещают нашу деятельность</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {mediaLogos.map((media, index) => (
              <div key={index} className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src={media.logo} 
                  alt={media.name}
                  className="h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;