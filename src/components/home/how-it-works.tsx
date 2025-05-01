
import Icon from "@/components/ui/icon";

type StepProps = {
  icon: string;
  title: string;
  description: string;
  step: number;
};

const Step = ({ icon, title, description, step }: StepProps) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name={icon} size={32} className="text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
          {step}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: "Search",
      title: "Выберите велосипед",
      description: "Просмотрите наш каталог и выберите подходящий велосипед для ваших нужд.",
      step: 1,
    },
    {
      icon: "Calendar",
      title: "Забронируйте онлайн",
      description: "Укажите дату, время и длительность аренды. Оплатите заказ онлайн.",
      step: 2,
    },
    {
      icon: "Bike",
      title: "Получите и катайтесь",
      description: "Заберите велосипед в пункте проката и наслаждайтесь поездкой!",
      step: 3,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Как это работает</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Всего три простых шага отделяют вас от поездки на одном из наших велосипедов
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step key={index} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
