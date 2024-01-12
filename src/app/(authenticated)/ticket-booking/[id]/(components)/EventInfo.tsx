import React from "react";

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
    <div className="w-full h-2/3 bg-[#17d1c6]">
      <div className="flex flex-col p-4 text-white">
        <p className="font-bold text-lg">{EventDetail.name}</p>
        <p>{EventDetail.diaChi}</p>
        <p>
          {convertUtcToGmtPlus7(EventDetail.ngayBatDau)} -{" "}
          {convertUtcToGmtPlus7(EventDetail.ngayKetThuc)}
        </p>
      </div>
    </div>
  );
}
