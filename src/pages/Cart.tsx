
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Icon from "@/components/ui/icon";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { bikeData } from "@/data/bike-data";

/**
 * Страница корзины
 */
const Cart = () => {
  const { 
    items, 
    updateItemQuantity, 
    removeItem, 
    clearCart,
    getTotalAmount,
    getItemCount
  } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    comments: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
  });
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const totalAmount = getTotalAmount();
  const itemsCount = getItemCount();
  
  // Обработчик оформления заказа
  const handleCheckout = () => {
    if (!isTermsAccepted) {
      toast({
        title: "Необходимо принять условия",
        description: "Пожалуйста, согласитесь с условиями аренды для продолжения.",
        variant: "destructive",
      });
      return;
    }
    
    // Проверяем заполнение обязательных полей
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) {
      toast({
        title: "Заполните обязательные поля",
        description: "Пожалуйста, укажите ваше имя, телефон и email.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Имитируем отправку заказа на сервер
    setTimeout(() => {
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      
      // Перенаправление на страницу благодарности
      navigate("/cart/success");
      
      // Очистка корзины
      clearCart();
      
      toast({
        title: "Заказ успешно оформлен",
        description: "Мы свяжемся с вами в ближайшее время для подтверждения заказа.",
      });
    }, 1500);
  };
  
  // Обработчик применения промокода
  const handleApplyDiscount = () => {
    if (!discountCode) return;
    
    if (discountCode.toUpperCase() === "BIKE10") {
      const discount = Math.round(totalAmount * 0.1);
      setDiscountAmount(discount);
      setDiscountApplied(true);
      
      toast({
        title: "Промокод применен",
        description: `Скидка 10% (${discount} ₽) применена к вашему заказу.`,
      });
    } else {
      toast({
        title: "Промокод не найден",
        description: "Указанный промокод не существует или истек срок его действия.",
        variant: "destructive",
      });
    }
  };
  
  // Форматирование даты
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Если корзина пуста
  if (items.length === 0) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="p-6 rounded-full bg-muted inline-flex">
            <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">Ваша корзина пуста</h1>
            <p className="text-muted-foreground mb-4">
              В вашей корзине нет товаров. Перейдите в каталог, чтобы выбрать велосипеды для аренды.
            </p>
            <Button asChild>
              <Link to="/catalog">
                <Icon name="Bike" className="mr-2" size={16} />
                Перейти в каталог
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Получаем велосипеды, которые находятся в корзине
  const bikesInCart = items.map(item => {
    const bikeDetails = bikeData.find(bike => bike.id === item.id);
    return { ...item, details: bikeDetails };
  });
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Выбранные велосипеды</CardTitle>
              <CardDescription>
                В вашей корзине {itemsCount} {itemsCount === 1 ? 'товар' : itemsCount < 5 ? 'товара' : 'товаров'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Велосипед</TableHead>
                      <TableHead className="text-center">Период</TableHead>
                      <TableHead className="text-center">Кол-во</TableHead>
                      <TableHead className="text-right">Цена</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bikesInCart.map((item) => (
                      <TableRow key={`${item.id}-${item.rentalPeriod}`}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                                onError={(e) => (e.target as HTMLImageElement).src = "/placeholder.svg"}
                              />
                            </div>
                            <div>
                              <div className="font-medium">
                                <Link to={`/bike/${item.id}`} className="hover:text-primary hover:underline">
                                  {item.title}
                                </Link>
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {item.details?.category || "Велосипед"}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{item.rentalPeriod}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateItemQuantity(item.id, item.rentalPeriod, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <div className="px-3 h-8 flex items-center justify-center border-y">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => {
                                const maxAvailability = item.details?.availability || 10;
                                updateItemQuantity(item.id, item.rentalPeriod, Math.min(maxAvailability, item.quantity + 1));
                              }}
                              disabled={item.quantity >= (item.details?.availability || 10)}
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{item.unitPrice} ₽</TableCell>
                        <TableCell className="text-right font-medium">
                          {item.totalPrice} ₽
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => removeItem(item.id, item.rentalPeriod)}
                          >
                            <Icon name="X" size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={clearCart}>
                <Icon name="Trash2" className="mr-2" size={16} />
                Очистить корзину
              </Button>
              <Button variant="outline" asChild>
                <Link to="/catalog">
                  <Icon name="ArrowLeft" className="mr-2" size={16} />
                  Продолжить выбор
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Период аренды</CardTitle>
              <CardDescription>
                Выберите даты начала и окончания аренды
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Дата начала</Label>
                  <div className="relative">
                    <Input 
                      id="start-date" 
                      type="date" 
                      value={dateRange.startDate.toISOString().substring(0, 10)}
                      onChange={(e) => {
                        const newStartDate = new Date(e.target.value);
                        setDateRange({
                          ...dateRange,
                          startDate: newStartDate,
                          endDate: new Date(Math.max(newStartDate.getTime(), dateRange.endDate.getTime()))
                        });
                      }}
                      min={new Date().toISOString().substring(0, 10)}
                    />
                    <Icon 
                      name="Calendar" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                      size={16} 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">Дата окончания</Label>
                  <div className="relative">
                    <Input 
                      id="end-date" 
                      type="date" 
                      value={dateRange.endDate.toISOString().substring(0, 10)}
                      onChange={(e) => {
                        const newEndDate = new Date(e.target.value);
                        if (newEndDate >= dateRange.startDate) {
                          setDateRange({
                            ...dateRange,
                            endDate: newEndDate
                          });
                        }
                      }}
                      min={dateRange.startDate.toISOString().substring(0, 10)}
                    />
                    <Icon 
                      name="Calendar" 
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                      size={16} 
                    />
                  </div>
                </div>
              </div>
              
              <div className="rounded-md bg-muted/50 p-3">
                <div className="flex items-center">
                  <Icon name="Info" className="mr-2 text-blue-500" size={16} />
                  <span className="text-sm">
                    Период аренды: с {formatDate(dateRange.startDate)} по {formatDate(dateRange.endDate)} 
                    ({Math.ceil((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / (1000 * 60 * 60 * 24))} дней)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Итого</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={`${item.id}-${item.rentalPeriod}-summary`} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.title} × {item.quantity} ({item.rentalPeriod})
                    </span>
                    <span>{item.totalPrice} ₽</span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Общая сумма:</span>
                  <span className="font-medium">{totalAmount} ₽</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка:</span>
                    <span>-{discountAmount} ₽</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Промокод"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  disabled={discountApplied}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  onClick={handleApplyDiscount}
                  disabled={discountApplied || !discountCode}
                >
                  Применить
                </Button>
              </div>
              
              {discountApplied && (
                <div className="rounded-md bg-green-50 p-2">
                  <div className="flex items-center text-green-700 text-sm">
                    <Icon name="Check" className="mr-2" size={16} />
                    <span>Промокод BIKE10 применен (скидка 10%)</span>
                  </div>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-muted-foreground">К оплате:</div>
                  <div className="text-2xl font-bold">
                    {discountApplied ? totalAmount - discountAmount : totalAmount} ₽
                  </div>
                </div>
                <Sheet open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                  <SheetTrigger asChild>
                    <Button size="lg">
                      <Icon name="CreditCard" className="mr-2" size={16} />
                      Оформить заказ
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:max-w-lg overflow-auto">
                    <SheetHeader>
                      <SheetTitle>Оформление заказа</SheetTitle>
                      <SheetDescription>
                        Введите ваши данные для оформления заказа
                      </SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Имя и фамилия <span className="text-red-500">*</span></Label>
                          <Input 
                            id="name" 
                            placeholder="Иван Иванов" 
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Телефон <span className="text-red-500">*</span></Label>
                          <Input 
                            id="phone" 
                            placeholder="+7 (999) 123-45-67" 
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="your@email.com" 
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Адрес (необязательно)</Label>
                          <Textarea 
                            id="address" 
                            placeholder="Город, улица, дом, квартира" 
                            value={customerInfo.address}
                            onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          />
                          <div className="text-sm text-muted-foreground">
                            Адрес для доставки, если вы хотите, чтобы велосипеды привезли к вам
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Способ оплаты</h3>
                        <div className="grid grid-cols-3 gap-2">
                          <Card 
                            className={`cursor-pointer hover:border-primary transition-colors ${paymentMethod === "card" ? 'border-primary bg-muted/30' : ''}`}
                            onClick={() => setPaymentMethod("card")}
                          >
                            <CardContent className="p-3 flex flex-col items-center justify-center gap-1 text-center">
                              <Icon name="CreditCard" size={24} className="mb-1" />
                              <div className="text-sm font-medium">Карта</div>
                            </CardContent>
                          </Card>
                          
                          <Card 
                            className={`cursor-pointer hover:border-primary transition-colors ${paymentMethod === "cash" ? 'border-primary bg-muted/30' : ''}`}
                            onClick={() => setPaymentMethod("cash")}
                          >
                            <CardContent className="p-3 flex flex-col items-center justify-center gap-1 text-center">
                              <Icon name="Banknote" size={24} className="mb-1" />
                              <div className="text-sm font-medium">Наличные</div>
                            </CardContent>
                          </Card>
                          
                          <Card 
                            className={`cursor-pointer hover:border-primary transition-colors ${paymentMethod === "online" ? 'border-primary bg-muted/30' : ''}`}
                            onClick={() => setPaymentMethod("online")}
                          >
                            <CardContent className="p-3 flex flex-col items-center justify-center gap-1 text-center">
                              <Icon name="Globe" size={24} className="mb-1" />
                              <div className="text-sm font-medium">Онлайн</div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Детали заказа</h3>
                        <div className="text-sm space-y-2 bg-muted/40 p-3 rounded-md">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Количество товаров:</span>
                            <span>{itemsCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Период аренды:</span>
                            <span>{formatDate(dateRange.startDate)} - {formatDate(dateRange.endDate)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Сумма:</span>
                            <span>{totalAmount} ₽</span>
                          </div>
                          {discountApplied && (
                            <div className="flex justify-between text-green-600">
                              <span>Скидка:</span>
                              <span>-{discountAmount} ₽</span>
                            </div>
                          )}
                          <Separator className="my-1" />
                          <div className="flex justify-between font-medium">
                            <span>Итого:</span>
                            <span>{discountApplied ? totalAmount - discountAmount : totalAmount} ₽</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="comments">Комментарий к заказу</Label>
                          <Textarea 
                            id="comments" 
                            placeholder="Дополнительная информация по заказу" 
                            value={customerInfo.comments}
                            onChange={(e) => setCustomerInfo({...customerInfo, comments: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={isTermsAccepted}
                          onCheckedChange={(checked) => setIsTermsAccepted(checked as boolean)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Я согласен с <Link to="/terms" className="text-blue-600 hover:underline" target="_blank">условиями аренды</Link> и <Link to="/privacy" className="text-blue-600 hover:underline" target="_blank">политикой конфиденциальности</Link>
                        </label>
                      </div>
                    </div>
                    <SheetFooter className="mt-6">
                      <Button 
                        onClick={handleCheckout} 
                        disabled={isProcessing}
                        className="w-full"
                      >
                        {isProcessing ? (
                          <>
                            <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                            Обработка...
                          </>
                        ) : (
                          <>
                            {paymentMethod === "card" && <Icon name="CreditCard" className="mr-2" size={16} />}
                            {paymentMethod === "cash" && <Icon name="Banknote" className="mr-2" size={16} />}
                            {paymentMethod === "online" && <Icon name="Globe" className="mr-2" size={16} />}
                            Оплатить {discountApplied ? totalAmount - discountAmount : totalAmount} ₽
                          </>
                        )}
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </CardContent>
          </Card>
          
          {/* Дополнительная информация */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Icon name="Truck" className="text-primary mt-0.5" size={18} />
                  <div>
                    <h3 className="font-medium">Доставка</h3>
                    <p className="text-sm text-muted-foreground">
                      Возможна доставка велосипедов по городу (от 300 ₽) или самовывоз из пункта проката.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Icon name="Shield" className="text-primary mt-0.5" size={18} />
                  <div>
                    <h3 className="font-medium">Залог</h3>
                    <p className="text-sm text-muted-foreground">
                      Для аренды необходим залог в виде документа или денежных средств.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Icon name="HelpCircle" className="text-primary mt-0.5" size={18} />
                  <div>
                    <h3 className="font-medium">Поддержка</h3>
                    <p className="text-sm text-muted-foreground">
                      Если у вас возникли вопросы, позвоните нам по телефону <a href="tel:+79001234567" className="text-primary hover:underline">+7 (900) 123-45-67</a>.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
