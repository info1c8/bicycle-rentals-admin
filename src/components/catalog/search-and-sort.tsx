
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";

interface SearchAndSortProps {
  searchQuery: string;
  sortOption: string;
  onSearchChange: (query: string) => void;
  onSortChange: (option: string) => void;
}

const SearchAndSort = ({
  searchQuery,
  sortOption,
  onSearchChange,
  onSortChange,
}: SearchAndSortProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative w-full sm:w-1/2 lg:w-1/3">
        <Input
          type="text"
          placeholder="Поиск велосипеда..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon name="Search" size={18} />
        </div>
      </div>
      
      <div className="w-full sm:w-auto">
        <Select value={sortOption} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="Сортировать по" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Рекомендуемые</SelectItem>
            <SelectItem value="price-asc">Цена (по возрастанию)</SelectItem>
            <SelectItem value="price-desc">Цена (по убыванию)</SelectItem>
            <SelectItem value="name-asc">Имя (А-Я)</SelectItem>
            <SelectItem value="name-desc">Имя (Я-А)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchAndSort;
