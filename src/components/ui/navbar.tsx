
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary py-4 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Bike" size={24} />
            <span className="text-xl font-bold">ВелоПрокат</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/catalog" className="hover:text-gray-200 transition-colors">
              Каталог
            </Link>
            <Link to="/about" className="hover:text-gray-200 transition-colors">
              О нас
            </Link>
            <Link to="/contacts" className="hover:text-gray-200 transition-colors">
              Контакты
            </Link>
            <div className="flex items-center space-x-3">
              <Link to="/cart">
                <Button variant="secondary" size="sm" className="flex items-center">
                  <Icon name="ShoppingCart" size={18} className="mr-1" />
                  Корзина
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20">
                  <Icon name="LogIn" size={18} className="mr-1" />
                  Войти
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex items-center" 
            onClick={() => setIsOpen(!isOpen)}
          >
            <Icon name={isOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <Link to="/catalog" className="block hover:text-gray-200 py-2 px-3 transition-colors">
              Каталог
            </Link>
            <Link to="/about" className="block hover:text-gray-200 py-2 px-3 transition-colors">
              О нас
            </Link>
            <Link to="/contacts" className="block hover:text-gray-200 py-2 px-3 transition-colors">
              Контакты

              <Link to="/catalog">
                <Button variant="ghost">Каталог</Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost">
                  <Icon name="ShoppingCart" className="mr-2" size={16} />
                  Корзина
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="ghost">Админ</Button>
              </Link>

                  Войти
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
