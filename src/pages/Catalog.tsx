import { useState, useEffect } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CatalogFilters from "@/components/catalog/catalog-filters";
import BikeGrid from "@/components/catalog/bike-grid";
import SearchAndSort from "@/components/catalog/search-and-sort";
import Pagination from "@/components/catalog/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Bike } from "@/types/bike";
import { bikeData } from "@/data/bike-data";

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [availability, setAvailability] = useState<"all" | "available" | "unavailable">("all");
  const [loading, setLoading] = useState(true);

  const itemsPerPage = viewMode === "grid" ? 9 : 6;

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Получение уникальных характеристик из всех велосипедов
  const allFeatures = Array.from(
    new Set(bikeData.flatMap(bike => bike.features))
  );

  // Фильтрация велосипедов
  const filteredBikes = bikeData.filter((bike) => {
    const matchesSearch = bike.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bike.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(bike.category);
    const matchesPrice = bike.pricePerHour >= priceRange[0] && bike.pricePerHour <= priceRange[1];
    const matchesFeatures = selectedFeatures.length === 0 || 
                           selectedFeatures.every(feature => bike.features.includes(feature));
    const matchesAvailability = availability === "all" || 
                               (availability === "available" ? bike.availability > 0 : bike.availability === 0);

    return matchesSearch && matchesCategory && matchesPrice && matchesFeatures && matchesAvailability;
  });

  // Сортировка велосипедов
  const sortedBikes = [...filteredBikes].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.pricePerHour - b.pricePerHour;
      case "price-desc":
        return b.pricePerHour - a.pricePerHour;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      case "rating-desc":
        return b.rating - a.rating;
      case "popularity":
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      default:
        return (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0);
    }
  });

  // Получение текущей страницы для пагинации
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBikes = sortedBikes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedBikes.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const handleSortChange = (option: string) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const handleFeatureChange = (features: string[]) => {
    setSelectedFeatures(features);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (value: "all" | "available" | "unavailable") => {
    setAvailability(value);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setSortOption("recommended");
    setSelectedFeatures([]);
    setAvailability("all");
    setCurrentPage(1);
  };

  // Статистика по фильтрам
  const stats = {
    total: bikeData.length,
    available: bikeData.filter(bike => bike.availability > 0).length,
    filtered: filteredBikes.length,
    priceRange: {
      min: Math.min(...bikeData.map(bike => bike.pricePerHour)),
      max: Math.max(...bikeData.map(bike => bike.pricePerHour)),
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Каталог велосипедов</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Всего моделей: {stats.total}</span>
                  <span>•</span>
                  <span>Доступно: {stats.available}</span>
                  {filteredBikes.length !== bikeData.length && (
                    <>
                      <span>•</span>
                      <span>Найдено: {stats.filtered}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8"
                  >
                    <Icon name="Grid" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8"
                  >
                    <Icon name="List" size={16} />
                  </Button>
                </div>

                <Select value={availability} onValueChange={handleAvailabilityChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Наличие" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все велосипеды</SelectItem>
                    <SelectItem value="available">В наличии</SelectItem>
                    <SelectItem value="unavailable">Нет в наличии</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <SearchAndSort 
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />

            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="w-full md:w-1/4">
                <div className="space-y-6">
                  <CatalogFilters
                    selectedCategories={selectedCategories}
                    priceRange={priceRange}
                    onCategoryChange={handleCategoryChange}
                    onPriceChange={handlePriceChange}
                  />

                  <Card>
                    <CardHeader>
                      <CardTitle>Характеристики</CardTitle>
                      <CardDescription>
                        Выберите нужные характеристики
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {allFeatures.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`feature-${feature}`}
                            checked={selectedFeatures.includes(feature)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFeatureChange([...selectedFeatures, feature]);
                              } else {
                                handleFeatureChange(selectedFeatures.filter(f => f !== feature));
                              }
                            }}
                            className="mr-2"
                          />
                          <label htmlFor={`feature-${feature}`}>{feature}</label>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {(selectedCategories.length > 0 || selectedFeatures.length > 0 || 
                    searchQuery || availability !== "all" || 
                    priceRange[0] !== 0 || priceRange[1] !== 500) && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleResetFilters}
                    >
                      <Icon name="RotateCcw" className="mr-2" size={16} />
                      Сбросить фильтры
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="w-full md:w-3/4">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Card key={index} className="animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-t-lg" />
                        <CardContent className="p-4">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : currentBikes.length > 0 ? (
                  <>
                    <div className="mb-4">
                      {selectedCategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {selectedCategories.map(category => (
                            <Badge key={category} variant="secondary">
                              {category}
                              <button
                                onClick={() => handleCategoryChange(
                                  selectedCategories.filter(c => c !== category)
                                )}
                                className="ml-1 hover:text-destructive"
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <BikeGrid bikes={currentBikes} />
                    
                    <div className="mt-8">
                      <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </>
                ) : (
                  <Card className="text-center p-8">
                    <div className="mb-4">
                      <Icon name="SearchX" className="mx-auto text-muted-foreground" size={48} />
                    </div>
                    <CardTitle className="mb-2">Велосипеды не найдены</CardTitle>
                    <CardDescription className="mb-4">
                      Попробуйте изменить параметры поиска или фильтров
                    </CardDescription>
                    <Button onClick={handleResetFilters}>
                      Сбросить все фильтры
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;