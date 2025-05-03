
import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: number;
  title: string;
  image: string;
  quantity: number;
  unitPrice: number;
  rentalPeriod: string;
  totalPrice: number;
  duration: number;
}

interface CartContextProps {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItemQuantity: (itemId: number, rentalPeriod: string, quantity: number) => void;
  removeItem: (itemId: number, rentalPeriod: string) => void;
  clearCart: () => void;
  getTotalAmount: () => number;
  getItemCount: () => number;
  getItemQuantity: (itemId: number, rentalPeriod: string) => number;
  isCartInitialized: boolean;
}

const CartContext = createContext<CartContextProps>({
  items: [],
  addItem: () => {},
  updateItemQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  getTotalAmount: () => 0,
  getItemCount: () => 0,
  getItemQuantity: () => 0,
  isCartInitialized: false
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  
  // Загрузка корзины из localStorage при инициализации
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("velorent-cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    } finally {
      // Даже если возникла ошибка при загрузке, отмечаем, что корзина инициализирована
      setIsCartInitialized(true);
    }
  }, []);
  
  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    if (isCartInitialized) {
      try {
        localStorage.setItem("velorent-cart", JSON.stringify(items));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [items, isCartInitialized]);
  
  // Добавление элемента в корзину
  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      // Проверяем, есть ли уже такой элемент в корзине с таким же периодом аренды
      const existingItemIndex = prevItems.findIndex(
        item => item.id === newItem.id && item.rentalPeriod === newItem.rentalPeriod
      );
      
      if (existingItemIndex >= 0) {
        // Если элемент уже существует, обновляем его количество
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: existingItem.unitPrice * newQuantity
        };
        
        return updatedItems;
      } else {
        // Иначе добавляем новый элемент
        return [...prevItems, newItem];
      }
    });
  };
  
  // Обновление количества элемента
  const updateItemQuantity = (itemId: number, rentalPeriod: string, quantity: number) => {
    // Проверяем, что quantity больше 0
    if (quantity <= 0) return;
    
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === itemId && item.rentalPeriod === rentalPeriod) {
          return {
            ...item,
            quantity,
            totalPrice: item.unitPrice * quantity
          };
        }
        return item;
      });
    });
  };
  
  // Удаление элемента из корзины
  const removeItem = (itemId: number, rentalPeriod: string) => {
    setItems(prevItems => 
      prevItems.filter(item => !(item.id === itemId && item.rentalPeriod === rentalPeriod))
    );
  };
  
  // Очистка корзины
  const clearCart = () => {
    setItems([]);
  };
  
  // Получение общей суммы
  const getTotalAmount = () => {
    return items.reduce((total, item) => total + item.totalPrice, 0);
  };
  
  // Получение общего количества элементов
  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };
  
  // Получение количества конкретного элемента с указанным периодом аренды
  const getItemQuantity = (itemId: number, rentalPeriod: string) => {
    const item = items.find(item => item.id === itemId && item.rentalPeriod === rentalPeriod);
    return item ? item.quantity : 0;
  };
  
  const value = {
    items,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    getTotalAmount,
    getItemCount,
    getItemQuantity,
    isCartInitialized
  };
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
