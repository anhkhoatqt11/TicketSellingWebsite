import { useEvent } from "@/hooks/useEvent";
import ItemComponent from "./ItemComponent";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function ListComponent() {
  const { fetchAllEvents } = useEvent();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("all");
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      const res = fetchAllEvents();
      setIsLoading(true);
      return res;
    },
  });
  const filteredEvents = data?.data.filter((item) => {
    const currentDate = new Date();
    const eventStartDate = new Date(item.ngayBatDau);
    const eventEndDate = new Date(item.ngayKetThuc);

    switch (selectedEventType) {
      case "upcoming":
        return eventStartDate > currentDate;
      case "ongoing":
        return eventStartDate <= currentDate && currentDate <= eventEndDate;
      case "all":
      default:
        return true;
    }
  });
  const handleEventTypeChange = (event) => {
    setSelectedEventType(event.target.value);
  };

  return (
    <>
      <h1 className="text-2xl font-bold dark:text-white">
        Danh sách sự kiện đang diễn ra
      </h1>
      {/* <select
        value={selectedEventType}
        onChange={handleEventTypeChange}
        className="mt-4 mb-2 p-2 border rounded"
      >
        <option value="all">Tất cả sự kiện</option>
        <option value="upcoming">Sự kiện sắp diễn ra</option>
        <option value="ongoing">Sự kiện đang diễn ra</option>
      </select> */}
      <Select value={selectedEventType} onValueChange={setSelectedEventType}>
        <SelectTrigger className="mt-4 py-0 w-[180px]  ">
          <SelectValue placeholder="Tất cả sự kiện" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Tất cả sự kiện</SelectItem>
            <SelectItem value="upcoming">Sự kiện sắp diễn ra</SelectItem>
            <SelectItem value="ongoing">Sự kiện đang diễn ra</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {/* {!isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6 p-6">
          {data?.data.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )} */}
      {!isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6 p-6">
          {filteredEvents?.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
export default ListComponent;
