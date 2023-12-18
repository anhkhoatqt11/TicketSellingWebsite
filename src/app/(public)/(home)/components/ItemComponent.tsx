import React from "react";
import Link from "next/link";
import Image from "next/image";
const ItemComponent = ({ item }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };

  const truncateDescription = (
    description: string,
    maxLength: number
  ): string =>
    description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  return (
    <>
      <Link href={`event/${item?.id}`} key={item.id}>
        <div className="max-w-sm h-full rounded-lg block overflow-hidden shadow-lg hover:opacity-80">
          <img
            className="w-full aspect-[13/5] object-cover"
            src={item.hinhAnhSuKien}
            alt="Event"
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.name}</div>
            <p className="text-gray-700 text-base">
              {truncateDescription(item.moTa, 100)}
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div>{formatDate(item.ngayBatDau)}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ItemComponent;
