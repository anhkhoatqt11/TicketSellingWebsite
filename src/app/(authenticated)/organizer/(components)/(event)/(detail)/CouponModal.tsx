"use client";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { useVoucher } from "@/hooks/useVoucher";
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
import { main_color } from "../../../../../../../public/color";

export const CouponModal = ({ props }) => {
  const [code, setCode] = useState(props.code);
  const [price, setPrice] = useState(props.price);
  const [percent, setPercent] = useState(props.percent);
  const [start, setStart] = useState(convertDateInUI(props.start));
  const [end, setEnd] = useState(convertDateInUI(props.end));
  const [ticketId, setTicketId] = useState(props.ticketId);
  const { editVoucher, creatNewVoucher } = useVoucher();
  const editVoucherAction = async (close) => {
    if (!code || (!price && !percent) || !start || !end || !ticketId) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (code.length < 6 || code.length > 10) {
      toast.error("Mã giảm giá phải có tối thiểu 6 kí tự và tối đa 10 kí tự");
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
    if (props.action === "edit") {
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
      const data = {
        id: props.id,
        maGiamGia: code,
        soTienGiam: price ? parseInt(price) : null,
        phanTramGiam: percent ? parseInt(percent) : null,
        ngayBatDau: convertDateUIToDate(start),
        ngayKetThuc: convertDateUIToDate(end),
        VeId: parseInt(ticketId),
      };
      await editVoucher(data).then(() =>
        toast.success("Chỉnh sửa mã giảm giá thành công")
      );
    } else {
      const data = {
        maGiamGia: code,
        soTienGiam: price ? parseInt(price) : null,
        phanTramGiam: percent ? parseInt(percent) : null,
        ngayBatDau: convertDateUIToDate(start),
        ngayKetThuc: convertDateUIToDate(end),
        VeId: parseInt(ticketId),
        SuKienId: parseInt(props.eventId),
      };
      await creatNewVoucher(data).then((res) => {
        props.setCouponList([
          ...props.couponList,
          {
            id: res?.id,
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
            trangThai: true,
          },
        ]);
        toast.success("Thêm mã giảm giá mới thành công");
      });
    }
    close();
  };
  const [selectedLoaiVe, setSelectedLoaiVe] = useState(new Set([]));
  useEffect(() => {
    if (props.isOpen) {
      setCode(props.action === "edit" ? props.code : "");
      setPrice(props.action === "edit" && props.price ? props.price : "");
      setPercent(props.action === "edit" && props.percent ? props.percent : "");
      setStart(props.action === "edit" ? convertDateInUI(props.start) : "");
      setEnd(props.action === "edit" ? convertDateInUI(props.end) : "");
      setTicketId(props.action === "edit" ? props.ticketId : "");
      if (props.ticketId && props.action === "edit") {
        setSelectedLoaiVe(props.ticketId.toString());
      }
    }
  }, [
    props.action,
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
                  <div className={`w-full text-center text-sm text-[#2DD196]`}>
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
                    className="w-[94%]"
                    radius="sm"
                    selectedKeys={selectedLoaiVe}
                    onSelectionChange={setSelectedLoaiVe}
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
                className="w-28"
                color="success"
                variant="light"
                radius="sm"
                onPress={() => {
                  editVoucherAction(onClose);
                }}
              >
                Xác nhận
              </Button>
              <Button
                className="w-28"
                color="primary"
                radius="sm"
                onPress={onClose}
              >
                Hủy
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
