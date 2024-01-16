"use client";

import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import { checkPhoneNumber, prismaDateToNextDate } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { CircularProgress, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { TicketProps } from "../../../../(components)/(event)/(add)/TicketInformation";
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
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import OutsideIcon from "@/components/outside";
import * as XLSX from "xlsx";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
const getIconById = (id) => {
  switch (id) {
    case 1:
      return <OutsideIcon className={"mt-1 w-4 h-4"} />;
    case 2:
      return <LiveMusic className={"mt-1 w-4 h-4"} />;
    case 3:
      return <StageIcon className={"mt-1 w-4 h-4"} />;
    case 4:
      return <NightLifeIcon className={"mt-1 w-4 h-4"} />;
    case 5:
      return <ConferenceIcon className={"mt-1 w-4 h-4"} />;
    case 6:
      return <CourseIcon className={"mt-1 w-4 h-4"} />;
    case 7:
      return <TourismIcon className={"mt-1 w-4 h-4"} />;
    case 8:
      return <SportIcon className={"mt-1 w-4 h-4"} />;
    default:
      return null;
  }
};

export function GuestList({ session, id }) {
  const userId = session?.user?.id;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [eventName, setEventName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [type, setType] = useState("");
  const [typeId, setTypeId] = useState();
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
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          "ID",
          "Màu vé",
          "Họ và tên",
          "Mã vé",
          "Tên vé",
          "Số lượng",
          "Thành tiền",
        ],
      ],
      {
        origin: "A1",
      }
    );
    const max_width = guestList.reduce((w, r) => Math.max(w, r.id.length), 10);
    const max_width2 = guestList.reduce(
      (w, r) => Math.max(w, r.color.length),
      10
    );
    const max_width3 = guestList.reduce(
      (w, r) => Math.max(w, r.guest.length),
      10
    );
    const max_width4 = guestList.reduce(
      (w, r) => Math.max(w, r.ticketId.toString().length),
      10
    );
    const max_width5 = guestList.reduce(
      (w, r) => Math.max(w, r.ticketName.length),
      10
    );
    const max_width6 = guestList.reduce(
      (w, r) => Math.max(w, r.amount.toString().length),
      10
    );
    const max_width7 = guestList.reduce(
      (w, r) => Math.max(w, r.price.toString().length),
      10
    );

    ws["!cols"] = [
      { wch: max_width },
      { wch: max_width2 },
      { wch: max_width3 },
      { wch: max_width4 },
      { wch: max_width5 },
      { wch: max_width6 },
      { wch: max_width7 },
    ];

    XLSX.utils.book_append_sheet(wb, ws, "Guest List");
    XLSX.writeFile(wb, `${eventName}_Danh sách khán giả.xlsx`);
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      let ticketCopy: TicketProps[] = [];
      await fetchEventAngGuestListById(id).then((res) => {
        setAddressValue(res?.diaChi);
        setEventName(res?.name);
        setTypeId(res?.ChuDe?.id);
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
          <h1
            className={`text-base font-medium text-[#2DD196] mt-1 flex flex-row gap-2`}
          >
            {getIconById(typeId)}
            {type}
          </h1>
          <Divider className="my-4 mt-6" />
        </div>
        <h1 className="w-full text-center my-2 text-xl font-medium">
          Danh sách khán giả
        </h1>
        <div className="rounded-md bg-white p-4">
          <Button
            onClick={onOpen}
            radius="sm"
            className="bg-gray-100 transition ease-in-out hover:scale-105"
          >
            Xuất danh sách thành file excel
          </Button>
          <h1 className={`w-full text-left mt-2 text-sm text-[#2DD196]`}>
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
            <MagnifyingGlassIcon className={`h-6 w-6 text-[#2DD196]`} />
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
                svg: "w-20 h-20 text-gray-600",
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
