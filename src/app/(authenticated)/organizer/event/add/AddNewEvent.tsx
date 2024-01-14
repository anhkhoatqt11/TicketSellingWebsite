"use client";

import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import { checkPhoneNumber } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GeneralInformation from "../../(components)/(event)/(add)/GeneralInformation";
import TicketInformation, {
  TicketProps,
} from "../../(components)/(event)/(add)/TicketInformation";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useTicketOrganizer } from "@/hooks/useTicketOrganizer";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { main_color } from "../../../../../../public/color";
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export function AddNewEvent({ session }) {
  const userId = session?.user?.id;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { startUpload } = useUploadThing("imageUploader");
  const [startIndex, setStartIndex] = useState(1);
  const [eventId, setEventId] = useState(-1);
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

  const [isLoading, setIsLoading] = useState(false);
  const { createNewEvent } = useEventOrganizer();
  const { createNewTicket } = useTicketOrganizer();
  const route = useRouter();

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
        processCreationEvent();
        return;
      }
    });
    if (ticketEvent.length === 0) {
      processCreationEvent();
    }
  };

  const processCreationEvent = async () => {
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
      name: eventName,
      moTa: contentValue,
      diaChi: addressValue,
      hinhAnhSuKien: posterImage ? posterImage[0]?.url : null,
      ngayBatDau: startDate,
      ngayKetThuc: endDate,
      userId: userId,
      ChuDeId: parseInt(typeEventSelected),
      trangThai: "Đã duyệt",
    };
    await createNewEvent(data).then((res) => {
      processingTicket(res?.id).then(() => {
        setIsLoading(false);
        toast.success("Sự kiện được tạo thành công");
        setTimeout(() => {
          route.push("/organizer/event");
        }, 1000);
      });
    });
  };

  const processingTicket = async (id) => {
    ticketEvent.map(async (item) => {
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
        SuKienId: id,
      };
      await createNewTicket(data);
    });
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Xác nhận
              </ModalHeader>
              <ModalBody>
                <p>
                  Sự kiện đã tạo sẽ không thể xóa. Bạn có chắc chắn muốn tạo sự
                  kiện này
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  variant="light"
                  onPress={() => {
                    onClose();
                    onSubmit();
                  }}
                >
                  Tạo sự kiện
                </Button>
                <Button color="primary" onPress={onClose}>
                  Hủy
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
          className={`w-full bg-[#3BE1AA] text-black hover:bg-[#2DD196] font-semibold py-6 text-base`}
          radius="sm"
          onClick={onOpen}
        >
          Tạo sự kiện
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
    </>
  );
}
