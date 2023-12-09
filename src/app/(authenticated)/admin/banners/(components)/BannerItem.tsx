import React from 'react';
import Image from 'next/image';

const BannerItem = ({ Items }) => {
    return (
      <div className='relative bg-white rounded-md items-center justify-center'>
        {/* Circle shape with number 1 */}
        <div className='absolute top-0 left-0 w-10 h-10 bg-white text-black flex items-center justify-center rounded-full'>
          {Items.id}
        </div>
  
        <Image
          alt='Example Image'
          src={Items.hinhAnhSuKien}
          objectFit='cover'
          width={1920}
          height={360}
        />
        <p className='text-center'>
          {Items.name}
        </p>
      </div>
    );
  };
  
export default BannerItem;