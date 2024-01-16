"use client";

import { currencyFormat } from "@/lib/utils";
import { IoTicketOutline } from "react-icons/io5";
import { main_color } from "../../../../../../../public/color";

export type GuestItem = {
  id: string;
  color: string;
  guest: string;
  ticketId: number;
  ticketName: string;
  amount: number;
  price: number;
};

export const GuestItemComponent = ({ props }) => {
  return (
    <div className="grid grid-cols-6 shadow-md rounded-md px-12 py-4 mb-4 transition ease-in-out hover:scale-[101%]">
      <div className={`p-3 border-1 border-[#2DD196] rounded-md h-12 w-12`}>
        <IoTicketOutline className="h-6 w-6" color={props.color} />
      </div>
      <div className="text-gray-600 text-sm flex align-middle items-center">
        {props.guest}
      </div>
      <div className="text-gray-600 text-sm flex align-middle items-center">
        #{props.ticketId}
      </div>
      <div className="text-gray-600 text-sm flex align-middle items-center">
        {props.ticketName}
      </div>
      <div className="text-gray-600 text-sm flex align-middle items-center">
        {props.amount}
      </div>
      <div className="text-gray-600 text-sm flex align-middle items-center">
        {currencyFormat(props.price)}
      </div>
    </div>
  );
};
