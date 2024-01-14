"use client";

import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import { checkPhoneNumber, prismaDateToNextDate } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GeneralInformation from "../../../../(components)/(event)/(add)/GeneralInformation";
import TicketInformation, {
  TicketProps,
} from "../../../../(components)/(event)/(add)/TicketInformation";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useTicketOrganizer } from "@/hooks/useTicketOrganizer";
import { main_color } from "../../../../../../../../public/color";
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function EditEvent({ session, id }) {
  const userId = session?.user?.id;

  const { startUpload } = useUploadThing("imageUploader");
  const [startIndex, setStartIndex] = useState(-1);
  const [eventId, setEventId] = useState(-1);
  const [eventName, setEventName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventPosterFile, setEventPosterFile] = React.useState([]);
  const [defaultPoster, setDefaultPoster] = useState("");
  const [typeEventSelected, setTypeEventSelected] = React.useState("");
  const [contentValue, setContentValue] = useState("");
  const [ticketEvent, setTicketEvent] = useState<TicketProps[]>([]);
  const [ticketDropEvent, setTicketDropEvent] = useState<TicketProps[]>([]);
  const [canSubmit, setCanSubmit] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const { editEvent, fetchEventById } = useEventOrganizer();
  const { createNewTicket, editTicket, deleteTicket } = useTicketOrganizer();

  useEffect(() => {
    const fetchEventDetails = async () => {
      let ticketCopy: TicketProps[] = [];
      await fetchEventById(id).then((res) => {
        setTypeEventSelected(res?.ChuDeId);
        setAddressValue(res?.diaChi);
        setDefaultPoster(res?.hinhAnhSuKien);
        setEventId(res?.id);
        setContentValue(res?.moTa);
        setEventName(res?.name);
        setStartDate(prismaDateToNextDate(res?.ngayBatDau));
        setEndDate(prismaDateToNextDate(res?.ngayKetThuc));
        setTicketEvent(res?.ves);
        res?.ves.map((item, index) => {
          ticketCopy.push({
            id: item?.id,
            name: item?.name,
            moTa: item?.moTa,
            gia: item?.gia,
            mau: item?.mau,
            soLuong: item?.soLuong,
            soLuongToiThieu: item?.soLuongToiThieu,
            soLuongToiDa: item?.soLuongToiDa,
            ngayBan: prismaDateToNextDate(item?.ngayBan),
            ngayKetThuc: prismaDateToNextDate(item?.ngayKetThuc),
            SuKienId: item?.SuKienId,
            justCreated: false,
          });
          if (item?.id > startIndex) {
            setStartIndex(item?.id);
          }
          if (index === res?.ves.length - 1) {
            setTicketEvent(ticketCopy);
          }
        });
      });
    };
    fetchEventDetails();
  }, []);

  const onSubmit = () => {
    if (!addressValue || !eventName || !typeEventSelected || !contentValue) {
      toast.error("Vui lòng nhập tất cả thông tin");
      return;
    }
    if (startDate.getTime() >= endDate.getTime()) {
      toast.error("Ngày bắt đầu phải nằm sau ngày kết thúc sự kiện");
      return;
    }
    if (!canSubmit) {
      toast.error("Đang ở chế độ chỉnh sửa thông tin vé, vui lòng hoàn tất");
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
        processEditionEvent();
        return;
      }
    });
    if (ticketEvent.length === 0) {
      processEditionEvent();
    }
  };

  const processEditionEvent = async () => {
    setIsLoading(true);
    const [posterImage] = await Promise.all([
      startUpload([...eventPosterFile]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split("_")[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
    ]);
    const data = {
      id: eventId,
      name: eventName,
      moTa: contentValue,
      diaChi: addressValue,
      hinhAnhSuKien: posterImage ? posterImage[0]?.url : defaultPoster,
      ngayBatDau: startDate,
      ngayKetThuc: endDate,
      userId: userId,
      ChuDeId: parseInt(typeEventSelected),
      trangThai: "Đã duyệt",
    };
    await editEvent(data).then(() => {
      processingTicket().then(() => {
        setIsLoading(false);
        toast.success("Chỉnh sửa thành công");
        setTimeout(() => {
          //redirect
        }, 1000);
      });
    });
  };

  const processingTicket = async () => {
    console.log(ticketDropEvent, ticketEvent);
    ticketEvent.map(async (item) => {
      if (item.justCreated) {
        const data = {
          name: item.name,
          moTa: item.moTa,
          gia: item.gia,
          mau: item.mau,
          soLuong: item.soLuong,
          soLuongToiThieu: item.soLuongToiThieu,
          soLuongToiDa: item.soLuongToiDa,
          ngayBan: item.ngayBan,
          ngayKetThuc: item.ngayKetThuc,
          SuKienId: eventId,
        };
        await createNewTicket(data);
      } else if (!item.justCreated) {
        const data = {
          id: item.id,
          name: item.name,
          moTa: item.moTa,
          gia: item.gia,
          mau: item.mau,
          soLuong: item.soLuong,
          soLuongToiThieu: item.soLuongToiThieu,
          soLuongToiDa: item.soLuongToiDa,
          ngayBan: item.ngayBan,
          ngayKetThuc: item.ngayKetThuc,
          SuKienId: eventId,
        };
        await editTicket(data);
      }
    });
    ticketDropEvent.map(async (item) => {
      console.log(item);
      await deleteTicket(item.id).then((res) => console.log(res));
    });
  };
  return (
    <div className="relative min-h-[1032px]">
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
          defaultPoster,
          setIsLoading,
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
          eventId,
          startIndex,
        }}
      />
      <Button
        className={`w-full bg-[#3BE1AA] hover:bg-[#2DD196]  text-black font-semibold py-6 text-base`}
        radius="sm"
        onClick={onSubmit}
      >
        Hoàn thành chỉnh sửa
      </Button>
      {isLoading ? (
        <div className="w-full h-full flex justify-center bg-gray-200 z-10 absolute top-0">
          <CircularProgress
            color="success"
            aria-label="Loading..."
            classNames={{
              svg: "w-20 h-20 text-gray-600",
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
