import { convertDateInUI } from "@/lib/utils";
import React from "react";
import { main_color } from "../../../../../../public/color";

function convertUtcToGmtPlus7(utcString) {
  const utcDate = new Date(utcString);
  const gmtPlus7Offset = 7 * 60;
  const localDate = new Date(utcDate.getTime() + gmtPlus7Offset * 60 * 1000);
  const formattedDate = localDate
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d+Z$/, "");
  return formattedDate;
}

export function EventInfo({ EventDetail }) {
  return (
    <div className="w-full h-2/3 bg-white shadow">
      <div className="flex flex-col p-4 text-white gap-1">
        <p className="font-bold text-black text-lg">{EventDetail.name}</p>
        <p className={`text-sm text-[#2DD196] font-semibold`}>
          {EventDetail.diaChi}
        </p>
        <p className="text-sm text-gray-400">
          Bắt đầu từ ngày {convertDateInUI(EventDetail.ngayBatDau)}{" "}
          {" đến ngày "}
          {convertDateInUI(EventDetail.ngayKetThuc)}
        </p>
      </div>
    </div>
  );
}
