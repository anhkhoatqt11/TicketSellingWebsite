import { useEvent } from "@/hooks/useEvent";
import ItemComponent from "./ItemComponent";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "@/components/Loader";

export function ListComponent() {
  const { fetchAllEvents } = useEvent();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      const res = fetchAllEvents();
      setIsLoading(true);
      return res;
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold dark:text-white">
        Danh sách sự kiện đang diễn ra
      </h1>
      {!isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6 p-6">
          {data?.data.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
export default ListComponent;
