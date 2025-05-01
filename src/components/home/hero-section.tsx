
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Прокат велосипедов для любых целей
            </h1>
            <p className="text-lg text-white/80 max-w-md">
              Большой выбор велосипедов для города, горной местности и экстремальных условий. Бронируйте онлайн и получайте скидки.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button size="lg" variant="secondary">Выбрать велосипед</Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20">
                  Узнать больше
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block relative">
            <img 
              src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1470" 
              alt="Велосипед" 
              className="rounded-lg shadow-xl max-w-full h-auto transform -rotate-3 transition-transform hover:rotate-0 duration-500"
            />
            <div className="absolute top-4 right-4 bg-white text-primary font-bold rounded-full py-2 px-4 rotate-12 shadow-lg">
              Лучшие модели!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
