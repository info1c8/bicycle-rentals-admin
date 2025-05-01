
export interface Bike {
  id: number;
  title: string;
  image: string;
  category: string;
  pricePerHour: number;
  available?: boolean;
  description?: string;
  features?: string[];
  rating?: number;
  reviewsCount?: number;
}
