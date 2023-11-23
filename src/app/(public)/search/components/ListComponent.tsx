"use client";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/hooks/useEvent";
import { useState } from "react";
import { HiSortAscending } from "react-icons/hi";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { searchType } from "./SearchLayout";
import ItemComponent from "./ItemComponent";
type props = {
  searchProps: searchType | undefined;
};

export function ListComponent({ searchProps }: props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchAllEventsBySearch } = useEvent();
  const { data } = useQuery({
    queryKey: [
      ["event", currentPage],
      ["props", searchProps],
    ],
    queryFn: () => fetchAllEventsBySearch(currentPage, searchProps),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
  });
  const ref = React.useRef<HTMLDivElement>(null);

  //Set page state when change review page index
  const onPageChange = (page) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div ref={ref} className="mt-6 ">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  md:w-[600px] lg:w-[1280px] max-w-[960px] gap-6 p-6 md:p-0">
        {data?.data.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center p-6">
        <Pagination
          showControls
          total={data?.totalPages}
          initialPage={1}
          onChange={(page) => {
            onPageChange(page);
          }}
          page={currentPage}
        />
      </div>
    </div>
  );
}
