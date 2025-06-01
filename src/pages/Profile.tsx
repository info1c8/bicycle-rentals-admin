import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: "Иван Петров",
    email: "ivan@example.com",
    phone: "+7 (999) 123-45-67",
    avatar: "https://i.pravatar.cc/150?img=3",
    address: "г. Москва, ул. Пушкина, д. 10",
    joinDate: "15.03.2024",
    totalRentals: 8,
    favoriteCategory: "Горные велосипеды",
    bonusPoints: 450,
  });

  // Mock rental history
  const rentalHistory = [
    {
      id: "R001",
      bikeModel: "Горный велосипед Trek",
      startDate: "10.03.2024",
      endDate: "12.03.2024",
      status: "completed",
      amount: 2500,
    },
    {
      id: "R002",
      bikeModel: "Городской велосипед Giant",
      startDate: "15.03.2024",
      endDate: "16.03.2024",
      status: "active",
      amount: 1200,
    },
  ];

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "info",
      message: "Ваша следующая аренда начинается завтра",
      date: "19.03.2024",
      read: false,
    },
    {
      id: 2,
      type: "promo",
      message: "Получите скидку 20% на следующую аренду!",
      date: "18.03.2024",
      read: true,
    },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Профиль обновлен",
      description: "Ваши изменения успешно сохранены",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Личный кабинет</h1>
              <Button variant="outline" onClick={() => toast({
                title: "Выход из системы",
                description: "Вы успешно вышли из аккаунта",
              })}>
                <Icon name="LogOut" className="mr-2" size={16} />
                Выйти
              </Button>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start border-b rounded-none">
                <TabsTrigger value="profile" className="text-base">
                  <Icon name="User" className="mr-2" size={16} />
                  Профиль
                </TabsTrigger>
                <TabsTrigger value="rentals" className="text-base">
                  <Icon name="Bike" className="mr-2" size={16} />
                  История аренды
                </TabsTrigger>
                <TabsTrigger value="notifications" className="text-base">
                  <Icon name="Bell" className="mr-2" size={16} />
                  Уведомления
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-base">
                  <Icon name="Settings" className="mr-2" size={16} />
                  Настройки
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Личная информация</CardTitle>
                        <CardDescription>
                          Управляйте своими личными данными
                        </CardDescription>
                      </div>
                      <Button
                        variant={isEditing ? "default" : "outline"}
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      >
                        {isEditing ? (
                          <>
                            <Icon name="Save\" className="mr-2\" size={16} />
                            Сохранить
                          </>
                        ) : (
                          <>
                            <Icon name="Edit" className="mr-2" size={16} />
                            Редактировать
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={userData.avatar} />
                        <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button variant="outline">
                          <Icon name="Upload" className="mr-2" size={16} />
                          Изменить фото
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input
                          id="name"
                          value={userData.name}
                          disabled={!isEditing}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userData.email}
                          disabled={!isEditing}
                          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input
                          id="phone"
                          value={userData.phone}
                          disabled={!isEditing}
                          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                          id="address"
                          value={userData.address}
                          disabled={!isEditing}
                          onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Статистика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">Всего аренд</div>
                        <div className="text-2xl font-bold">{userData.totalRentals}</div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">Бонусные баллы</div>
                        <div className="text-2xl font-bold">{userData.bonusPoints}</div>
                      </div>
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <div className="text-sm text-muted-foreground">С нами с</div>
                        <div className="text-2xl font-bold">{userData.joinDate}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rentals">
                <Card>
                  <CardHeader>
                    <CardTitle>История аренды</CardTitle>
                    <CardDescription>
                      Ваши прошлые и текущие аренды
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rentalHistory.map((rental) => (
                        <div
                          key={rental.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{rental.bikeModel}</div>
                            <div className="text-sm text-muted-foreground">
                              {rental.startDate} - {rental.endDate}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="font-medium">{rental.amount} ₽</div>
                              <Badge
                                variant={rental.status === "completed" ? "secondary" : "default"}
                              >
                                {rental.status === "completed" ? "Завершена" : "Активна"}
                              </Badge>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Уведомления</CardTitle>
                    <CardDescription>
                      Ваши последние уведомления и обновления
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border rounded-lg ${
                            notification.read ? "bg-background" : "bg-primary/5"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`rounded-full p-2 ${
                                notification.type === "info"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                            >
                              <Icon
                                name={notification.type === "info" ? "Info" : "Gift"}
                                size={16}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{notification.message}</div>
                              <div className="text-sm text-muted-foreground">
                                {notification.date}
                              </div>
                            </div>
                            {!notification.read && (
                              <Badge variant="secondary">Новое</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки аккаунта</CardTitle>
                    <CardDescription>
                      Управляйте настройками вашего аккаунта
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Уведомления</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">Email-уведомления</div>
                            <div className="text-sm text-muted-foreground">
                              Получать уведомления на email
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Настроить
                          </Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="font-medium">SMS-уведомления</div>
                            <div className="text-sm text-muted-foreground">
                              Получать уведомления по SMS
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Настроить
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Безопасность</h3>
                      <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Lock" className="mr-2" size={16} />
                          Изменить пароль
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Icon name="Smartphone" className="mr-2" size={16} />
                          Двухфакторная аутентификация
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Данные аккаунта</h3>
                      <div className="space-y-4">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-destructive"
                        >
                          <Icon name="Trash2" className="mr-2" size={16} />
                          Удалить аккаунт
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;