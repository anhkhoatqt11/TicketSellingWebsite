"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useEvent } from "@/hooks/useEvent";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
function EventCarousel() {
  const { fetchEventBanner } = useEvent();

  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetchEventBanner();
      return res;
    },
  });

  // Ensure data is available before rendering
  if (isLoading || !data) {
    return null;
  }

  const sortedData = data.sort((a, b) => a.position - b.position);

  return (
    <div className="w-[80%] flex-col bg-white text-white dark:border-r lg:flex p-4">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
      >
        {sortedData.map((item) => (
          <Link href={`event/${item?.SuKienId}`}>
            <div key={item.suKienId} className="w-full h-[200px] md:h-[300px] lg:h-[400px]">
              <Image
                className="rounded-lg"
                src={item.suKien.hinhAnhSuKien}
                alt="Event background"
                fill
                style={{ objectFit: "cover" }}
                priority
                quality={100}
              />
              <div className="absolute inset-0 bg-black opacity-10" />
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}

export default EventCarousel;
