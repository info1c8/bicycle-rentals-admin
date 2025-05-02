
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

/**
 * Компонент настроек системы
 */
const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "ВелоПрокат",
    contactEmail: "info@veloprikat.ru",
    notifyOrders: true,
    notifyUsers: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки системы</CardTitle>
        <CardDescription>Управление настройками сайта и системы</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-6 space-y-8">
          {/* Настройки сайта */}
          <div>
            <h3 className="text-lg font-medium mb-4">Настройки сайта</h3>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="siteName">Название сайта</Label>
                <Input 
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail">Контактный email</Label>
                <Input 
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          {/* Настройки уведомлений */}
          <div>
            <h3 className="text-lg font-medium mb-4">Настройки уведомлений</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notifyOrders" 
                  checked={settings.notifyOrders}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("notifyOrders", checked as boolean)
                  }
                />
                <Label htmlFor="notifyOrders">Уведомления о новых заказах</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="notifyUsers" 
                  checked={settings.notifyUsers}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange("notifyUsers", checked as boolean)
                  }
                />
                <Label htmlFor="notifyUsers">Уведомления о новых пользователях</Label>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSettings;
