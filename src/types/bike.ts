
export interface Bike {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  pricePerHour: number;
  pricePerDay?: number;
  pricePerWeek?: number;
  availability: number;
  rating: number;
  features: string[];
  specifications?: {
    brand: string;
    model: string;
    frameSize: string;
    weight: string;
    wheelSize: string;
    brakeType: string;
    gears: number;
  };
  isPopular?: boolean;
  isNew?: boolean;
  isRecommended?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
