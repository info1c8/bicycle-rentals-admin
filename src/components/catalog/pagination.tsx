
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Показываем все страницы, если их не больше maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Всегда показываем первую страницу
      pages.push(1);
      
      // Средние страницы
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Добавляем многоточие перед средними страницами, если необходимо
      if (startPage > 2) {
        pages.push("ellipsis-start");
      }
      
      // Добавляем средние страницы
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Добавляем многоточие после средних страниц, если необходимо
      if (endPage < totalPages - 1) {
        pages.push("ellipsis-end");
      }
      
      // Всегда показываем последнюю страницу
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Предыдущая страница"
      >
        <Icon name="ChevronLeft" size={18} />
      </Button>
      
      <div className="flex items-center gap-1 mx-1">
        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <div key={`ellipsis-${index}`} className="px-2">
                ...
              </div>
            );
          }
          
          return (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={`min-w-[40px] ${currentPage === page ? "pointer-events-none" : ""}`}
            >
              {page}
            </Button>
          );
        })}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Следующая страница"
      >
        <Icon name="ChevronRight" size={18} />
      </Button>
    </div>
  );
};

export default Pagination;
