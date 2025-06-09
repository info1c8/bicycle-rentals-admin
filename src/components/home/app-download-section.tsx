import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const AppDownloadSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Скачайте наше приложение</h2>
            <p className="text-white/80 mb-8 text-lg">
              Управляйте арендой велосипедов прямо с вашего смартфона. 
              Быстро, удобно и всегда под рукой.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Icon name="Smartphone" className="text-white" size={16} />
                </div>
                <span>Быстрое бронирование велосипедов</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Icon name="MapPin" className="text-white" size={16} />
                </div>
                <span>Поиск ближайших пунктов проката</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Icon name="CreditCard" className="text-white" size={16} />
                </div>
                <span>Безопасная оплата в приложении</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <Icon name="Bell" className="text-white" size={16} />
                </div>
                <span>Уведомления о статусе заказа</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" size="lg" className="flex items-center">
                <Icon name="Smartphone" className="mr-2" size={20} />
                <div className="text-left">
                  <div className="text-xs">Скачать в</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </Button>
              <Button variant="secondary" size="lg" className="flex items-center">
                <Icon name="Smartphone" className="mr-2" size={20} />
                <div className="text-left">
                  <div className="text-xs">Доступно в</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400" 
                alt="Мобильное приложение"
                className="mx-auto max-w-xs rounded-3xl shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl transform scale-75"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;