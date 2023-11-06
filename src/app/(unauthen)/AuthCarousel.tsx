'use client';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
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
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />

          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Nền tảng này đã cách mạng hóa cách tôi xử lý các giao
                dịch bất động sản. Với giao diện liền mạch và các tính năng mạnh
                mẽ, tôi có thể quản lý tài sản, khách hàng và hợp đồng một cách
                dễ dàng và chuyên nghiệp chưa từng có.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1780&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Trong một ngành mà thời gian là điều cốt yếu, dịch vụ
                trang web bất động sản này đã là cứu cánh cho tôi.&rdquo;
              </p>
              <footer className="text-sm">Anthony James</footer>
            </blockquote>
          </div>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
            alt="Auth background"
            layout="fill"
            objectFit="cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black opacity-10" />
          <div className="absolute bottom-20 z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Điều hướng thị trường bất động sản chưa bao giờ dễ dàng
                hơn nhờ nền tảng đáng kinh ngạc này. Thiết kế thân thiện với
                người dùng và các tính năng toàn diện của nó cho phép tôi quản
                lý mọi khía cạnh của hoạt động kinh doanh bất động sản của mình
                một cách dễ dàng.&rdquo;
              </p>
              <footer className="text-sm">Michael Jordan</footer>
            </blockquote>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default AuthCarousel;
