/** @format */

import * as React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";

interface DatePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  label?: string;
}

export function DatePicker({ date, setDate, label }: DatePickerProps) {
  return (
    <div className="flex flex-col space-y-3">
      {label && <div className="font-bold text-sm ">{label}</div>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "dd MMMM, yyyy", { locale: vi })
            ) : (
              <span>Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} required />
        </PopoverContent>
      </Popover>
    </div>
  );
}
