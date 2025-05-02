
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, updateDuration, clearCart, getCalculatedItems } = useCart();
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const { toast } = useToast();

  const calculatedItems = getCalculatedItems();

  // Обработчик оформления заказа
  const handleCheckout = () => {
    toast({
      title: "Заказ оформлен",
      description: `Ваш заказ на сумму ${cart.totalPrice} ₽ успешно оформлен.`,
    });
    clearCart();
    setIsCheckoutDialogOpen(false);
  };

  if (calculatedItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-12 text-center">
            <div className="max-w-md mx-auto">
              <Icon 
                name="ShoppingCart" 
                size={64} 
                className="mx-auto mb-6 text-gray-300" 
              />
              <h1 className="text-2xl font-bold mb-4">Корзина пуста</h1>
              <p className="text-gray-600 mb-8">
                Ваша корзина пуста. Добавьте велосипеды из нашего каталога, чтобы продолжить.
              </p>
              <Link to="/catalog">
                <Button className="px-6">
                  <Icon name="Bike" className="mr-2" size={18} />
                  Перейти в каталог
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Левая часть - список товаров */}
            <div className="w-full lg:w-2/3">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Корзина</h1>
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-sm"
                >
                  <Icon name="Trash2" className="mr-2" size={16} />
                  Очистить корзину
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  {calculatedItems.map((item) => (
                    <div key={item.bikeId} className="p-4 border-b last:border-0">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Изображение велосипеда */}
                        <div className="w-24 h-24 rounded-md overflow-hidden shrink-0">
                          <img
                            src={item.bike.image}
                            alt={item.bike.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Информация о велосипеде */}
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between mb-2">
                            <h3 className="font-medium">{item.bike.title}</h3>
                            <div className="font-semibold">
                              {item.totalPrice} ₽
                            </div>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-3">
                            {item.bike.category} • {item.bike.pricePerHour} ₽/час
                          </div>
                          
                          <div className="flex flex-wrap gap-4">
                            {/* Управление количеством */}
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Количество:</span>
                              <div className="flex border rounded-md">
                                <button
                                  className="px-2 py-0.5 text-gray-600"
                                  onClick={() => updateQuantity(item.bikeId, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-2 py-0.5 border-x min-w-[30px] text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  className="px-2 py-0.5 text-gray-600"
                                  onClick={() => updateQuantity(item.bikeId, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            
                            {/* Управление длительностью */}
                            <div className="flex items-center">
                              <span className="text-sm mr-2">Длительность:</span>
                              <select
                                className="border rounded-md p-1 text-sm"
                                value={item.rentalDuration}
                                onChange={(e) => updateDuration(item.bikeId, Number(e.target.value))}
                              >
                                {[1, 2, 3, 4, 5, 6, 12, 24, 48, 72].map((hours) => (
                                  <option key={hours} value={hours}>
                                    {hours} {getHoursText(hours)}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        {/* Кнопка удаления */}
                        <div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.bikeId)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Icon name="Trash" size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Правая часть - сводка заказа */}
            <div className="w-full lg:w-1/3">
              <h2 className="text-xl font-bold mb-6">Сводка заказа</h2>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Итого</CardTitle>
                  <CardDescription>
                    {cart.totalItems} {getItemsText(cart.totalItems)} для аренды
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Стоимость аренды</span>
                      <span>{cart.totalPrice} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Залог</span>
                      <span>{calculateDeposit(calculatedItems)} ₽</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold pt-1">
                      <span>К оплате</span>
                      <span>{cart.totalPrice} ₽</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Icon name="CreditCard" className="mr-2" size={18} />
                        Оформить заказ
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <CheckoutForm 
                        totalAmount={cart.totalPrice} 
                        depositAmount={calculateDeposit(calculatedItems)}
                        onCheckout={handleCheckout} 
                        onCancel={() => setIsCheckoutDialogOpen(false)} 
                      />
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
              
              <div className="mt-6 text-sm text-gray-600 space-y-2">
                <p>
                  <Icon name="Info" size={14} className="inline-block mr-1" />
                  Залог возвращается при возврате велосипеда.
                </p>
                <p>
                  <Icon name="Calendar" size={14} className="inline-block mr-1" />
                  Время аренды начинается с момента получения велосипеда.
                </p>
                <p>
                  <Icon name="Shield" size={14} className="inline-block mr-1" />
                  Оплата производится при получении велосипеда.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Компонент формы оформления заказа
interface CheckoutFormProps {
  totalAmount: number;
  depositAmount: number;
  onCheckout: () => void;
  onCancel: () => void;
}

const CheckoutForm = ({ totalAmount, depositAmount, onCheckout, onCancel }: CheckoutFormProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Оформление заказа</DialogTitle>
        <DialogDescription>
          Заполните ваши данные для оформления заказа
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="first-name" className="text-sm font-medium">
              Имя
            </label>
            <Input id="first-name" />
          </div>
          <div className="space-y-2">
            <label htmlFor="last-name" className="text-sm font-medium">
              Фамилия
            </label>
            <Input id="last-name" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Телефон
          </label>
          <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input id="email" type="email" />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Адрес доставки (если требуется)
          </label>
          <Input id="address" />
        </div>
        
        <div className="mt-2 space-y-3">
          <div className="flex justify-between">
            <span>Стоимость аренды:</span>
            <span>{totalAmount} ₽</span>
          </div>
          <div className="flex justify-between">
            <span>Залог:</span>
            <span>{depositAmount} ₽</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold pt-1">
            <span>Итого к оплате:</span>
            <span>{totalAmount} ₽</span>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button onClick={onCheckout}>
          Оформить заказ
        </Button>
      </DialogFooter>
    </>
  );
};

// Вспомогательные функции

// Функция для получения правильного склонения слова "часов"
const getHoursText = (hours: number): string => {
  const lastDigit = hours % 10;
  const lastTwoDigits = hours % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "час";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return "часа";
  } else {
    return "часов";
  }
};

// Функция для получения правильного склонения слова "товаров"
const getItemsText = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return "товар";
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return "товара";
  } else {
    return "товаров";
  }
};

// Функция для расчета залога (примерно 50% от стоимости велосипеда)
const calculateDeposit = (items: any[]) => {
  return Math.round(items.reduce((total, item) => {
    // Примерная стоимость велосипеда (20 дней аренды)
    const bikeValue = item.bike.pricePerHour * 24 * 20;
    // Залог ~50% от стоимости
    return total + (bikeValue * 0.5) * item.quantity;
  }, 0));
};

export default Cart;
