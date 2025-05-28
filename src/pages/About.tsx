import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">О нашей компании</h1>
              <p className="text-lg text-white/80">
                Мы делаем велосипедные прогулки доступными для каждого
              </p>
            </div>
          </div>
        </section>

        {/* История компании */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Наша история</h2>
                <p className="text-gray-600 mb-4">
                  Компания ВелоПрокат была основана в 2020 году группой энтузиастов, 
                  объединенных любовью к велоспорту и активному образу жизни. Мы начинали 
                  с небольшого парка из 10 велосипедов, а сегодня наш флот насчитывает 
                  более 100 единиц техники различных типов и назначений.
                </p>
                <p className="text-gray-600 mb-6">
                  Наша миссия - сделать велосипедные прогулки доступными для каждого, 
                  независимо от опыта и уровня подготовки. Мы стремимся предоставить 
                  нашим клиентам лучший сервис и качественные велосипеды для незабываемых 
                  приключений.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link to="/catalog">
                      <Icon name="Bike" className="mr-2" size={16} />
                      Выбрать велосипед
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contacts">
                      <Icon name="Phone" className="mr-2" size={16} />
                      Связаться с нами
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1571068316344-75bc76f77890"
                  alt="История компании"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-4xl font-bold text-primary">100+</div>
                  <div className="text-sm text-gray-600">велосипедов в парке</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ценности */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Наши ценности</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Принципы, которыми мы руководствуемся в нашей работе
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Heart" className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Забота о клиентах</h3>
                <p className="text-gray-600">
                  Мы относимся к каждому клиенту с максимальным вниманием и заботой, 
                  стремясь превзойти ожидания.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Shield" className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
                <p className="text-gray-600">
                  Все наши велосипеды регулярно проходят техническое обслуживание 
                  и проверку безопасности.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Trophy" className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Качество</h3>
                <p className="text-gray-600">
                  Мы предлагаем только качественные велосипеды от проверенных 
                  производителей.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Достижения */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <div className="text-gray-600">Довольных клиентов</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-gray-600">Велосипедов в парке</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">3</div>
                <div className="text-gray-600">Года на рынке</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">4.9</div>
                <div className="text-gray-600">Средняя оценка</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Присоединяйтесь к нам
              </h2>
              <p className="text-white/80 mb-8">
                Станьте частью нашего велосообщества и откройте для себя новые маршруты и впечатления
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/catalog">
                    <Icon name="Bike" className="mr-2" size={16} />
                    Арендовать велосипед
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20" asChild>
                  <Link to="/team">
                    <Icon name="Users" className="mr-2" size={16} />
                    Познакомиться с командой
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;