"use client";

import { Label } from "@/components/ui/label";
import { Button, Divider, Input, select, Textarea } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { DatePicker } from "@/components/ui/date-picker";
import { IoTicketOutline } from "react-icons/io5";
import { toast } from "react-hot-toast";
import { checkPhoneNumber, prismaDateToNextDate } from "@/lib/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { main_color } from "../../../../../../../public/color";

export type TicketProps = {
  id: number;
  name: string;
  moTa: string;
  gia: number;
  mau: string;
  soLuong: number;
  soLuongToiThieu: number;
  soLuongToiDa: number;
  ngayBan: Date;
  ngayKetThuc: Date;
  SuKienId: number;
  justCreated: boolean;
};

function TicketInformation({ props }) {
  const [startId, setStartId] = useState(0);
  const [colorTicket, setColorTicket] = useState("#ff0000");
  const [newEventName, setNewEventName] = useState("");
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startSale, setStartSale] = useState(new Date());
  const [endSale, setEndSale] = useState(new Date());
  const [ticketPrice, setTicketPrice] = useState("15000");
  const [totalCount, setTotalCount] = useState("10");
  const [minimun, setMinimun] = useState("1");
  const [maximum, setMaximum] = useState("10");
  const [justCreated, setJustCreated] = useState(true);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deletedId, setDeletedId] = useState();

  const addNewEvent = () => {
    if (isEditing) {
      toast.error("Vui lòng hoàn thành vé đang chỉnh sửa");
      return;
    }
    props.setTicketEvent([
      ...props.ticketEvent,
      {
        id: startId + 1 + props.startIndex,
        name: newEventName,
        moTa: "",
        gia: 15000,
        mau: "#ff0000",
        soLuong: 10,
        soLuongToiThieu: 1,
        soLuongToiDa: 10,
        ngayBan: new Date(),
        ngayKetThuc: new Date(),
        justCreated: true,
        SuKienId: props.eventId,
      },
    ]);
    setStartId((prev) => prev + 1);
    setNewEventName("");
  };

  const saveTicketContent = () => {
    if (isEditing) {
      if (
        !eventName ||
        !description ||
        !ticketPrice ||
        !totalCount ||
        !minimun ||
        !maximum
      ) {
        toast.error("Thông tin vé đang bị thiếu");
        return;
      }
      if (startSale.getTime() >= endSale.getTime()) {
        toast.error("Ngày bắt đầu bán phải nằm sau ngày kết thúc bán vé");
        return;
      }
      if (!checkPhoneNumber(ticketPrice)) {
        toast.error("Sai định dạng giá vé, vui lòng nhập lại");
        return;
      }
      if (!checkPhoneNumber(totalCount)) {
        toast.error("Sai định dạng số lượng vé, vui lòng nhập lại");
        return;
      }
      if (!checkPhoneNumber(minimun)) {
        toast.error("Sai định dạng số lượng vé tối thiểu, vui lòng nhập lại");
        return;
      }
      if (!checkPhoneNumber(maximum)) {
        toast.error("Sai định dạng số lượng vé tối đa, vui lòng nhập lại");
        return;
      }
      setIsEditing(false);
      props.setCanSubmit(true);
      props.setTicketEvent(
        props.ticketEvent.map((item) =>
          item.id === parseInt(selectedKeys.currentKey)
            ? {
                ...item,
                name: eventName,
                moTa: description,
                gia: parseInt(ticketPrice),
                mau: colorTicket,
                soLuong: parseInt(totalCount),
                soLuongToiThieu: parseInt(minimun),
                soLuongToiDa: parseInt(maximum),
                ngayBan: startSale,
                ngayKetThuc: endSale,
              }
            : item
        )
      );
      toast.success("Đã sửa thông tin vé, vui lòng tiếp tục quá trình");
    }
  };

  const deleteTicketContent = () => {
    var item = props.ticketEvent.filter((item) => item.id === deletedId);
    if (
      !item[0].justCreated &&
      item[0].ngayBan.getTime() <= new Date().getTime()
    ) {
      toast.error("Vé đã bắt đầu được bán, không thể xóa");
      setIsEditing(false);
      return;
    }
    try {
      props.setTicketEvent(
        props.ticketEvent?.filter((item) => item.id !== deletedId)
      );
    } catch (except) {}
    if (!item[0]?.justCreated) {
      props.setTicketDropEvent([
        ...props.ticketDropEvent,
        {
          id: deletedId,
        },
      ]);
    }
  };

  useEffect(() => {
    if (isEditing) {
      props.ticketEvent.map((item) => {
        if (item.id === parseInt(selectedKeys.currentKey)) {
          setEventName(item.name);
          setDescription(item.moTa);
          setStartSale(item.ngayBan);
          setEndSale(item.ngayKetThuc);
          setColorTicket(item.mau);
          setTicketPrice(item.gia.toString());
          setTotalCount(item.soLuong.toString());
          setMinimun(item.soLuongToiThieu.toString());
          setMaximum(item.soLuongToiDa.toString());
          setJustCreated(item.justCreated);
        }
      });
    }
  }, [isEditing, selectedKeys, props.ticketEvent]);

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
                <p>Bạn có chắc chắn muốn xóa vé này ?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="success"
                  variant="light"
                  onPress={() => {
                    setIsEditing(false);
                    props.setCanSubmit(true);
                    onClose();
                    deleteTicketContent();
                  }}
                >
                  Xóa vé
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setIsEditing(false);
                    props.setCanSubmit(true);
                    onClose();
                  }}
                >
                  Hủy
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="grid-cols-1 grid gap-4 mt-5">
        <h1 className="font-semibold text-xl">Hệ thống vé</h1>
        <span className="text-red-500 text-sm leading-6">
          *Lưu ý: <br />
          1. Trong quá trình chỉnh sửa vé, không thể thao tác với các vé khác và
          thêm vé mới !
          <br />
          2. Các vé đã được tạo và bắt đầu đăng bán không thể thực hiện xóa, chỉ
          có thể sửa !
          <br />
          3. Thao tác xóa vé có thể sẽ xuất hiện thông báo lỗi do thời gian cập
          nhật, các bạn vui lòng bỏ qua. Nếu có sự cố vui lòng liên hệ đơn vị kỹ
          thuật !
        </span>
        <div className="rounded bg-white p-4">
          <div className="gap-6 mt-3">
            <div className="mb-3 flex flex-row gap-3">
              <Input
                className="w-full"
                radius="sm"
                variant="bordered"
                value={newEventName}
                placeholder="Nhập tên loại vé"
                onChange={(e) => {
                  setNewEventName(e.target.value);
                }}
              />
              <Button
                className={`w-1/3 bg-[#3BE1AA] text-black hover:bg-[#2DD196]`}
                radius="sm"
                onClick={addNewEvent}
              >
                Tạo vé mới
              </Button>
            </div>

            <Accordion
              showDivider={false}
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              {props.ticketEvent?.map((item) => (
                <AccordionItem
                  className="shadow-md rounded-md px-12 mb-4"
                  key={item.id}
                  aria-label="ticket"
                  disableIndicatorAnimation
                  indicator={<CiEdit className="h-6 w-6" />}
                  startContent={
                    <div className={`p-3 border-1 border-[#3BE1AA] rounded-md`}>
                      <IoTicketOutline className="h-6 w-6" color={item.mau} />
                    </div>
                  }
                  title={item.name}
                  isDisabled={
                    isEditing && parseInt(selectedKeys.currentKey) !== item.id
                  }
                >
                  <div
                    className="flex flex-col gap-6"
                    onFocus={() => {
                      if (!isEditing) {
                        setIsEditing(true);
                        props.setCanSubmit(false);
                      }
                    }}
                  >
                    <Input
                      className="w-full"
                      radius="sm"
                      variant="bordered"
                      value={isEditing ? eventName : item.name}
                      placeholder="Nhập tên loại vé"
                      onChange={(e) => {
                        setEventName(e.target.value);
                      }}
                    />
                    <Textarea
                      label="Mô tả vé"
                      placeholder="Nhập mô tả loại vé"
                      variant="bordered"
                      value={isEditing ? description : item.moTa}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                    <div className="lg:flex lg:h-20 space-y-3 lg:space-y-0 items-center lg:space-x-4 text-small mt-3">
                      <div className="space-y-3">
                        <div className="flex flex-row gap-2 items-center">
                          <h1 className="leading-10 text-sm w-[150px]">
                            Ngày bắt đầu bán:{" "}
                          </h1>
                          <DatePicker
                            date={isEditing ? startSale : item.ngayBan}
                            setDate={setStartSale}
                          />
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                          <h1 className="leading-10 text-sm w-[150px]">
                            Ngày kết thúc bán:{" "}
                          </h1>
                          <DatePicker
                            date={isEditing ? endSale : item.ngayKetThuc}
                            setDate={setEndSale}
                          />
                        </div>
                      </div>
                      <Divider orientation="vertical" />
                      <div>
                        <label htmlFor="favcolor" className="mr-2">
                          Chọn màu vé:
                        </label>
                        <input
                          type="color"
                          id="favcolor"
                          name="favcolor"
                          className="mt-2"
                          value={isEditing ? colorTicket : item.mau}
                          onChange={(e) => setColorTicket(e.target.value)}
                        />
                      </div>
                    </div>
                    <Divider className="my-4" />
                    <div className="lg:flex lg:h-20 space-y-3 lg:space-y-0 items-center lg:space-x-4 text-small">
                      <div className="flex flex-col gap-2">
                        <h1 className="h-12 text-sm w-full text-center">
                          {`Giá vé (VNĐ)`}
                        </h1>
                        <Input
                          className="w-full"
                          radius="sm"
                          value={isEditing ? ticketPrice : item.gia.toString()}
                          onChange={(e) => {
                            setTicketPrice(e.target.value);
                          }}
                        />
                      </div>
                      <Divider orientation="vertical" />
                      <div className="flex flex-col gap-2">
                        <h1 className="h-12 text-sm w-full text-center">
                          {`Tổng số lượng vé`}
                        </h1>
                        <Input
                          className="w-full"
                          radius="sm"
                          value={
                            isEditing ? totalCount : item.soLuong.toString()
                          }
                          onChange={(e) => {
                            setTotalCount(e.target.value);
                          }}
                        />
                      </div>
                      <Divider orientation="vertical" />
                      <div className="flex flex-col gap-2">
                        <h1 className="h-12 text-sm w-full text-center">
                          {`Số vé tối thiểu trong một đơn hàng`}
                        </h1>
                        <Input
                          className="w-full"
                          radius="sm"
                          value={
                            isEditing
                              ? minimun
                              : item.soLuongToiThieu.toString()
                          }
                          onChange={(e) => {
                            setMinimun(e.target.value);
                          }}
                        />
                      </div>
                      <Divider orientation="vertical" />
                      <div className="flex flex-col gap-2">
                        <h1 className="h-12 text-sm w-full text-center">
                          {`Số vé tối đa trong một đơn hàng`}
                        </h1>
                        <Input
                          className="w-full"
                          radius="sm"
                          value={
                            isEditing ? maximum : item.soLuongToiDa.toString()
                          }
                          onChange={(e) => {
                            setMaximum(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="h-4"></div>
                    <div className="space-y-2">
                      <Button
                        className="bg-emerald-400 text-white font-medium w-full"
                        radius="sm"
                        size="md"
                        onClick={saveTicketContent}
                      >
                        Xong
                      </Button>
                      <Button
                        className="bg-red-500 text-white font-medium w-full"
                        radius="sm"
                        size="md"
                        onPress={() => {
                          onOpen();
                          setDeletedId(item.id);
                        }}
                      >
                        Xóa vé
                      </Button>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketInformation;
