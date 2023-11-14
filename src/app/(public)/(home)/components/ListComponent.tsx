import { useEvent } from "@/hooks/useEvent";
import ItemComponent from "./ItemComponent";
import { useQuery } from "@tanstack/react-query";
export function ListComponent() {
  const { fetchAllEvents } = useEvent();
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      const res = fetchAllEvents();
      return res;
    },
  });

  return (
    <>
      <h1 className="text-2xl font-bold dark:text-white">
        Danh sách sự kiện đang diễn ra
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-6 p-6">
        {data?.data.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
export default ListComponent;
