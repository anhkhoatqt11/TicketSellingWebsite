import React from "react";
import Link from "next/link";
import Image from "next/image";

const ItemComponent = ({ item }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB");
  };
  const topicMapping = {
    1: "Ngoài trời",
    2: "Nhạc sống",
    3: "Sân khấu - Nghệ thuật",
    4: "Nightlife",
    5: "Hội thảo - Cộng đồng",
    6: "Khóa học",
    7: "Tham quan du lịch",
    8: "Thể thao",
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
        <div className="max-w-sm h-full rounded-lg flex flex-col overflow-hidden shadow-lg hover:opacity-80">
          <img
            className="w-full aspect-[13/5] object-cover"
            src={item.hinhAnhSuKien}
            alt="Event"
          />
          <div className="px-6 py-4 flex-1">
            <div className="font-bold text-xl mb-2">{item.name}</div>
            {/* <p className="text-gray-700 text-base">
              {truncateDescription(item.moTa, 100)}
            </p> */}
            <div
              className="text-medium h-24 overflow-clip text-ellipsis"
              dangerouslySetInnerHTML={{ __html: `${item?.moTa}` }}
            ></div>
          </div>
          <div className="px-6 ">
            <div>{topicMapping[item.ChuDeId]}</div>
          </div>
          <div className="px-6 pb-2">
            <div>{formatDate(item.ngayBatDau)}</div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ItemComponent;
