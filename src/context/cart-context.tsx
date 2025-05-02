
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartItem, Cart } from "@/types/cart";
import { bikeData } from "@/data/bike-data";

// Действия для корзины
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { bikeId: number } }
  | { type: "UPDATE_QUANTITY"; payload: { bikeId: number; quantity: number } }
  | { type: "UPDATE_DURATION"; payload: { bikeId: number; rentalDuration: number } }
  | { type: "CLEAR_CART" };

// Контекст для корзины
interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (bikeId: number) => void;
  updateQuantity: (bikeId: number, quantity: number) => void;
  updateDuration: (bikeId: number, rentalDuration: number) => void;
  clearCart: () => void;
  getCalculatedItems: () => CalculatedCartItem[];
}

// Начальное состояние корзины
const initialCart: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Создание контекста
const CartContext = createContext<CartContextType | undefined>(undefined);

// Редьюсер для корзины
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { bikeId, quantity, rentalDuration } = action.payload;
      
      // Проверяем, существует ли товар в корзине
      const existingItemIndex = state.items.findIndex(item => item.bikeId === bikeId);
      
      if (existingItemIndex !== -1) {
        // Если товар уже есть, обновляем его количество
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].rentalDuration = rentalDuration;
        
        // Пересчитываем итоговые значения
        return calculateCartTotals({
          ...state,
          items: updatedItems,
        });
      } else {
        // Если товара нет, добавляем его
        return calculateCartTotals({
          ...state,
          items: [...state.items, action.payload],
        });
      }
    }
    
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(item => item.bikeId !== action.payload.bikeId);
      
      return calculateCartTotals({
        ...state,
        items: updatedItems,
      });
    }
    
    case "UPDATE_QUANTITY": {
      const { bikeId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Если количество <= 0, удаляем товар
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { bikeId } });
      }
      
      const updatedItems = state.items.map(item => 
        item.bikeId === bikeId 
          ? { ...item, quantity } 
          : item
      );
      
      return calculateCartTotals({
        ...state,
        items: updatedItems,
      });
    }
    
    case "UPDATE_DURATION": {
      const { bikeId, rentalDuration } = action.payload;
      
      const updatedItems = state.items.map(item => 
        item.bikeId === bikeId 
          ? { ...item, rentalDuration } 
          : item
      );
      
      return calculateCartTotals({
        ...state,
        items: updatedItems,
      });
    }
    
    case "CLEAR_CART": {
      return initialCart;
    }
    
    default:
      return state;
  }
};

// Вспомогательная функция для расчета итогов корзины
const calculateCartTotals = (cart: Cart): Cart => {
  const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = cart.items.reduce((total, item) => {
    const bike = bikeData.find(b => b.id === item.bikeId);
    if (!bike) return total;
    
    return total + bike.pricePerHour * item.quantity * item.rentalDuration;
  }, 0);
  
  return {
    ...cart,
    totalItems,
    totalPrice,
  };
};

// Вспомогательный тип для расчетных элементов корзины
type CalculatedCartItem = {
  bikeId: number;
  quantity: number;
  rentalDuration: number;
  bike: (typeof bikeData)[0];
  totalPrice: number;
};

// Провайдер корзины
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Загружаем корзину из localStorage при инициализации
  const savedCart = localStorage.getItem("cart");
  const initialState = savedCart ? JSON.parse(savedCart) : initialCart;
  
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  
  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  
  // Функции для работы с корзиной
  const addToCart = (item: CartItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };
  
  const removeFromCart = (bikeId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { bikeId } });
  };
  
  const updateQuantity = (bikeId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { bikeId, quantity } });
  };
  
  const updateDuration = (bikeId: number, rentalDuration: number) => {
    dispatch({ type: "UPDATE_DURATION", payload: { bikeId, rentalDuration } });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  
  // Функция для получения рассчитанных элементов корзины с данными о велосипедах
  const getCalculatedItems = (): CalculatedCartItem[] => {
    return cart.items.map(item => {
      const bike = bikeData.find(b => b.id === item.bikeId)!;
      const totalPrice = bike.pricePerHour * item.quantity * item.rentalDuration;
      
      return {
        ...item,
        bike,
        totalPrice,
      };
    });
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateDuration,
        clearCart,
        getCalculatedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Хук для использования контекста корзины
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
};
