
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CatalogFiltersProps {
  selectedCategories: string[];
  priceRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onPriceChange: (range: [number, number]) => void;
}

const CatalogFilters = ({
  selectedCategories,
  priceRange,
  onCategoryChange,
  onPriceChange,
}: CatalogFiltersProps) => {
  const [expandedMobile, setExpandedMobile] = useState(false);
  const categories = [
    { id: "mountain", label: "Горный" },
    { id: "city", label: "Городской" },
    { id: "road", label: "Шоссейный" },
    { id: "electric", label: "Электрический" },
    { id: "kids", label: "Детский" },
  ];

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const handleSliderChange = (value: number[]) => {
    onPriceChange([value[0], value[1]]);
  };

  const resetAllFilters = () => {
    onCategoryChange([]);
    onPriceChange([0, 500]);
  };

  const filtersContent = (
    <>
      <div className="mb-6">
        <h3 className="font-medium mb-3">Категории</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.label)}
                onCheckedChange={() => handleCategoryToggle(category.label)}
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="mb-6">
        <h3 className="font-medium mb-4">Цена за час (₽)</h3>
        <div className="px-2">
          <Slider
            value={[priceRange[0], priceRange[1]]}
            min={0}
            max={500}
            step={10}
            onValueChange={handleSliderChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between text-sm">
            <span>{priceRange[0]} ₽</span>
            <span>{priceRange[1]} ₽</span>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={resetAllFilters}
        className="w-full mt-4"
      >
        <Icon name="RotateCcw" size={16} className="mr-2" />
        Сбросить все фильтры
      </Button>
    </>
  );

  return (
    <>
      {/* Desktop filters */}
      <Card className="hidden md:block sticky top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Фильтры</CardTitle>
        </CardHeader>
        <CardContent>{filtersContent}</CardContent>
      </Card>

      {/* Mobile filters */}
      <div className="md:hidden mb-6">
        <Accordion
          type="single"
          collapsible
          value={expandedMobile ? "filters" : ""}
          onValueChange={(val) => setExpandedMobile(val === "filters")}
        >
          <AccordionItem value="filters" className="border rounded-lg">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center text-left">
                <Icon name="SlidersHorizontal" className="mr-2" size={18} />
                <span className="font-medium">Фильтры</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              {filtersContent}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default CatalogFilters;
