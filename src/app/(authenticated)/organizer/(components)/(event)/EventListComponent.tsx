"use client";

import React from "react";
import { useState } from "react";
// import { RealEstateCard } from './RealEstateCard';
// import { useBaiVietDoiTac } from '@/hooks/useBaiVietDoiTac';
import { useQuery } from "@tanstack/react-query";
// import { useBatDongSan } from "@/hooks/useBatDongSan";
// import { searchType } from './RealEstateListLayout';
import { Pagination } from "@nextui-org/react";
import Loader from "@/components/Loader";
import EventListItemComponent from "./EventListItemComponent";
import { useEventOrganizer } from "@/hooks/useEventOrganizer";

function EventListComponent({ props, session }) {
  const userId = session?.user?.id;
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchEventOfOrganizer } = useEventOrganizer();
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { data } = useQuery({
    queryKey: [
      ["event", currentPage],
      ["name", props],
    ],
    queryFn: () => fetchEventOfOrganizer(props, currentPage, userId),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
    onSuccess: () => {
      setIsLoaded(true);
    },
  });
  const onPageChange = (page) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setCurrentPage(page);
  };

  // const [isDefault, setIsDefault] = useState(true);
  // const [isDefaultPrice, setIsDefaultPrice] = useState(true);

  return (
    <div>
      {!isLoaded ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="mr-6 mt-4 bg-slate-50">
          {data?.length === 0 ? (
            <div className="text-gray-800 text-lg font-medium">
              Hiện tại chưa có sự kiện nào được tạo
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
                {data?.data.map((item) => (
                  <EventListItemComponent
                    item={item}
                    key={`event-${item.id}`}
                  />
                ))}
              </div>
              <div className="flex justify-center p-6">
                <Pagination
                  showControls
                  total={data?.totalPages}
                  color="primary"
                  initialPage={1}
                  onChange={(page) => {
                    onPageChange(page);
                  }}
                  page={currentPage}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default EventListComponent;
