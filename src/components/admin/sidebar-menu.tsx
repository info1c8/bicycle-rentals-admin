import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Icon from "@/components/ui/icon";

interface AdminSidebarMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

/**
 * Компонент меню для боковой панели администратора
 */
const AdminSidebarMenu = ({
  activeSection,
  onSectionChange,
}: AdminSidebarMenuProps) => {
  // Список пунктов меню
  const menuItems = [
    { id: "dashboard", icon: "LayoutDashboard", label: "Панель управления" },
    { id: "bikes", icon: "Bike", label: "Велосипеды" },
    { id: "orders", icon: "ShoppingBag", label: "Заказы" },
    { id: "customers", icon: "Users", label: "Клиенты" },
    { id: "analytics", icon: "BarChart3", label: "Аналитика" },
    { id: "reports", icon: "FileText", label: "Отчеты" },
    { id: "settings", icon: "Settings", label: "Настройки" },
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton
            onClick={() => onSectionChange(item.id)}
            isActive={activeSection === item.id}
          >
            <Icon name={item.icon as any} />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};

export default AdminSidebarMenu;
