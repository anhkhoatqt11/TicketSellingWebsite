"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

function EventCarousel() {
  return (
    <div className=" w-[80%] flex-col bg-white text-white dark:border-r lg:flex p-4">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        showArrows={true}
      >
        <div className="w-full  h-[200px] md:h-[300px] lg:h-[400px]">
          <Image
            className="rounded-lg"
            src="https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2023/10/31/E61B72.jpg"
            alt="Auth background"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={100}
          />

          <div className="absolute bottom-20 z-20 mt-auto"></div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
        <div>
          <Image
            className="rounded-lg"
            src="https://images.tkbcdn.com/1/1560/600/Upload/eventcover/2023/10/13/1E657F.jpg"
            alt="Auth background"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
      </Carousel>
    </div>
  );
}

export default EventCarousel;
