
import { useState } from "react";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CatalogFilters from "@/components/catalog/catalog-filters";
import BikeGrid from "@/components/catalog/bike-grid";
import SearchAndSort from "@/components/catalog/search-and-sort";
import Pagination from "@/components/catalog/pagination";
import { Bike } from "@/types/bike";
import { bikeData } from "@/data/bike-data";

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState("recommended");
  
  const itemsPerPage = 9;

  // Фильтрация велосипедов
  const filteredBikes = bikeData.filter((bike) => {
    const matchesSearch = bike.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(bike.category);
    const matchesPrice = bike.pricePerHour >= priceRange[0] && bike.pricePerHour <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
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
      default:
        return 0;
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Каталог велосипедов</h1>
            <p className="text-gray-600 mb-6">
              Выберите подходящий велосипед для ваших потребностей
            </p>
            
            <SearchAndSort 
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              sortOption={sortOption}
              onSortChange={handleSortChange}
            />

            <div className="flex flex-col md:flex-row gap-6 mt-8">
              <div className="w-full md:w-1/4">
                <CatalogFilters
                  selectedCategories={selectedCategories}
                  priceRange={priceRange}
                  onCategoryChange={handleCategoryChange}
                  onPriceChange={handlePriceChange}
                />
              </div>
              
              <div className="w-full md:w-3/4">
                {currentBikes.length > 0 ? (
                  <>
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
                  <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Велосипеды не найдены</h3>
                    <p className="text-gray-600 mb-4">
                      Попробуйте изменить параметры поиска или фильтров
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategories([]);
                        setPriceRange([0, 500]);
                        setSortOption("recommended");
                      }}
                      className="text-primary hover:underline font-medium"
                    >
                      Сбросить все фильтры
                    </button>
                  </div>
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
