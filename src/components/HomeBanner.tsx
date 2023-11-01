'use client';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { Button } from './ui/button';
function HomeBanner() {
  return (
    <div
      className="relative text-white text-[20px] w-full lg:px-10 mx-auto
    "
    >
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
      >
        <div className="h-[300px] lg:h-[650px] w-full rounded-2xl ">
          <Image
            src="https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp"
            alt="Auth background"
            layout="fill"
            className="rounded-2xl"
            objectFit="cover"
            priority
            quality={100}
          />

          <div className="absolute top-20 lg:top-[50%] px-5 font-bold z-20 ">
            <blockquote className="space-y-2">
              <p className="text-2xl lg:text-5xl capitalize ">
                Khám phá bất động sản của riêng bạn
              </p>
              <footer className="text-lg">
                Với thế giới bất động sản UIT Estate
              </footer>
              <Button
                variant={'outline'}
                size={'lg'}
                className="text-accent-foreground"
              >
                Khám phá ngay
              </Button>
            </blockquote>
          </div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
        <div>
          <Image
            src="https://plus.unsplash.com/premium_photo-1670360414483-64e6d9ba9038?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute top-20 lg:top-[50%] px-5 font-bold z-20 ">
            <blockquote className="space-y-2">
              <p className="text-2xl lg:text-5xl capitalize ">
                Trở thành đối tác của UIT Estate
              </p>
              <footer className="text-lg">
                Đăng tin bất động sản của chính bạn
              </footer>
              <Button
                variant={'outline'}
                size={'lg'}
                className="text-accent-foreground"
              >
                Đăng ký ngay
              </Button>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1633035952988-197dc0939770?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1931&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute top-20 lg:top-[50%] px-5 font-bold z-20 ">
            <blockquote className="space-y-2">
              <p className="text-2xl lg:text-5xl capitalize ">UIT Estate</p>
              <footer className="text-lg">
                Điều hướng thị trường bất động sản chưa bao giờ dễ dàng đến thế
              </footer>
            </blockquote>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default HomeBanner;
