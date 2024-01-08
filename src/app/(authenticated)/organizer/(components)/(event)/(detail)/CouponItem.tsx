"use client";
import {
  convertDateTimeToDate,
  convertDateUIToDate,
  currencyFormat,
  prismaDateToNextDate,
} from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { CiEdit } from "react-icons/ci";
import { CouponModal } from "./CouponModal";
import { HiBan, HiOutlineTicket } from "react-icons/hi";
import { useDisclosure } from "@nextui-org/modal";
import { useVoucher } from "@/hooks/useVoucher";
export type CouponItem = {
  id: string;
  code: string;
  price: number;
  percent: number;
  start: Date;
  end: Date;
  ticketName: string;
  ticketId: number;
  state: string;
  trangThai: boolean;
};

export const CouponItemComponent = ({ props }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { editVoucher } = useVoucher();
  const unableOrAble = async (value) => {
    const data = {
      id: props.id,
      trangThai: value,
    };
    await editVoucher(data);

    props.setCouponList(
      props.couponList.map((item) =>
        item.id === props.id
          ? {
              id: item.id,
              code: props.code,
              price: props.price ? props.price : null,
              percent: props.percent ? props.percent : null,
              start: props.start,
              end: props.end,
              ticketName: props.ticketName,
              ticketId: props.ticketId,
              state: !value
                ? "Vô hiệu"
                : prismaDateToNextDate(props.end).getTime() >=
                  new Date().getTime()
                ? "Đang sử dụng"
                : "Hết hạn",
              trangThai: value,
            }
          : item
      )
    );
  };

  return (
    <>
      <CouponModal
        props={{
          isOpen,
          onOpen,
          onOpenChange,
          ticketList: props.ticketList,
          code: props.code,
          price: props.price,
          percent: props.percent,
          start: props.start,
          end: props.end,
          ticketId: props.ticketId,
          state: props.state,
          id: props.id,
          couponList: props.couponList,
          setCouponList: props.setCouponList,
          action: "edit",
        }}
      />
      <div className="grid grid-cols-5 md:grid-cols-7 shadow-md rounded-md px-12 py-4 mb-4 ">
        <div className="text-gray-600 text-sm flex align-middle items-center truncate p-1">
          {props.code}
        </div>
        <div className="text-gray-600 text-sm flex align-middle items-center truncate p-1">
          {props.price ? currencyFormat(props.price) : `${props.percent}%`}
        </div>
        <div className="text-gray-600 text-sm hidden md:flex align-middle items-center truncate p-1">
          {convertDateTimeToDate(prismaDateToNextDate(props.start))}
        </div>
        <div className="text-gray-600 text-sm hidden md:flex align-middle items-center truncate p-1">
          {convertDateTimeToDate(prismaDateToNextDate(props.end))}
        </div>
        <div className="text-gray-600 text-sm flex align-middle items-center truncate p-1">
          {props.ticketName}
        </div>
        <div className="text-gray-600 text-sm flex align-middle items-center truncate p-1">
          {props.state}
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          <div
            className="p-3 border-1 border-emerald-400 rounded-md h-12 w-12 transition ease-in-out hover:bg-white hover:scale-105 hover:shadow hover:text-emerald-400"
            onClick={onOpen}
          >
            <CiEdit className="w-6 h-6" />
          </div>
          {props.trangThai === true ? (
            <div className="p-3 border-1 border-red-400 rounded-md h-12 w-12 transition ease-in-out hover:bg-white hover:scale-105 hover:shadow hover:text-red-400">
              <HiBan className="w-6 h-6" onClick={() => unableOrAble(false)} />
            </div>
          ) : (
            <div className="p-3 border-1 border-blue-400 rounded-md h-12 w-12 transition ease-in-out hover:bg-white hover:scale-105 hover:shadow hover:text-blue-400">
              <HiOutlineTicket
                className="w-6 h-6"
                onClick={() => unableOrAble(true)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
