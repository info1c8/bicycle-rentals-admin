
import * as React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

// Экспортируем тип DateRange для использования в других компонентах
export type { DateRange };

// Props для компонента выбора диапазона дат
interface DateRangePickerProps {
  value: DateRange | undefined;
  onChange: (value: DateRange) => void;
  className?: string;
}

export function Date({ date }: { date: Date }) {
  return (
    <span className="whitespace-nowrap">
      {format(date, "dd.MM.yyyy", { locale: ru })}
    </span>
  );
}

export function DateRangePicker({
  value,
  onChange,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <Icon name="Calendar" className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  <Date date={value.from} /> - <Date date={value.to} />
                </>
              ) : (
                <Date date={value.from} />
              )
            ) : (
              <span>Выберите период</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={(range) => {
              if (range) {
                onChange(range);
              }
            }}
            numberOfMonths={2}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
