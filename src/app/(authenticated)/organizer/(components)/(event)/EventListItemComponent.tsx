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
} from "react-icons/ai";
import { IoLocationOutline, IoPeople } from "react-icons/io5";
import { FcSportsMode } from "react-icons/fc";
import { BiSolidDiscount } from "react-icons/bi";
import { FaChartBar } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function EventListItemComponent({ item }) {
  const currentDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate(),
    0,
    0,
    0,
    0
  );
  console.log(item);
  return (
    <Card className="mt-4 cursor-pointer" key={`batdongsan_${"item.id"}`}>
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 h-[180px] m-3 relative">
            <img
              className="rounded-md h-[180px] w-full object-cover"
              src={item?.hinhAnhSuKien}
            />
            {getDateTimeKetThuc(item?.ngayKetThuc) &&
            item?.trangThai === "Đã duyệt" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-blue-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <SiEventstore className="mt-1" />
                  <div>Đang hoạt động</div>
                </div>
              </div>
            ) : !getDateTimeKetThuc(item?.ngayKetThuc) &&
              item?.trangThai === "Đã duyệt" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-emerald-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <BsCheck2Circle className="mt-1" />
                  <div>Hoàn thành</div>
                </div>
              </div>
            ) : item?.trangThai === "Đã hủy" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-red-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <TbCalendarCancel className="mt-1" />
                  <div>Đã hủy</div>
                </div>
              </div>
            ) : item?.trangThai === "Đã khóa" ? (
              <div className="absolute top-2 left-2 w-[180px]">
                <div className="bg-gray-400 font-medium text-white p-2 rounded flex flex-row gap-2 justify-center">
                  <AiOutlineLock className="mt-1" />
                  <div>Đã bị khóa</div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="lg:w-2/3 m-3">
            <h1 className="text-base text-emerald-400 mt-1 flex flex-row gap-2">
              <FcSportsMode className="mt-1" />
              {item?.ChuDe?.name}
            </h1>
            <div className="flex flex-row">
              <h1 className="text-2xl font-extrabold mt-1">{item?.name}</h1>
            </div>
            <h1 className="text-base text-slate-500 mt-1 flex flex-row gap-2">
              <IoLocationOutline className="mt-1" />
              {item?.diaChi}
            </h1>
            <h1 className="text-base text-slate-500 mt-1 flex flex-row gap-2">
              <AiOutlineClockCircle className="mt-1" />
              {convertDateTimeToDate(item?.ngayBatDau)}
              {" - "}
              {convertDateTimeToDate(item?.ngayKetThuc)}
            </h1>
            <p
              className="mt-2 text-medium text-ellipsis overflow-hidden h-[60px]"
              dangerouslySetInnerHTML={{ __html: `${item?.moTa}` }}
            ></p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-4 gap-2 rounded-md text-green-500 font-medium w-full place-content-center">
          <div className="grid place-content-center text-center gap-2 hover:bg-emerald-400 hover:text-white py-4 rounded-bl-lg">
            <IoPeople className="w-full" />
            Danh sách khách
          </div>
          <div className="grid place-content-center text-center gap-2 hover:bg-emerald-400 hover:text-white py-4">
            <BiSolidDiscount className="w-full" />
            Mã giảm giá
          </div>
          <Link href={`/organizer/event/details/${item?.id}`}>
            <div className="grid place-content-center text-center gap-2 hover:bg-emerald-400 hover:text-white py-4">
              <AiFillEdit className="w-full" />
              Chỉnh sửa
            </div>
          </Link>
          <div className="grid place-content-center text-center gap-2 hover:bg-emerald-400 hover:text-white py-4 rounded-br-lg">
            <FaChartBar className="w-full" />
            Tổng kết
          </div>
        </div>
      </div>
    </Card>
  );
}

const getDateTimeKetThuc = (type) => {
  const time = convertDateTimeToDate(type).split("/");
  const year = new Date().getFullYear() - parseInt(time[2]);
  const month = new Date().getMonth() + 1 - parseInt(time[1]);
  const day = new Date().getDate() - parseInt(time[0]);
  console.log(year, month, day);
  return (
    year < 0 ||
    (year === 0 && month < 0) ||
    (year === 0 && month === 0 && day < 0)
  );
};
export default EventListItemComponent;
