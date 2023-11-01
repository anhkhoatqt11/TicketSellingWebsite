// 'use client';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react';
// import { currencyFormat, parseJSON } from '@/lib/utils';

// import {
//   AiOutlineHeart,
//   AiFillHeart,
//   AiOutlineShoppingCart,
// } from 'react-icons/ai';
// import { useFavorite } from '@/hooks/useFavorite';
// export default function ProductCard({ product }) {
//   console.log(product);
//   const [isLiked, setIsLiked] = React.useState<boolean>(false);
//   const [isAddToCart, setIsAddToCart] = React.useState<boolean>(false);
//   const { onAddFavorite, onDeleteFavorite } = useFavorite();

//   return (
//     <div>
//       <div className="relative">
//         <Link
//           className="
//     "
//           href={`/product/${product?.id}`}
//         >
//           <Image
//             objectFit="cover"
//             width={900}
//             height={900}
//             src={parseJSON(product?.thumbnail)?.url}
//             className="transform duration-200
//     hover:scale-105"
//             priority
//             quality={100}
//             alt="product image"
//           />
//         </Link>

//         <div
//           onClick={() => {
//             if (!isLiked) {
//               onAddFavorite({ data: product });
//             }
//             if (isLiked) {
//               onDeleteFavorite({ data: product });
//             }

//             setIsLiked(!isLiked);
//           }}
//           className="transform duration-200
//     hover:scale-105 absolute items-center justify-center cursor-pointer flex top-3 right-3 w-[30px] h-[30px] rounded-full bg-white"
//         >
//           {isLiked ? (
//             <AiFillHeart className="text-red-400 w-5 h-5 " />
//           ) : (
//             <AiOutlineHeart className="text-slate-600 w-5 h-5 " />
//           )}
//         </div>

//         <div
//           onClick={() => {
//             setIsAddToCart(!isAddToCart);
//           }}
//           className="transform duration-200
//     hover:scale-105 absolute items-center justify-center cursor-pointer flex left-3 top-3 w-[30px] h-[30px] rounded-full bg-white"
//         >
//           <AiOutlineShoppingCart className="text-slate-600 w-5 h-5 " />
//         </div>
//       </div>
//       <Link
//         className="
//     "
//         href={`/product/${product?.id}}`}
//       >
//         <div className="text-start p-4 text-black/[0.9]">
//           <h2 className="text-lg font-medium">{product?.name}</h2>
//           <div className="flex flex-wrap items-center text-black/[0.5]">
//             <p className="mr-2 text-sm font-semibold ">
//               {currencyFormat(product?.price)}
//             </p>
//             {1 && (
//               <p className="text-sm font-medium line-through ">
//                 {currencyFormat(product?.price * 1.3)}
//               </p>
//             )}
//           </div>
//           {1 && (
//             <p className="ml-auto text-base font-medium text-green-500">
//               {' '}
//               12% off
//             </p>
//           )}
//         </div>
//       </Link>
//     </div>
//   );
// }

import ProductSvg from '@/assets/ProductSvg';
import Image from 'next/image';
import React from 'react';

export const ProductCard = ({ product }) => {
  return (
    <div className="w-full">
      <div className=" bg-gray-500 px-[20px] py-[22px] rounded-[16px] flex flex-col gap-y-[12px]">
        <Image
          className="rounded-[6px]"
          src={
            'https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp'
          }
          width={900}
          height={900}
        />
        <div className="flex flex-col gap-y-[12px] items-start">
          <p className="text-[16px] font-semibold">{product.name}</p>
          <p>Biet thu view gia re</p>
          <div className="flex flex-col gap-y-[17px] items-start w-full">
            <div className="flex flex-row gap-x-[12px]">
              {ProductSvg.map()}

              <p>linh trung</p>
            </div>
            <div className="flex w-full flex-row gap-x-[12px] justify-start">
              <div className="w-[50%] flex justify-start">phong ngu</div>
              <div className="w-[50%] flex justify-start">phong tam</div>
            </div>
            <div>dien tich</div>
          </div>
        </div>
      </div>
    </div>
  );
};
