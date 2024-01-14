/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { useEvent } from "@/hooks/useEvent";
import { useQuery } from "@tanstack/react-query";
import { Divider, Image } from "@nextui-org/react";
import { ClockIcon, PhoneIcon } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
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
import {
  accent_color,
  hover_color,
  main_color,
} from "../../../../../../public/color";
import { FaCalendarDays } from "react-icons/fa6";
import { convertDateInUI } from "@/lib/utils";
import { useCategory } from "@/hooks/useCategory";
import { MdOutlineMailOutline } from "react-icons/md";

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
  const { fetchAllCategories } = useCategory();
  const [cateList, setCateList] = useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [currentDateTime, setCurrentDateTime] = React.useState("");

  const { data: EventDetail } = useQuery({
    queryKey: ["EventDetail", id],
    queryFn: async () => {
      const res = await fetchEventById(id);
      setIsLoading(true);
      console.log(res?.[0]);
      return res?.[0];
    },
    onError: (err) => {
      setIsError(true);
    },
  });

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone/Asia/Bangkok")
      .then((response) => response.json())
      .then((data) => {
        setCurrentDateTime(data.utc_datetime);
      });
    const fetchCate = async () => {
      await fetchAllCategories().then((res) => {
        setCateList(res);
      });
    };
    fetchCate();
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
          <div className="px-3 lg:px-12 xl:px-28 bg-black w-full hidden lg:flex lg:flex-row lg:justify-between">
            {cateList?.map((item) => (
              <div key={item.id}>
                <Link
                  href={`/search/?category=${item.id}`} //url search
                  className={`flex items-center p-6 text-white hover:text-[#3BE1AA]`}
                >
                  <span className="text-sm text-center">{item.name}</span>
                </Link>
              </div>
            ))}
          </div>
          <div className="w-full md:h-3/5">
            <div
              style={{
                background:
                  "linear-gradient(to bottom, rgb(37, 37, 40) 28.04%, rgb(0, 0, 0) 100%)",
              }}
            >
              <div className="px-3 lg:px-12 xl:px-28 py-3 lg:py-8 flex flex-col lg:flex-row h-full">
                <div className="lg:basis-2/3 rounded-t-md lg:rounded-r-[24px] overflow-hidden">
                  <img
                    src={EventDetail?.hinhAnhSuKien}
                    alt="hinhAnhSuKien"
                    className="w-full h-full rounded-none object-center object-cover"
                  ></img>
                </div>
                <div className="lg:basis-1/3 order-last lg:order-first relative h-fit lg:h-[320px]">
                  <div className="lg:px-8 px-4 pb-10 pt-10 flex flex-col h-full shadow rounded-b-md lg:rounded-l-[24px] bg-[#2A2D34] lg:bg-[#38383D] relative">
                    <h1 className="text-base xl:text-xl font-bold text-white">
                      {EventDetail?.name}
                    </h1>
                    <div
                      className={`pt-3 lg:pt-4 xl:pt-6 flex flex-row text-[#3BE1AA] font-semibold`}
                    >
                      <FaCalendarDays className="mt-1 text-white h-4 w-4" />
                      {convertUtcToGmtPlus7(EventDetail?.ngayBatDau) !=
                      convertUtcToGmtPlus7(EventDetail?.ngayKetThuc) ? (
                        <div className="ml-2 text-sm">
                          {"Từ ngày "}
                          {convertDateInUI(EventDetail?.ngayBatDau)}{" "}
                          {" đến ngày "}
                          {convertDateInUI(EventDetail?.ngayKetThuc)}
                        </div>
                      ) : null}
                      {convertUtcToGmtPlus7(EventDetail?.ngayBatDau) ==
                      convertUtcToGmtPlus7(EventDetail?.ngayKetThuc) ? (
                        <div className="ml-2 text-sm">
                          {"Duy nhất ngày "}
                          {convertDateInUI(EventDetail?.ngayBatDau)}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className={`pt-3 lg:pt-4 xl:pt-6 flex flex-row text-[#17d1c6] font-semibold`}
                    >
                      <FaLocationDot className="mt-1 text-white w-6 h-6" />
                      <div className="ml-2 text-xs text-[#c4c4cf]">
                        {EventDetail?.diaChi}
                      </div>
                    </div>
                    <Divider className="my-4 bg-[#c4c4cf]" />

                    {/* Center button on mobile and push it to the right on larger screens */}

                    <a
                      href={`/ticket-booking/${EventDetail.id}`}
                      className={`w-full font-semibold bg-[#3BE1AA] hover:bg-[#2DD196] transition ease-in-out hover:scale-105 active:scale-[0.96] text-black text-center py-2 text-sm rounded-md`}
                    >
                      Đặt vé ngay
                    </a>
                  </div>
                  <svg
                    width="4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute -right-[2px] top-0 h-full hidden lg:block"
                  >
                    <path
                      stroke="#27272A"
                      stroke-width="4"
                      stroke-linecap="round"
                      stroke-dasharray="4 10"
                      d="M2 2v411"
                    ></path>
                  </svg>
                  <div className="w-[60px] h-[60px] bg-[#252528] rounded-full absolute -top-[30px] -right-[30px] hidden lg:block"></div>
                  <div className="w-[60px] h-[60px] bg-[#020203] rounded-full absolute -bottom-[30px] -right-[30px] hidden lg:block"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto md:px-8 px-4 flex flex-row mt-4">
            {/* Content for the container */}
            <div className="w-full h-full md:w-2/3">
              <div className="mt-4 mb-8 w-full rounded-xl bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Về sự kiện</div>
                </div>
                <div className="mt-4 text-gray-600 text-[14px]">
                  <div
                    className="mt-2 text-medium text-ellipsis overflow-hidden"
                    style={{ whiteSpace: "pre-line" }}
                    dangerouslySetInnerHTML={{ __html: `${EventDetail?.moTa}` }}
                  ></div>
                </div>
              </div>

              <div className="mt-8 mb-8 w-full rounded-xl overflow-hidden text-white bg-[#27272A] border-[1px] shadow">
                <div className="px-8 py-4 flex flex-row justify-between flex-wrap">
                  <div className="text-white font-semibold">Thông tin vé</div>
                </div>
                <Divider className="bg-black" />
                <div className="text-white text-[14px]">
                  <Accordion type="single" collapsible className="w-full">
                    {EventDetail?.ves.length == 0 ? (
                      <div className="py-3 pl-8">
                        Hiện sự kiện này chưa có vé nào được tạo.
                      </div>
                    ) : null}
                    {EventDetail?.ves.map((item, index) => (
                      <AccordionItem
                        value={item.id}
                        key={`item-${item.id}`}
                        className={`${
                          index % 2 !== 0 ? "bg-[#2E2F32]" : "bg-[#37373C]"
                        } border-b-0`}
                      >
                        <AccordionTrigger className="cursor-pointer flex justify-between">
                          <div className="flex flex-col px-8">
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

                          <p className={`font-bold pr-8 text-[#3BE1AA]`}>
                            {formatCurrency(item.gia)}
                          </p>
                        </AccordionTrigger>
                        <AccordionContent>
                          {/* <p
                            dangerouslySetInnerHTML={{
                              __html: `${item?.moTa}`,
                            }}
                          ></p> */}
                          <div
                            className="pl-8 mt-2 text-medium text-ellipsis overflow-hidden"
                            style={{ whiteSpace: "pre-line" }}
                            dangerouslySetInnerHTML={{
                              __html: `${item?.moTa}`,
                            }}
                          ></div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              <div className="mt-8 mb-8 w-full rounded-xl bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Nhà tổ chức</div>
                </div>

                {EventDetail?.user?.loaiHinhKinhDoanh === "1" ? (
                  <div className="mt-4 text-gray-600 text-[14px] flex flex-row">
                    <div>
                      <Image
                        src={EventDetail?.user?.avatar}
                        width={100}
                        height={100}
                        alt={"Organizer Avatar"}
                      ></Image>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-bold">
                        {EventDetail?.user?.hoTenOrganizer}
                      </p>
                      <div className="mt-1 flex flex-row">
                        <PhoneIcon size={18} />
                        <p className="ml-2">{EventDetail?.user?.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-gray-600 text-[14px] flex flex-row">
                    <div>
                      <Image
                        src={EventDetail?.user?.anhDaiDienToChuc}
                        width={100}
                        height={100}
                        alt={"Organizer Avatar"}
                      ></Image>
                    </div>
                    <div className="ml-4">
                      <p className={`text-lg font-semibold text-[#2DD196]`}>
                        {EventDetail?.user?.tenDoanhNghiep}
                      </p>
                      <div className="mt-1 flex flex-row items-center">
                        <PhoneIcon size={12} />
                        <p className="ml-2 text-sm font-semibold">
                          {EventDetail?.user?.phoneNumber}
                        </p>
                      </div>
                      <div className="mt-1 flex flex-row items-center">
                        <MdOutlineMailOutline size={12} />
                        <p className="ml-2 text-gray-400 text-sm">
                          {EventDetail?.user?.email}
                        </p>
                      </div>
                      <div className="mt-1 flex flex-row items-center">
                        <IoLocationOutline size={12} />
                        <p className="ml-2 text-gray-600 text-sm">
                          {EventDetail?.user?.diaChi}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Side bar for the container */}
            <a
              className="w-1/3 ml-10  mt-4  hidden md:block h-[270px]"
              href="/search"
            >
              <img src="/khamphangay.png" alt="" className="rounded-xl" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
