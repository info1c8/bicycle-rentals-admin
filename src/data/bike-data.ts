
import { Bike } from "@/types/bike";

export const bikeData: Bike[] = [
  {
    id: 1,
    title: "Горный велосипед XC Pro",
    image: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=1470",
    category: "Горный",
    pricePerHour: 250,
    available: true,
    description: "Идеальный велосипед для горных маршрутов и бездорожья. Оборудован амортизацией и надёжными тормозами.",
    features: ["Алюминиевая рама", "Амортизационная вилка", "Дисковые тормоза", "27 скоростей", "Размер колес 29\""],
    rating: 4.8,
    reviewsCount: 24
  },
  {
    id: 2,
    title: "Городской велосипед Urban Lite",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&q=80&w=1470",
    category: "Городской",
    pricePerHour: 200,
    available: true,
    description: "Комфортный городской велосипед для ежедневных поездок и прогулок по городу.",
    features: ["Легкая рама", "Комфортное сиденье", "7 скоростей", "Корзина", "Размер колес 28\""],
    rating: 4.5,
    reviewsCount: 18
  },
  {
    id: 3,
    title: "Шоссейный велосипед Roadster",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=1476",
    category: "Шоссейный",
    pricePerHour: 300,
    available: true,
    description: "Быстрый и легкий велосипед для скоростной езды по асфальтированным дорогам.",
    features: ["Карбоновая рама", "Дропы", "22 скорости", "Аэродинамическая форма", "Размер колес 28\""],
    rating: 4.9,
    reviewsCount: 15
  },
  {
    id: 4,
    title: "Электровелосипед E-Commuter",
    image: "https://images.unsplash.com/photo-1598514983318-2f64f55ca212?auto=format&fit=crop&q=80&w=1470",
    category: "Электрический",
    pricePerHour: 350,
    available: true,
    description: "Электрический велосипед для комфортных поездок по городу без лишних усилий.",
    features: ["Мотор 250W", "Батарея 36V 10Ah", "Запас хода 60 км", "Интегрированные фары", "Подножка"],
    rating: 4.7,
    reviewsCount: 22
  },
  {
    id: 5,
    title: "Детский велосипед Kids Star",
    image: "https://images.unsplash.com/photo-1575909812264-6902b55846ad?auto=format&fit=crop&q=80&w=1470",
    category: "Детский",
    pricePerHour: 150,
    available: true,
    description: "Яркий и безопасный велосипед для детей с дополнительными колесами.",
    features: ["Прочная рама", "Дополнительные колеса", "Яркий дизайн", "Защитные элементы", "Размер колес 16\""],
    rating: 4.6,
    reviewsCount: 31
  },
  {
    id: 6,
    title: "Горный велосипед Extreme MTB",
    image: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&q=80&w=1374",
    category: "Горный",
    pricePerHour: 280,
    available: true,
    description: "Профессиональный горный велосипед для экстремальных условий и сложных трасс.",
    features: ["Усиленная рама", "Двойная амортизация", "Гидравлические тормоза", "30 скоростей", "Размер колес 27.5\""],
    rating: 4.9,
    reviewsCount: 17
  },
  {
    id: 7,
    title: "Городской круизер Beach",
    image: "https://images.unsplash.com/photo-1502123909989-c9d05c43046a?auto=format&fit=crop&q=80&w=1473",
    category: "Городской",
    pricePerHour: 220,
    available: false,
    description: "Стильный велосипед-круизер для расслабленных прогулок по набережной.",
    features: ["Комфортная геометрия", "Широкое сиденье", "3 скорости", "Широкие шины", "Багажник"],
    rating: 4.3,
    reviewsCount: 12
  },
  {
    id: 8,
    title: "Шоссейный Aero Elite",
    image: "https://images.unsplash.com/photo-1541625602330-2277a4182bc5?auto=format&fit=crop&q=80&w=1470",
    category: "Шоссейный",
    pricePerHour: 320,
    available: true,
    description: "Высокоскоростной шоссейный велосипед с аэродинамическим дизайном для соревнований.",
    features: ["Ультралегкая карбоновая рама", "Аэродинамический руль", "24 скорости", "Жесткая вилка", "Узкие покрышки"],
    rating: 5.0,
    reviewsCount: 8
  },
  {
    id: 9,
    title: "Электровелосипед Cargo E-Bike",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1436",
    category: "Электрический",
    pricePerHour: 380,
    available: true,
    description: "Грузовой электровелосипед для перевозки тяжелых предметов по городу.",
    features: ["Мотор 500W", "Батарея 48V 15Ah", "Грузоподъемность до 150 кг", "Удлиненная рама", "Грузовая платформа"],
    rating: 4.8,
    reviewsCount: 14
  },
  {
    id: 10,
    title: "Детский BMX Junior",
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1469",
    category: "Детский",
    pricePerHour: 180,
    available: true,
    description: "Стильный BMX для активных детей и подростков, любящих трюки.",
    features: ["Прочная стальная рама", "Усиленные колеса", "BMX руль", "Защитные накладки", "Стильный дизайн"],
    rating: 4.7,
    reviewsCount: 23
  },
  {
    id: 11,
    title: "Городской велосипед Classic",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1470",
    category: "Городской",
    pricePerHour: 190,
    available: true,
    description: "Классический городской велосипед для ежедневных поездок с элегантным дизайном.",
    features: ["Хромированные детали", "Классический дизайн", "5 скоростей", "Передняя корзина", "Размер колес 28\""],
    rating: 4.4,
    reviewsCount: 19
  },
  {
    id: 12,
    title: "Горный Trail Master",
    image: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&q=80&w=1471",
    category: "Горный",
    pricePerHour: 270,
    available: true,
    description: "Надежный велосипед для трейлов и езды по пересеченной местности.",
    features: ["Алюминиевая рама", "Передний амортизатор 120мм", "Гидравлические тормоза", "24 скорости", "Широкие грипсы"],
    rating: 4.6,
    reviewsCount: 27
  }
];
