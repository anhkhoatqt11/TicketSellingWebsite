"use client";
import { Button } from "@/components/ui/button";
import { useEvent } from "@/hooks/useEvent";
import { useEffect, useState } from "react";
import { HiOutlineLightBulb, HiSortAscending } from "react-icons/hi";

import { Divider, Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { searchType } from "./SearchLayout";
import ItemComponent from "./ItemComponent";
import { hover_color, main_color } from "../../../../../public/color";
type props = {
  searchProps: searchType | undefined;
};

export function ListComponent({ searchProps }: props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchAllEventsBySearch, fetchSuggestion } = useEvent();
  const [suggestionList, setSuggestionList] = useState();
  const { data } = useQuery({
    queryKey: [
      ["event", currentPage],
      ["props", searchProps],
    ],
    queryFn: () => fetchAllEventsBySearch(currentPage, searchProps),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
  });

  useEffect(() => {
    const fetchSuggestionData = async () => {
      await fetchSuggestion().then((res) => {
        setSuggestionList(res);
      });
    };
    fetchSuggestionData();
  }, []);

  const ref = React.useRef<HTMLDivElement>(null);

  //Set page state when change review page index
  const onPageChange = (page) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div ref={ref} className="mt-6 ">
      {data?.data.length !== 0 ? (
        <>
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
        </>
      ) : (
        <>
          <div
            className={`mx-auto md:w-[600px] lg:w-[1280px] max-w-[960px] gap-6 p-6 md:p-0 text-[#8b8b8b] mb-6`}
          >
            Không tìm thấy sự kiện phù hợp
            <div
              className={`text-[#3BE1AA] mt-6 font-semibold text-lg flex flex-row gap-1 items-center`}
            >
              <HiOutlineLightBulb className="w-6 h-6" /> Gợi ý hôm nay
            </div>
            <Divider className="my-1 mb-3" />
          </div>
          {suggestionList?.length !== 0 ? (
            <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2  md:w-[600px] lg:w-[1280px] max-w-[960px] gap-6 p-6 md:p-0 mb-6">
              {suggestionList?.map((item) => (
                <ItemComponent key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div
              className={`mx-auto md:w-[600px] lg:w-[1280px] max-w-[960px] gap-6 p-6 md:p-0 text-[#8b8b8b] mb-6`}
            >
              Hiện tại không có sự kiện sắp hoặc đang diễn ra ...
            </div>
          )}
        </>
      )}
    </div>
  );
}
