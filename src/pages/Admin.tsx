
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarInset
} from "@/components/ui/sidebar";
import AdminSidebarMenu from "@/components/admin/sidebar-menu";
import AdminHeader from "@/components/admin/header";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import AdminDashboard from "@/components/admin/dashboard";
import AdminBikeManagement from "@/components/admin/bike-management";
import AdminOrderList from "@/components/admin/order-list";
import AdminCustomerList from "@/components/admin/customer-list";
import AdminSettings from "@/components/admin/settings";

/**
 * Основной компонент административной панели
 */
const Admin = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  // Рендерит контент в зависимости от выбранного раздела
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard />;
      case "bikes":
        return <AdminBikeManagement />;
      case "orders":
        return <AdminOrderList />;
      case "customers":
        return <AdminCustomerList />;
      case "settings":
        return <AdminSettings />;
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
            <AdminSidebarMenu 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
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
          <AdminHeader title="Административная панель" />
          <div className="flex-1 space-y-4 p-6">
            {renderContent()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
