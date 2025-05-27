import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import HeroSection from "@/components/home/hero-section";
import FeaturedBikes from "@/components/home/featured-bikes";
import HowItWorks from "@/components/home/how-it-works";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedBikes />
        <HowItWorks />
        
        {/* Преимущества */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Почему выбирают нас</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Мы предлагаем лучший сервис проката велосипедов в городе
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Bike" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Большой выбор</h3>
                <p className="text-gray-600">
                  Более 100 велосипедов различных типов и размеров
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
                <p className="text-gray-600">
                  Регулярное техническое обслуживание и страховка
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Удобное время</h3>
                <p className="text-gray-600">
                  Работаем ежедневно с 9:00 до 21:00 без выходных
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="HeartHandshake" className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Поддержка</h3>
                <p className="text-gray-600">
                  Помощь и консультации на протяжении всей аренды
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Категории */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Категории велосипедов</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                У нас есть велосипеды для любых целей и предпочтений
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/catalog?category=mountain" className="group">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91" 
                    alt="Горные велосипеды" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Горные велосипеды</h3>
                      <p className="text-white/80 text-sm">От 300 ₽/час</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/catalog?category=city" className="group">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1571068316344-75bc76f77890" 
                    alt="Городские велосипеды" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Городские велосипеды</h3>
                      <p className="text-white/80 text-sm">От 200 ₽/час</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/catalog?category=electric" className="group">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1571333250630-f0230c320b6d" 
                    alt="Электровелосипеды" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">Электровелосипеды</h3>
                      <p className="text-white/80 text-sm">От 400 ₽/час</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="text-center mt-8">
              <Button asChild size="lg">
                <Link to="/catalog">
                  Смотреть все категории
                  <Icon name="ArrowRight" className="ml-2" size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Отзывы клиентов</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Что говорят наши клиенты о сервисе проката
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-gray-600 mb-4">
                  "Отличный сервис! Велосипеды в идеальном состоянии, 
                  персонал очень вежливый и помог с выбором. Обязательно приду еще!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <div className="font-medium">Анна Смирнова</div>
                    <div className="text-sm text-gray-500">2 дня назад</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-gray-600 mb-4">
                  "Брал велосипед на неделю для путешествия. Все прошло отлично, 
                  велосипед не подвел. Рекомендую всем любителям активного отдыха!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <div className="font-medium">Максим Петров</div>
                    <div className="text-sm text-gray-500">неделю назад</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                  <Icon name="Star" className="text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-gray-600 mb-4">
                  "Удобное расположение пункта проката, быстрое оформление и 
                  хорошие цены. Велосипеды в отличном состоянии. Спасибо!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                  <div>
                    <div className="font-medium">Дмитрий Иванов</div>
                    <div className="text-sm text-gray-500">2 недели назад</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Готовы отправиться в путешествие?
              </h2>
              <p className="text-white/80 mb-8">
                Забронируйте велосипед прямо сейчас и получите скидку 10% 
                на первую аренду по промокоду BIKE10
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/catalog">
                    <Icon name="Bike" className="mr-2" size={16} />
                    Выбрать велосипед
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20" asChild>
                  <Link to="/contacts">
                    <Icon name="Phone" className="mr-2" size={16} />
                    Связаться с нами
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

export default Index;