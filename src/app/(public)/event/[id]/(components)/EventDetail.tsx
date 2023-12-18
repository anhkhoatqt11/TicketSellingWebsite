"use client";

import React, { useEffect } from "react";
import { useEvent } from "@/hooks/useEvent";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@nextui-org/react";
import { ClockIcon, PhoneIcon } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { parseJSON } from "date-fns";
import { ChevronDownIcon } from "@radix-ui/react-icons";

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}

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

function getHoursFromDateString(inputDateString: string): number {
  const parsedDate = new Date(inputDateString);
  return parsedDate.getUTCHours();
}

export function EventDetail({ id }) {
  const { fetchEventById } = useEvent();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [currentDateTime, setCurrentDateTime] = React.useState("");

  const { data: EventDetail } = useQuery({
    queryKey: ["EventDetail", id],
    queryFn: async () => {
      const res = await fetchEventById(id);
      setIsLoading(true);
      return res?.[0];
    },
    onError: (err) => {
      setIsError(true);
    },
  });

  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone/Asia/Bangkok")
      .then((response) => response.json())
      .then((data) => {
        setCurrentDateTime(data.utc_datetime);
      });
  }, []);

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <p>Sự kiện bạn tìm kiếm không tồn tại</p>
        <Link href="/">
          <Button className="ml-4">Quay lại</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-slate-50">
      {!isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="w-full md:h-2/5">
            <Image
              src={EventDetail?.hinhAnhSuKien}
              width={1920}
              height={512}
              alt="hinhAnhSuKien"
              className="w-full h-full rounded-none"
            ></Image>
            <div className="bg-white md:px-[180px] px-4 pb-10 pt-10 flex flex-col md:flex-row border-[1px] shadow">
              <div className="md:w-1/2">
                <h1 className="text-xl font-bold">{EventDetail?.name}</h1>
                <div className="pt-3 flex flex-row">
                  <ClockIcon size={18} className="mt-1" />
                  {convertUtcToGmtPlus7(EventDetail?.ngayBatDau) !=
                  convertUtcToGmtPlus7(EventDetail?.ngayKetThuc) ? (
                    <p className="ml-2">
                      {convertUtcToGmtPlus7(EventDetail?.ngayBatDau)} -{" "}
                      {convertUtcToGmtPlus7(EventDetail?.ngayKetThuc)}
                    </p>
                  ) : null}
                  {convertUtcToGmtPlus7(EventDetail?.ngayBatDau) ==
                  convertUtcToGmtPlus7(EventDetail?.ngayKetThuc) ? (
                    <p className="ml-2">
                      {convertUtcToGmtPlus7(EventDetail?.ngayBatDau)}
                    </p>
                  ) : null}
                </div>
                <div className="pt-3 flex flex-row">
                  <IoLocationOutline size={18} className="mt-1" />
                  <p className="ml-2">{EventDetail?.diaChi}</p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center md:justify-end mt-10">
                {" "}
                {/* Center button on mobile and push it to the right on larger screens */}
                <Link href={`/ticket-booking/${EventDetail.id}`}>
                  <Button className="w-full md:w-[340px] font-bold bg-blue-700 hover:bg-amber-300 hover:text-black">
                    Đặt vé ngay
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="container mx-auto md:px-[180px] px-4 flex flex-row mt-4">
            {/* Content for the container */}
            <div className="w-full h-full md:w-2/3">
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Về sự kiện</div>
                </div>
                <div
                  className="mt-4 text-gray-600 text-[14px]"
                  dangerouslySetInnerHTML={{ __html: `${EventDetail?.moTa}` }}
                ></div>
              </div>

              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">
                    Thông tin vé
                  </div>
                </div>
                <div className="mt-4 text-gray-600 text-[14px]">
                  <Accordion type="single" collapsible className="w-full">
                    {EventDetail?.ves.map((item) => (
                      <AccordionItem value={item.id} key={`item-${item.id}`}>
                        <AccordionTrigger className="cursor-pointer flex justify-between">
                          <div className="flex flex-col">
                            <p className="flex flex-row">
                              {item.name}
                              <ChevronDownIcon className="h-4 w-4 ml-1 shrink-0 text-muted-foreground transition-transform duration-200" />
                            </p>
                            {Date.parse(item.ngayBan) >
                              Date.parse(currentDateTime) &&
                            item.soLuong != 0 ? (
                              <div className="border border-gray-500 p-2 mt-3">
                                <p>VÉ SẮP MỞ BÁN</p>
                              </div>
                            ) : null}
                            {Date.parse(item.ngayKetThuc) <
                              Date.parse(currentDateTime) &&
                            item.soLuong != 0 ? (
                              <div className="border border-gray-500 p-2 mt-3">
                                <p>VÉ HẾT THỜI HẠN</p>
                              </div>
                            ) : null}
                            {item.soLuong == 0 ? (
                              <div className="border border-gray-500 p-2 mt-3">
                                <p>VÉ SỰ KIỆN ĐÃ HẾT</p>
                              </div>
                            ) : null}
                          </div>

                          <p className="font-bold">
                            {formatCurrency(item.gia)}
                          </p>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>{item.moTa}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Nhà tổ chức</div>
                </div>
                <div className="mt-4 text-gray-600 text-[14px] flex flex-row">
                  <div>
                    <Image
                      src={EventDetail?.user?.avatar}
                      width={100}
                      height={100}
                    ></Image>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-bold">
                      {EventDetail?.user?.name}
                    </p>
                    <div className="mt-1 flex flex-row">
                      <PhoneIcon size={18} />
                      <p className="ml-2">{EventDetail?.user?.phoneNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Side bar for the container */}
            <div className="w-1/3 ml-10 h-[250px] sticky top-0 hidden md:block">
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="font-semibold">{EventDetail?.name}</div>
                  <div className="pt-3 flex flex-row">
                    <ClockIcon size={18} className="mt-1" />
                    {convertUtcToGmtPlus7(EventDetail?.ngayBatDau) !=
                    convertUtcToGmtPlus7(EventDetail?.ngayKetThuc) ? (
                      <p className="ml-2">
                        {convertUtcToGmtPlus7(EventDetail?.ngayBatDau)} -{" "}
                        {convertUtcToGmtPlus7(EventDetail?.ngayKetThuc)}
                      </p>
                    ) : null}
                    {convertUtcToGmtPlus7(EventDetail?.ngayBatDau) ==
                    convertUtcToGmtPlus7(EventDetail?.ngayKetThuc) ? (
                      <p className="ml-2">
                        {convertUtcToGmtPlus7(EventDetail?.ngayBatDau)}
                      </p>
                    ) : null}
                  </div>
                  <div className="pt-3 flex flex-row">
                    <IoLocationOutline size={18} className="mt-1" />
                    <p className="ml-2">{EventDetail?.diaChi}</p>
                  </div>
                  <div className="flex justify-center md:justify-end mt-10">
                    {" "}
                    {/* Center button on mobile and push it to the right on larger screens */}
                    <Link href={`/ticket-booking/${EventDetail.id}`}>
                      <Button className="w-full bg-emerald-500">
                        Đặt vé ngay
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
