'use client';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Image from 'next/image';
function AuthCarousel() {
  return (
    <div className="relative hidden h-screen w-1/2 flex-col bg-muted text-white dark:border-r lg:flex">
        <div className="h-screen w-full">
          <Image
            src="/authcarosel-1.png"
            alt="Auth background"
            fill
            style={{objectFit:"cover"}}
            priority
            quality={100}
          />
        </div>
    </div>
  );
}

export default AuthCarousel;
