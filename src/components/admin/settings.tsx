
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

/**
 * Компонент настроек для админ-панели
 */
const AdminSettings = () => {
  const [companyName, setCompanyName] = useState("ВелоПрокат");
  const [email, setEmail] = useState("info@velorent.ru");
  const [phone, setPhone] = useState("+7 (800) 123-45-67");
  const [address, setAddress] = useState("г. Москва, ул. Велосипедная, 42");
  const [description, setDescription] = useState("Сервис проката велосипедов в вашем городе");
  const [workingHours, setWorkingHours] = useState("Пн-Пт: 09:00-20:00, Сб-Вс: 10:00-18:00");
  
  const [automaticEmails, setAutomaticEmails] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [reminderTime, setReminderTime] = useState("24");
  const [cancelPolicy, setCancelPolicy] = useState("2");
  
  const [currency, setCurrency] = useState("RUB");
  const [taxRate, setTaxRate] = useState("20");
  const [depositAmount, setDepositAmount] = useState("50");
  const [minRentalDuration, setMinRentalDuration] = useState("1");
  
  const { toast } = useToast();
  
  // Обработчик сохранения основных настроек
  const handleSaveGeneralSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Общие настройки успешно обновлены",
    });
  };
  
  // Обработчик сохранения настроек уведомлений
  const handleSaveNotificationSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Настройки уведомлений успешно обновлены",
    });
  };
  
  // Обработчик сохранения финансовых настроек
  const handleSaveFinancialSettings = () => {
    toast({
      title: "Настройки сохранены",
      description: "Финансовые настройки успешно обновлены",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Настройки системы</CardTitle>
          <CardDescription>
            Управление основными параметрами работы сервиса велопроката
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Основные</TabsTrigger>
              <TabsTrigger value="notifications">Уведомления</TabsTrigger>
              <TabsTrigger value="financial">Финансы</TabsTrigger>
            </TabsList>
            
            {/* Основные настройки */}
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Информация о компании</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Название компании</FormLabel>
                      <Input 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Email</FormLabel>
                      <Input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Телефон</FormLabel>
                      <Input 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Адрес</FormLabel>
                      <Input 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Дополнительные настройки</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <FormLabel>Описание</FormLabel>
                      <Textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Часы работы</FormLabel>
                      <Input 
                        value={workingHours} 
                        onChange={(e) => setWorkingHours(e.target.value)} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Логотип</FormLabel>
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                          <Icon name="Image" size={24} className="text-muted-foreground" />
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="Upload" className="mr-2" size={16} />
                          Загрузить
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSaveGeneralSettings}>
                  Сохранить изменения
                </Button>
              </div>
            </TabsContent>
            
            {/* Настройки уведомлений */}
            <TabsContent value="notifications" className="space-y-4">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Настройки уведомлений</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Автоматические email-уведомления</FormLabel>
                      <FormDescription>
                        Отправлять автоматические уведомления клиентам о статусе заказа
                      </FormDescription>
                    </div>
                    <Switch 
                      checked={automaticEmails} 
                      onCheckedChange={setAutomaticEmails} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">SMS-уведомления</FormLabel>
                      <FormDescription>
                        Отправлять SMS-уведомления клиентам о статусе заказа
                      </FormDescription>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel>Время напоминания (часов до начала аренды)</FormLabel>
                      <Select value={reminderTime} onValueChange={setReminderTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время напоминания" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 час</SelectItem>
                          <SelectItem value="2">2 часа</SelectItem>
                          <SelectItem value="4">4 часа</SelectItem>
                          <SelectItem value="12">12 часов</SelectItem>
                          <SelectItem value="24">24 часа</SelectItem>
                          <SelectItem value="48">48 часов</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <FormLabel>Политика отмены (часов до начала аренды)</FormLabel>
                      <Select value={cancelPolicy} onValueChange={setCancelPolicy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите время для отмены" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 час</SelectItem>
                          <SelectItem value="2">2 часа</SelectItem>
                          <SelectItem value="4">4 часа</SelectItem>
                          <SelectItem value="12">12 часов</SelectItem>
                          <SelectItem value="24">24 часа</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <FormLabel>Шаблоны уведомлений</FormLabel>
                    <div className="space-y-2">
                      <div className="bg-muted p-3 rounded-md flex items-center justify-between">
                        <span>Шаблон подтверждения бронирования</span>
                        <Button variant="ghost" size="sm">
                          <Icon name="Edit" size={16} />
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-md flex items-center justify-between">
                        <span>Шаблон напоминания о аренде</span>
                        <Button variant="ghost" size="sm">
                          <Icon name="Edit" size={16} />
                        </Button>
                      </div>
                      <div className="bg-muted p-3 rounded-md flex items-center justify-between">
                        <span>Шаблон завершения аренды</span>
                        <Button variant="ghost" size="sm">
                          <Icon name="Edit" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveNotificationSettings}>
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Финансовые настройки */}
            <TabsContent value="financial" className="space-y-4">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Финансовые настройки</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormLabel>Валюта</FormLabel>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите валюту" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RUB">Российский рубль (₽)</SelectItem>
                        <SelectItem value="USD">Доллар США ($)</SelectItem>
                        <SelectItem value="EUR">Евро (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Ставка НДС (%)</FormLabel>
                    <Input 
                      type="number" 
                      value={taxRate} 
                      onChange={(e) => setTaxRate(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Размер залога (% от стоимости велосипеда)</FormLabel>
                    <Input 
                      type="number" 
                      value={depositAmount} 
                      onChange={(e) => setDepositAmount(e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormLabel>Минимальное время аренды (часов)</FormLabel>
                    <Input 
                      type="number" 
                      value={minRentalDuration} 
                      onChange={(e) => setMinRentalDuration(e.target.value)} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Способы оплаты</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center">
                        <Icon name="CreditCard" className="mr-2" size={18} />
                        <span>Банковская карта</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center">
                        <Icon name="Wallet" className="mr-2" size={18} />
                        <span>Наличные</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <div className="flex items-center">
                        <Icon name="Globe" className="mr-2" size={18} />
                        <span>Онлайн-платежи</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={handleSaveFinancialSettings}>
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Системная информация</CardTitle>
          <CardDescription>
            Техническая информация о системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Версия системы</div>
                <div className="text-sm text-muted-foreground">1.2.5</div>
              </div>
              <div>
                <div className="text-sm font-medium">Дата последнего обновления</div>
                <div className="text-sm text-muted-foreground">01.05.2025</div>
              </div>
              <div>
                <div className="text-sm font-medium">База данных</div>
                <div className="text-sm text-muted-foreground">MySQL 8.0.28</div>
              </div>
              <div>
                <div className="text-sm font-medium">Серверное время</div>
                <div className="text-sm text-muted-foreground">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <Button variant="outline">
            <Icon name="RefreshCw" className="mr-2" size={16} />
            Проверить обновления
          </Button>
          <Button variant="destructive">
            <Icon name="Trash2" className="mr-2" size={16} />
            Очистить кэш
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminSettings;
