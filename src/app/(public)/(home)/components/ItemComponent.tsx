import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoMdTime } from "react-icons/io";
import { main_color } from "../../../../../public/color";
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import OutsideIcon from "@/components/outside";

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
  const getIconById = (id) => {
    switch (id) {
      case 1:
        return <OutsideIcon className={"mr-1 ms-1 w-4 h-4"} />;
      case 2:
        return <LiveMusic className={"mr-1 ms-1 w-4 h-4"} />;
      case 3:
        return <StageIcon className={"mr-1 ms-1 w-4 h-4"} />;
      case 4:
        return <NightLifeIcon className={"mr-1 ms-1 w-4 h-4"} />;
      case 5:
        return <ConferenceIcon className={"mr-1 ms-1 w-4 h-4"} />;
      case 6:
        return <CourseIcon className={"mr-1 ms-1 w-4 h-4"} />;
      case 7:
        return <TourismIcon className={"mr-1 ms-1 w-4 h-4"} />;
      case 8:
        return <SportIcon className={"mr-1 ms-1 w-4 h-4"} />;
      default:
        return null;
    }
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
        <div className="max-w-sm h-full rounded-lg flex flex-col overflow-hidden shadow-md hover:opacity-80">
          <img
            className="w-full aspect-[13/5] object-cover"
            src={item.hinhAnhSuKien}
            alt="Event"
          />
          <div className="px-6 py-4 flex-1">
            <div className="flex flex-row gap-1 items-center font-medium mb-1">
              {getIconById(item.ChuDeId)}
              <div className={`text-sm text-[#3BE1AA]`}>
                {topicMapping[item.ChuDeId]}
              </div>
            </div>
            <div className="font-semibold text-base mb-2">{item.name}</div>
          </div>
          <div
            className={`px-6 pb-2 flex flex-row gap-1 text-sm text-gray-500 items-center`}
          >
            <IoMdTime /> {formatDate(item.ngayBatDau)} {" - "}{" "}
            {formatDate(item.ngayKetThuc)}
          </div>
        </div>
      </Link>
    </>
  );
};

export default ItemComponent;
