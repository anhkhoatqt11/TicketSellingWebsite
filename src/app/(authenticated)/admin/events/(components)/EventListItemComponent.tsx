"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import { Image } from "@nextui-org/react";
import { convertDateTimeToDate, parseJSON } from "@/lib/utils";
import { SiEventstore } from "react-icons/si";
import { BsCheck2Circle } from "react-icons/bs";
import { TbCalendarCancel } from "react-icons/tb";
import {
  AiOutlineLock,
  AiOutlineClockCircle,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { IoLocationOutline, IoPeople } from "react-icons/io5";
import { FcSportsMode } from "react-icons/fc";
import { BiSolidDiscount } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import OutsideIcon from "@/components/outside";
import Link from "next/link";
import { Edit, PlayIcon } from "lucide-react";
import { main_color } from "../../../../../../public/color";

const getIconById = (id) => {
  switch (id) {
    case 1:
      return <OutsideIcon className={"mt-1 w-4 h-4"} />;
    case 2:
      return <LiveMusic className={"mt-1 w-4 h-4"} />;
    case 3:
      return <StageIcon className={"mt-1 w-4 h-4"} />;
    case 4:
      return <NightLifeIcon className={"mt-1 w-4 h-4"} />;
    case 5:
      return <ConferenceIcon className={"mt-1 w-4 h-4"} />;
    case 6:
      return <CourseIcon className={"mt-1 w-4 h-4"} />;
    case 7:
      return <TourismIcon className={"mt-1 w-4 h-4"} />;
    case 8:
      return <SportIcon className={"mt-1 w-4 h-4"} />;
    default:
      return null;
  }
};

export function EventListItemComponent({
  item,
  onOpen,
  setSelectedItem,
  setTrangThai,
}) {
  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0
  );

  return (
    <>
      <Card className="mt-4 cursor-pointer" key={`event_${"item.id"}`}>
        <div>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 h-[180px] m-3 relative">
              <img
                className="rounded-md h-[180px] w-full object-cover"
                src={item?.hinhAnhSuKien}
              />
              {getDateTimeKetThuc(item?.ngayKetThuc) &&
              item?.trangThai === "daDuyet" ? (
                <div className="absolute top-2 left-2 w-[180px]">
                  <div
                    className={`bg-blue-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center`}
                  >
                    <SiEventstore className="mt-1 w-3 h-3" />
                    <div className="text-sm">Đang hoạt động</div>
                  </div>
                </div>
              ) : !getDateTimeKetThuc(item?.ngayKetThuc) &&
                item?.trangThai === "daDuyet" ? (
                <div className="absolute top-2 left-2 w-[180px]">
                  <div className="bg-emerald-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                    <BsCheck2Circle className="mt-1 w-3 h-3" />
                    <div className="text-sm">Hoàn thành</div>
                  </div>
                </div>
              ) : item?.trangThai === "daHuy" ? (
                <div className="absolute top-2 left-2 w-[180px]">
                  <div className="bg-red-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                    <TbCalendarCancel className="mt-1 w-3 h-3" />
                    <div className="text-sm">Đã hủy</div>
                  </div>
                </div>
              ) : item?.trangThai === "daKhoa" ? (
                <div className="absolute top-2 left-2 w-[180px]">
                  <div className="bg-gray-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                    <AiOutlineLock className="mt-1 w-3 h-3" />
                    <div className="text-sm">Đã bị khóa</div>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="lg:w-2/3 m-3">
              <h1
                className={`text-sm text-[#2DD196] font-medium mt-1 flex flex-row gap-2`}
              >
                {getIconById(item?.ChuDe?.id)}
                {item?.ChuDe?.name}
              </h1>
              <div className="flex flex-row">
                <h1 className="text-2xl font-extrabold mt-1">{item?.name}</h1>
              </div>
              {/* <p
              className="mt-2 text-medium max-h-24 h-fit overflow-clip"
              dangerouslySetInnerHTML={{ __html: `${item?.moTa}` }}
            ></p> */}
              <h1 className="text-sm text-slate-500 mt-3 flex flex-row gap-2">
                <IoLocationOutline className="mt-1" />
                {item?.diaChi}
              </h1>
              <h1 className="text-sm text-slate-500 mt-3 flex flex-row gap-2">
                <AiOutlineClockCircle className="mt-1" />
                {"Bắt đầu từ ngày "}
                {convertDateTimeToDate(item?.ngayBatDau)}
                {" đến ngày "}
                {convertDateTimeToDate(item?.ngayKetThuc)}
              </h1>
            </div>
          </div>
          <Separator />
          <div
            className={`grid grid-cols-2 gap-2 rounded-md text-[#2DD196] bg-[#2dd1950e] font-medium w-full place-content-center`}
          >
            <Link href={`/event/${item?.id}`}>
              <div
                className={`grid place-content-center text-center gap-2 hover:bg-[#3BE1AA] hover:text-white py-4 rounded-bl-lg`}
              >
                <PlayIcon className="w-full" />
                Xem sự kiện
              </div>
            </Link>
            <div
              className={`grid place-content-center text-center gap-2 hover:bg-[#3BE1AA] hover:text-white py-4`}
              onClick={() => {
                onOpen();
                setSelectedItem(item);
                setTrangThai(
                  item.trangThai.split(",").map((trangThai) => trangThai.trim())
                );
              }}
            >
              <Edit className="w-full" />
              Chỉnh sửa trạng thái sự kiện
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

const getDateTimeKetThuc = (type) => {
  const time = convertDateTimeToDate(type).split("/");
  const year = new Date().getFullYear() - parseInt(time[2]);
  const month = new Date().getMonth() + 1 - parseInt(time[1]);
  const day = new Date().getDate() - parseInt(time[0]);
  return (
    year < 0 ||
    (year === 0 && month < 0) ||
    (year === 0 && month === 0 && day < 0)
  );
};
export default EventListItemComponent;
