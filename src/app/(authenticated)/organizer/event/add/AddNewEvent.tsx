"use client";

import { checkPhoneNumber } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import GeneralInformation from "../../(components)/(event)/(add)/GeneralInformation";
import TicketInformation, {
  TicketProps,
} from "../../(components)/(event)/(add)/TicketInformation";

export function AddNewEvent({ session }) {
  const [eventName, setEventName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventPosterFile, setEventPosterFile] = React.useState([]);
  const [typeEventSelected, setTypeEventSelected] = React.useState("");
  const [contentValue, setContentValue] = useState("");
  const [ticketEvent, setTicketEvent] = useState<TicketProps[]>([]);
  const [ticketDropEvent, setTicketDropEvent] = useState<TicketProps[]>([]);
  const [canSubmit, setCanSubmit] = useState(true);

  const onSubmit = () => {
    if (eventPosterFile.length <= 0) {
      toast.error("Sự kiện bắt buộc phải có ảnh bìa");
      return;
    }
    if (!addressValue || !eventName || !typeEventSelected || !contentValue) {
      toast.error("Vui lòng nhập tất cả thông tin");
      return;
    }
    if (startDate.getTime() >= endDate.getTime()) {
      toast.error("Ngày bắt đầu phải nằm sau ngày kết thúc sự kiện");
      return;
    }
    if (!canSubmit) {
      toast.error("Vui lòng hoàn thành thông tin vé sự kiện");
      return;
    }
    ticketEvent.map((item, index) => {
      if (
        !item.name ||
        !item.moTa ||
        !item.gia ||
        !item.soLuong ||
        !item.soLuongToiDa ||
        !item.soLuongToiThieu ||
        !checkPhoneNumber(item.gia.toString()) ||
        !checkPhoneNumber(item.soLuong.toString()) ||
        !checkPhoneNumber(item.soLuongToiDa.toString()) ||
        !checkPhoneNumber(item.soLuongToiThieu.toString()) ||
        item.ngayBan.getTime() >= item.ngayKetThuc.getTime()
      ) {
        toast.error(
          `Vé thứ ${index + 1} đang bị lỗi dữ liệu, vui lòng kiểm tra lại !`
        );
        return;
      } else if (index === ticketEvent.length - 1) {
        console.log("ok");
      }
    });
  };
  return (
    <>
      <GeneralInformation
        props={{
          eventName,
          setEventName,
          addressValue,
          setAddressValue,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          eventPosterFile,
          setEventPosterFile,
          typeEventSelected,
          setTypeEventSelected,
          contentValue,
          setContentValue,
        }}
      />
      <TicketInformation
        props={{
          ticketEvent,
          setTicketEvent,
          ticketDropEvent,
          setTicketDropEvent,
          canSubmit,
          setCanSubmit,
        }}
      />
      <Button
        className="bg-emerald-500 text-white w-full border-1"
        radius="sm"
        onClick={onSubmit}
      >
        Tạo sự kiện
      </Button>
    </>
  );
}
