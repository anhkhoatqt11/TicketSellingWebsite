"use client";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  checkPhoneNumber,
  convertDateInUI,
  convertDateTimeToDate,
  convertDateUIToDate,
} from "@/lib/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";

import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { string } from "zod";

export const CouponModal = ({ props }) => {
  const [code, setCode] = useState(props.code);
  const [price, setPrice] = useState(props.price);
  const [percent, setPercent] = useState(props.percent);
  const [start, setStart] = useState(convertDateInUI(props.start));
  const [end, setEnd] = useState(convertDateInUI(props.end));
  const [ticketId, setTicketId] = useState(props.ticketId);
  const editVoucher = (close) => {
    if (!code || (!price && !percent) || !start || !end || !ticketId) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (code.length < 6) {
      toast.error("Mã giảm giá phải có tối thiểu 6 kí tự");
      return;
    }
    if (
      (!checkPhoneNumber(price.toString()) && !percent) ||
      (!checkPhoneNumber(percent.toString()) && !price)
    ) {
      toast.error("Định dạng mức giảm không đúng, vui lòng chỉ nhập số");
      return;
    }
    if (
      convertDateUIToDate(start).getTime() >= convertDateUIToDate(end).getTime()
    ) {
      toast.error("Ngày bắt đầu hiệu lực phải nằm sau ngày kết thúc");
      return;
    }
    const ticketName = props.ticketList.filter(
      (item) => item.id === parseInt(ticketId)
    )[0]?.name;
    props.setCouponList(
      props.couponList.map((item) =>
        item.id === props.id
          ? {
              id: item.id,
              code: code,
              price: price ? price : null,
              percent: percent ? percent : null,
              start: convertDateUIToDate(start),
              end: convertDateUIToDate(end),
              ticketName: ticketName,
              ticketId: ticketId,
              state:
                convertDateUIToDate(end).getTime() >= new Date().getTime()
                  ? "Đang sử dụng"
                  : "Hết hạn",
            }
          : item
      )
    );
    close();
  };
  const [selectedLoaiVe, setSelectedLoaiVe] = useState(new Set([]));
  useEffect(() => {
    if (props.isOpen) {
      setCode(props.code);
      setPrice(props.price ? props.price : "");
      setPercent(props.percent ? props.percent : "");
      setStart(convertDateInUI(props.start));
      setEnd(convertDateInUI(props.end));
      setTicketId(props.ticketId);
      if (props.ticketId) {
        setSelectedLoaiVe(props.ticketId.toString());
      }
    }
  }, [
    props.code,
    props.end,
    props.isOpen,
    props.percent,
    props.price,
    props.start,
    props.ticketId,
  ]);
  useEffect(() => {
    if (props.ticketId) {
      setSelectedLoaiVe(props.ticketId.toString());
    }
  }, [props.ticketId]);

  useEffect(() => {
    if (selectedLoaiVe) {
      const ticketValueArray = Array.from(selectedLoaiVe);
      setTicketId(ticketValueArray?.[0]);
    }
  }, [props, selectedLoaiVe]);

  return (
    <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 w-full">
                  <Label className="font-bold text-sm">
                    Mã giảm giá: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    isInvalid={code !== "" ? false : true}
                    errorMessage={`${
                      code !== "" ? "" : "Vui lòng nhập mã giảm giá"
                    }`}
                    className="w-full"
                    radius="sm"
                    value={code}
                    label="Nhập mã giảm giá"
                    onChange={(e) => {
                      setCode(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Label className="font-bold text-sm">
                    Mức giảm: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    className="w-full"
                    radius="sm"
                    value={price}
                    label="Nhập mức giảm (VNĐ)"
                    onChange={(e) => {
                      setPercent("");
                      setPrice(e.target.value);
                    }}
                  />
                  <div className="w-full text-center text-sm text-emerald-400">
                    hoặc
                  </div>
                  <Input
                    className="w-full"
                    radius="sm"
                    value={percent}
                    label="Nhập mức giảm (%)"
                    onChange={(e) => {
                      setPrice("");
                      setPercent(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Label className="font-bold text-sm">
                    Thời gian hiệu lực: <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-2">
                      <h1 className="leading-10 text-sm w-[60px]">Bắt đầu: </h1>
                      {/* <DatePicker date={start} setDate={setStart} /> */}
                      <Input
                        type="date"
                        radius="sm"
                        variant="bordered"
                        className="max-w-xs  h-[52px]"
                        value={start}
                        placeholder="Chọn ngày cấp mã số đăng ký kinh doanh"
                        onChange={(e) => {
                          setStart(e.target.value);
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-2">
                      <h1 className="leading-10 text-sm w-[60px]">
                        Kết thúc:{" "}
                      </h1>
                      <Input
                        type="date"
                        radius="sm"
                        variant="bordered"
                        className="max-w-xs  h-[52px]"
                        value={end}
                        placeholder="Chọn ngày cấp mã số đăng ký kinh doanh"
                        onChange={(e) => {
                          setEnd(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <Label className="font-bold text-sm">
                    Loại vé: <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    label="Chọn loại vé"
                    selectedKeys={selectedLoaiVe}
                    onSelectionChange={setSelectedLoaiVe}
                    className="w-full"
                  >
                    {props.ticketList.map((ticket) => (
                      <SelectItem
                        key={ticket.id.toString()}
                        value={ticket.id.toString()}
                      >
                        {ticket.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="flex justify-center">
              <Button
                className="border-1 border-success w-28"
                color="success"
                variant="light"
                onPress={() => {
                  editVoucher(onClose);
                }}
              >
                Xác nhận
              </Button>
              <Button className="w-28" color="primary" onPress={onClose}>
                Hủy
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
