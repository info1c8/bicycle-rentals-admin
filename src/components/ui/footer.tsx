
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Bike" size={24} />
              <span className="text-xl font-bold">ВелоПрокат</span>
            </div>
            <p className="text-gray-400 mb-4">
              Прокат велосипедов в вашем городе. Качество, надежность, доступные цены.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Меню</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-400 hover:text-white transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Icon name="MapPin" size={18} className="mr-2 mt-1 text-gray-400" />
                <span className="text-gray-400">ул. Велосипедная, 15, Москва</span>
              </li>
              <li className="flex items-center">
                <Icon name="Phone" size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-400">+7 (800) 555-35-35</span>
              </li>
              <li className="flex items-center">
                <Icon name="Mail" size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-400">info@velorent.ru</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ВелоПрокат. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
