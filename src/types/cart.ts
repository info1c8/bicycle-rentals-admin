
import { Bike } from "./bike";

export interface CartItem {
  bikeId: number;
  quantity: number;
  rentalDuration: number; // в часах
}

export interface CalculatedCartItem extends CartItem {
  bike: Bike;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
