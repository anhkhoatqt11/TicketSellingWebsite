"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
function AuthCarousel() {
  return (
    <div className="relative hidden h-screen w-1/2 flex-col bg-muted text-white dark:border-r lg:flex">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
        showArrows={false}
      >
        <div className="h-screen w-full">
          <Image
            src="/pic1.jpg"
            alt="Auth background"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={100}
          />
        </div>
        <div className="h-screen w-full">
          <Image
            src="/pic2.jpg"
            alt="Auth background"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={100}
          />
        </div>
        <div className="h-screen w-full">
          <Image
            src="/pic3.jpg"
            alt="Auth background"
            fill
            style={{ objectFit: "cover" }}
            priority
            quality={100}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default AuthCarousel;
