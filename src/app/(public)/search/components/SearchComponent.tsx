"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import { searchType } from "./SearchLayout";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@nextui-org/react";
import { BiBuildingHouse } from "react-icons/bi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useCategory } from "@/hooks/useCategory";
import { useSearchParams } from "next/navigation";
import { hover_color, main_color } from "../../../../../public/color";

const diaDiem = [
  { label: "Tất cả địa điểm", value: "" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Hồ Chí Minh", value: "Hồ Chí Minh" },
  { label: "Đà Lạt", value: "Đà Lạt" },
] as const;

const formSchema = z.object({
  searchWord: z.string(),
  location: z.string(),
  ngayBatDau: z.string(),
  ngayKetThuc: z.string(),
  chuDeId: z.string(),
});
type props = {
  setSearchProps: Dispatch<SetStateAction<searchType>>;
};
const SearchComponent = ({ setSearchProps }: props) => {
  const [typeNumber, setTypeNumber] = useState("0");
  const [date, setDate] = React.useState<Date>();
  const { fetchAllCategories } = useCategory();
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => {
      const res = fetchAllCategories();
      return res;
    },
  });
  const category =
    data?.map((cat) => ({
      label: cat.name,
      value: cat.id,
    })) || [];
  const categoryWithAll = [
    { label: "Tất cả danh mục", value: "" },
    ...category,
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchWord: "",
      location: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      chuDeId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setSearchProps({
      searchWord: values.searchWord,
      location: values.location,
      ngayBatDau: values.ngayBatDau,
      ngayKetThuc: values.ngayKetThuc,
      chuDeId: values.chuDeId,
    });
  }
  const handleSelectItemClick = (selectedValue: string) => {
    // Update the form values manually
    form.setValue("location", selectedValue);
    form.handleSubmit(onSubmit)();
  };
  const searchParams = useSearchParams();
  const chude = searchParams.get("category");
  const tukhoa = searchParams.get("searchWord");

  useEffect(() => {
    if (chude) {
      form.setValue("chuDeId", chude);
      // Trigger form submission when the component mounts
      form.handleSubmit(onSubmit)();
      form.setValue("chuDeId", "");
    }
    if (tukhoa) {
      // Trigger form submission when the component mounts
      form.setValue("searchWord", tukhoa);
      form.handleSubmit(onSubmit)();
      // form.setValue("searchWord", "");
    }
  }, []);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col items-center justify-center w-full h-[450px] bg-[url(https://content.api.news/v3/images/bin/95c374666aecfd1bcb0c373460da01e7)] bg-no-repeat bg-cover bg-center">
            <h1 className="text-white text-2xl font-bold mb-3">
              Khám phá thêm nhiều sự kiện
            </h1>
            <div className="flex max-w-[960px] md:w-[600px] lg:w-[1280px] ">
              <div className="grow mr-2">
                <FormField
                  control={form.control}
                  name="searchWord"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="bg-white h-[56px]"
                          placeholder="Tìm kiếm sự kiện..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className={`text-white bg-[#3BE1AA] hover:bg-[#2DD196] hover:text-black`}
                type="submit"
              >
                Tìm kiếm
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 max-w-[960px] md:w-[600px] lg:w-[1280px] gap-2 mx-auto p-3 md:p-0">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mr-6 ">
                      <Select
                        label="Chọn địa điểm"
                        className="h-[52px]"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        // selectorIcon={<BiBuildingHouse />}
                        {...field}
                      >
                        {diaDiem.map((item) => (
                          <SelectItem
                            key={item.value}
                            value={item.value}
                            // onClick={form.handleSubmit(onSubmit)()}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chuDeId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="mr-6 ">
                      <Select
                        label="Chọn thể loại"
                        className="h-[52px]"
                        variant="bordered"
                        radius="sm"
                        size="sm"
                        defaultSelectedKeys={chude}
                        // selectorIcon={<BiBuildingHouse />}
                        {...field}
                      >
                        {categoryWithAll.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ngayBatDau"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground shadow"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Ngày bắt đầu</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        } // Convert to Date type
                        onSelect={(date) => {
                          if (field.value && date) {
                            // Nếu đã có ngày và ngày được chọn lại, thì unselect ngày
                            field.onChange(null);
                          } else {
                            // Ngược lại, set giá trị ngày mới
                            field.onChange(date ? date.toISOString() : "");
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ngayKetThuc"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground shadow"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Ngày kết thúc</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        } // Convert to Date type
                        onSelect={(date) => {
                          if (field.value && date) {
                            // Nếu đã có ngày và ngày được chọn lại, thì unselect ngày
                            field.onChange(null);
                          } else {
                            // Ngược lại, set giá trị ngày mới
                            field.onChange(date ? date.toISOString() : "");
                          }
                        }} // Convert to string for form data
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchComponent;
