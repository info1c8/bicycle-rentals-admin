
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset
} from "@/components/ui/sidebar";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminDashboard from "@/components/admin/dashboard";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "bikes":
        return <AdminBikeList placeholder />;
      case "orders":
        return <AdminOrderList placeholder />;
      case "customers":
        return <AdminCustomerList placeholder />;
      case "settings":
        return <AdminSettings placeholder />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full bg-muted/40">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <Icon name="Bike" size={24} />
              <span className="text-lg font-bold">ВелоПрокат</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveSection("dashboard")}
                  isActive={activeSection === "dashboard"}
                >
                  <Icon name="LayoutDashboard" />
                  <span>Панель управления</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveSection("bikes")}
                  isActive={activeSection === "bikes"}
                >
                  <Icon name="Bike" />
                  <span>Велосипеды</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveSection("orders")}
                  isActive={activeSection === "orders"}
                >
                  <Icon name="ShoppingBag" />
                  <span>Заказы</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveSection("customers")}
                  isActive={activeSection === "customers"}
                >
                  <Icon name="Users" />
                  <span>Клиенты</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => setActiveSection("settings")}
                  isActive={activeSection === "settings"}
                >
                  <Icon name="Settings" />
                  <span>Настройки</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Icon name="Home" className="mr-2" />
                  На главную
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="LogOut" className="mr-2" />
                Выйти
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="pb-0">
          <div className="flex h-16 items-center gap-4 border-b bg-background px-6">
            <h1 className="text-xl font-semibold">Административная панель</h1>
          </div>
          <div className="flex-1 space-y-4 p-6">
            {renderContent()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

// Заглушки для разделов административной панели
const AdminBikeList = ({ placeholder }: { placeholder?: boolean }) => (
  <Card>
    <CardHeader>
      <CardTitle>Управление велосипедами</CardTitle>
      <CardDescription>Добавляйте, редактируйте и удаляйте велосипеды из каталога</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex justify-end mb-4">
        <Button>
          <Icon name="Plus" className="mr-2" size={16} />
          Добавить велосипед
        </Button>
      </div>
      <div className="rounded-md border">
        <div className="p-4 text-center text-muted-foreground">
          Здесь будет таблица с велосипедами
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminOrderList = ({ placeholder }: { placeholder?: boolean }) => (
  <Card>
    <CardHeader>
      <CardTitle>Управление заказами</CardTitle>
      <CardDescription>Просмотр и изменение статусов заказов</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border">
        <div className="p-4 text-center text-muted-foreground">
          Здесь будет таблица с заказами
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminCustomerList = ({ placeholder }: { placeholder?: boolean }) => (
  <Card>
    <CardHeader>
      <CardTitle>Управление клиентами</CardTitle>
      <CardDescription>Просмотр информации о клиентах и их истории заказов</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border">
        <div className="p-4 text-center text-muted-foreground">
          Здесь будет таблица с клиентами
        </div>
      </div>
    </CardContent>
  </Card>
);

const AdminSettings = ({ placeholder }: { placeholder?: boolean }) => (
  <Card>
    <CardHeader>
      <CardTitle>Настройки системы</CardTitle>
      <CardDescription>Управление настройками сайта и системы</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Настройки сайта</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Название сайта</label>
              <input type="text" className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="ВелоПрокат" />
            </div>
            <div>
              <label className="text-sm font-medium">Контактный email</label>
              <input type="email" className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="info@veloprikat.ru" />
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-3">Настройки уведомлений</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="notify-orders" className="mr-2" defaultChecked />
              <label htmlFor="notify-orders">Уведомления о новых заказах</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="notify-users" className="mr-2" defaultChecked />
              <label htmlFor="notify-users">Уведомления о новых пользователях</label>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default Admin;
