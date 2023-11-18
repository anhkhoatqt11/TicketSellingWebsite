"use client";

import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import { checkPhoneNumber, prismaDateToNextDate } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { CircularProgress, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GeneralInformation from "../../../../(components)/(event)/(add)/GeneralInformation";
import TicketInformation, {
  TicketProps,
} from "../../../../(components)/(event)/(add)/TicketInformation";
import { useTicketOrganizer } from "@/hooks/useTicketOrganizer";
import { FcSportsMode } from "react-icons/fc";
import {
  GuestItem,
  GuestItemComponent,
} from "@/app/(authenticated)/organizer/(components)/(event)/(detail)/GuestItem";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import * as XLSX from "xlsx";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function GuestList({ session, id }) {
  const userId = 1;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [eventName, setEventName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [type, setType] = useState("");
  const [guestList, setGuestList] = useState<GuestItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEventAngGuestListById } = useEventOrganizer();
  const [searchKey, setSearchKey] = useState("");
  const [copyList, setCopyList] = useState<GuestItem[]>([]);
  try {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchSubmit();
    });
  } catch (except) {}
  const searchSubmit = () => {
    setGuestList(
      copyList.filter((item) =>
        item.guest.toLowerCase().includes(searchKey.toLowerCase())
      )
    );
  };

  const onCreateExcelList = () => {
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(guestList);
    XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
    XLSX.writeFile(wb, `${eventName}_Danh sách khán giả.xlsx`);
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      let ticketCopy: TicketProps[] = [];
      await fetchEventAngGuestListById(id).then((res) => {
        setAddressValue(res?.diaChi);
        setEventName(res?.name);
        console.log(res);
        setType(res.ChuDe?.name);
        let copyGuestList: GuestItem[] = [];
        res.ves?.map((item, index) => {
          const color = item?.mau;
          const mave = item?.id;
          const loaive = item?.name;
          item?.HoaDonVe?.map((item2) => {
            const name = item2?.hoaDon?.user?.name;
            const soLuong = item2?.soLuong;
            const tongGia = item2?.tongGia;
            const id = `${color}-${mave}-${name}-${tongGia}`;
            copyGuestList.push({
              id: id,
              color: color,
              guest: name,
              ticketId: mave,
              ticketName: loaive,
              amount: soLuong,
              price: tongGia,
            });
          });
          if (index === res.ves?.length - 1) {
            setGuestList(copyGuestList);
            setCopyList(copyGuestList);
            setIsLoading(false);
          }
        });
      });
    };
    fetchEventDetails();
  }, []);

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
                <p>Bạn có chắc chắn muốn tải bản excel danh sách khán giả ?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  variant="light"
                  onPress={() => {
                    onClose();
                    onCreateExcelList();
                  }}
                >
                  Tạo
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
        <div className="mt-6">
          <h1 className="font-semibold text-2xl">{eventName}</h1>
          <h1 className="text-gray-600">{addressValue}</h1>
          <h1 className="text-base text-emerald-400 mt-3 flex flex-row gap-2">
            <FcSportsMode className="mt-1" />
            {type}
          </h1>
          <Divider className="my-4 mt-6" />
        </div>
        <h1 className="w-full text-center my-2 text-xl font-medium">
          Danh sách khán giả
        </h1>
        <div className="rounded-md bg-white p-4">
          <Button onClick={onOpen}>Xuất danh sách thành file excel</Button>
          <h1 className="w-full text-left mt-2 text-sm text-emerald-500">
            Để đảm bảo thông tin khách hàng, trường email và số điện thoại sẽ bị
            ẩn
          </h1>
        </div>
        <div className="w-full py-6 flex justify-end flex-row">
          <Input
            className="h-[52px] w-full md:w-[360px]"
            variant="bordered"
            radius="sm"
            label="Nhập tên khán giả..."
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <Button
            className="h-[52px] w-[0px] rounded-md m-0 p-0 -ml-[50px] min-w-unit-12 bg-transparent"
            onClick={searchSubmit}
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-emerald-400" />
          </Button>
        </div>
        <div className="w-full px-12 grid grid-cols-6 text-sm lg:text-base font-semibold mt-6 ">
          <div>*</div>
          <div>Họ tên</div>
          <div>Mã vé</div>
          <div>Loại vé</div>
          <div>Số lượng</div>
          <div>Tổng giá</div>
        </div>
        <Divider className="my-4" />
        <div>
          {guestList.length === 0 ? (
            <div className="text-gray-800 text-lg font-medium">
              Hiện tại chưa có khán giả nào
            </div>
          ) : null}
          {guestList.map((item) => (
            <GuestItemComponent
              key={item.id}
              props={{
                color: item.color,
                guest: item.guest,
                ticketId: item.ticketId,
                ticketName: item.ticketName,
                amount: item.amount,
                price: item.price,
              }}
            ></GuestItemComponent>
          ))}
        </div>
        {isLoading ? (
          <div className="w-full h-full flex justify-center bg-gray-200 z-10 absolute top-0">
            <CircularProgress
              color="success"
              aria-label="Loading..."
              classNames={{
                svg: "w-28 h-28 drop-shadow-md",
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
