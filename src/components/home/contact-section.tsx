import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время",
    });
  };

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Свяжитесь с нами</h2>
            <p className="text-white/80 mb-8">
              Готовы ответить на ваши вопросы и помочь с выбором велосипеда
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon name="Phone" className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-medium">Телефон</div>
                  <div className="text-white/80">+7 (800) 123-45-67</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon name="Mail" className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-white/80">info@velorent.ru</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon name="MapPin" className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-medium">Адрес</div>
                  <div className="text-white/80">ул. Велосипедная, 15, Москва</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <Icon name="Clock" className="text-white" size={20} />
                </div>
                <div>
                  <div className="font-medium">Время работы</div>
                  <div className="text-white/80">Ежедневно с 8:00 до 22:00</div>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    placeholder="Ваше имя" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    required
                  />
                </div>
                <Input 
                  placeholder="Телефон" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Textarea 
                  placeholder="Ваше сообщение" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 min-h-[120px]"
                  required
                />
                <Button type="submit" variant="secondary" className="w-full">
                  <Icon name="Send" className="mr-2" size={16} />
                  Отправить сообщение
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;