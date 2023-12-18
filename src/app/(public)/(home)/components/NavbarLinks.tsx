import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import OutsideIcon from "@/components/outside";
import CalendarIcon from "@/components/calendar";
import { Button } from "@/components/ui/button";
const NavbarLinks = ({ data }) => {
  const getIconById = (id) => {
    switch (id) {
      case 1:
        return <OutsideIcon className={"mr-2 ms-3 w-6 h-6"} />;
      case 2:
        return <LiveMusic className={"mr-2 ms-3 w-6 h-6"} />;
      case 3:
        return <StageIcon className={"mr-2 ms-3 w-6 h-6"} />;
      case 4:
        return <NightLifeIcon className={"mr-2 ms-3 w-6 h-6"} />;
      case 5:
        return <ConferenceIcon className={"mr-2 ms-3 w-6 h-6"} />;
      case 6:
        return <CourseIcon className={"mr-2 ms-3 w-6 h-6"} />;
      case 7:
        return <TourismIcon className={"mr-2 ms-3 w-6 h-6"} />;
      case 8:
        return <SportIcon className={"mr-2 ms-3 w-6 h-6"} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
      <ul className="space-y-2 font-medium">
        <div>
          <Link
            href="/"
            className="flex items-center p-2 text-gray-900 rounded-lg bg-white  box-shadow"
          >
            <CalendarIcon className={"mr-2 ms-3 w-6 h-6"} />
            <span className="text-sm font-bold">Trang chủ</span>
          </Link>
        </div>
        {data?.map((item) => (
          <div key={item.id}>
            <li>
              <Link
                href={`/search/?category=${item.id}`} //url search
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-blue-300 hover:text-white"
              >
                {getIconById(item.id)}
                <span className="text-sm">{item.name}</span>
              </Link>
            </li>
          </div>
        ))}
        <div>
          <Link
            href={"/search"}
            className="flex items-center justify-center text-center p-2 bg-blue-700 rounded-lg text-white hover:bg-amber-300 hover:text-black"
          >
            Tìm kiếm sự kiện
          </Link>
        </div>
      </ul>
    </div>
  );
};

export default NavbarLinks;
