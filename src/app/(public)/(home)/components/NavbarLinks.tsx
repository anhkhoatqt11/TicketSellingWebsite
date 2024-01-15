/* eslint-disable @next/next/no-img-element */
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
import LicenseLogo from "@/components/license";
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
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-[#dcdcdc]"
              >
                {getIconById(item.id)}
                <span className="text-sm">{item.name}</span>
              </Link>
            </li>
          </div>
        ))}
        <div className="hidden lg:block mt-6 pt-6">
          <div className="items-center w-full flex flex-row gap-2">
            <img alt="TicketBox" src="/license1.jpg" className="w-32" />
          </div>
          <div className="flex flex-col gap-2 mt-3 ml-1">
            <div className="text-[12px] text-gray-500 ">
              Công ty TNHH TicketNow
            </div>
            <div className="text-[12px] text-gray-500 ">
              Đại diện theo pháp luật: Đoàn Lê Tuấn Thành
            </div>
            <div className="text-[12px] text-gray-500 ">
              Địa chỉ: UIT, Phường Linh Trung, Thành phố Thủ Đúc, TP. Hồ Chí
              Minh
            </div>
            <div className="text-[12px] text-gray-500 ">
              Hotline: 1900.0000 - Email: support@ticketnow.vn
            </div>
            <div className="text-[12px] text-gray-500 ">
              Giấy chứng nhận đăng ký doanh nghiệp số: 0123456789, cấp lần đầu
              ngày 12/12/2023 bởi Sở Kế Hoạch và Đầu Tư TP. Hồ Chí Minh
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarLinks;
