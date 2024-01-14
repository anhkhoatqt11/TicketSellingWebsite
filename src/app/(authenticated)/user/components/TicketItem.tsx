import OutsideIcon from "@/components/outside";
import { convertDateTimeToDate } from "@/lib/utils";
import React, { useState } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoLocationOutline, IoTicketOutline } from "react-icons/io5";
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BiRightArrow, BiRightArrowAlt } from "react-icons/bi";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { main_color } from "../../../../../public/color";

interface TicketItemProps {
  ticketItem: {
    id: number;
    ngayDatHang: string;
    tinhTrang: string;
    phuongThucThanhToan: string;
    tongTien: number;
    maDatCho: string;
    suKien: {
      name: string;
      diaChi: string;
      ngayBatDau: string;
      ngayKetThuc: string;
      hinhAnhSuKien: string;
      ChuDeId: number;
      ChuDe: {
        name: string;
      };
    };
    HoaDonVe: {
      soLuong: number;
      tongGia: number;
      ve: {
        name: string;
        moTa: string;
        mau: string;
      };
    }[];
  };
  onOpen: () => void;
  setSelectedMaDatCho: (maDatCho) => void;
}
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

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}

const TicketItem = ({
  ticketItem,
  onOpen,
  setSelectedMaDatCho,
}: TicketItemProps) => {
  const {
    id,
    ngayDatHang,
    tinhTrang,
    phuongThucThanhToan,
    tongTien,
    maDatCho,
    suKien: {
      name,
      diaChi,
      ngayBatDau,
      ngayKetThuc,
      hinhAnhSuKien,
      ChuDeId,
      ChuDe,
    },
    HoaDonVe,
  } = ticketItem;
  const [isExpanded, setExpanded] = useState(false);
  return (
    <Card className="py-4 mt-4">
      <CardBody className="pb-0 pt-2 px-4">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="overflow-visible py-2 pb-0 pt-2 px-4 md:w-2/3">
            <div className="flex flex-col">
              <small className="text-default-500">TÊN SỰ KIỆN</small>
              <p className={`text-md font-bold text-[#2DD196]`}>{name}</p>
            </div>
            <Divider className="my-2" />
            <div className="flex flex-col">
              <small className="text-default-500">MÃ ĐẶT CHỖ</small>
              <p className={`text-md font-bold text-[#2DD196]`}>{maDatCho}</p>
              <Button
                className={`bg-[#3BE1AA] hover:bg-[#2DD196] mt-2 text-black font-bold h-[36px]`}
                onClick={() => {
                  onOpen();
                  setSelectedMaDatCho(maDatCho);
                }}
              >
                Xem mã QR Code <BiRightArrowAlt />
              </Button>
            </div>
            <Divider className="my-2" />
            <div className="flex flex-col">
              <small className="text-default-500">THỜI GIAN</small>
              {convertDateTimeToDate(ngayBatDau)}
              {" - "}
              {convertDateTimeToDate(ngayKetThuc)}
            </div>
            <div className="flex flex-col mt-2">
              <small className="text-default-500">ĐỊA ĐIỂM</small>
              {diaChi}
            </div>
          </div>
          <div>
            <Image
              alt="Card background"
              className="object-cover rounded-xl"
              src={hinhAnhSuKien}
              width={1000}
              height={200}
              objectFit="cover"
            />
          </div>
        </div>
        <div className="px-4">
          <div className="flex flex-col">
            <Divider className="my-2" />
            <small className="text-default-500">DANH SÁCH VÉ</small>
            {HoaDonVe.map((hoaDon, index) => (
              <div key={index} className="flex items-center m-3">
                <IoTicketOutline className="h-8 w-8" color={hoaDon.ve.mau} />
                <div className="ml-3 flex-1">
                  <h1 className="text-medium font-extrabold">
                    {hoaDon.ve.name}
                  </h1>
                  <p className="text-sm text-slate-500 text-ellipsis overflow-hidden h-[60px]">
                    Mô tả vé: {hoaDon.ve.moTa}
                  </p>
                  <br></br>
                  <p className="text-sm text-slate-500 text-ellipsis overflow-hidden h-[60px]">
                    Số lượng:{" "}
                    <span className={`text-[#2DD196]`}>{hoaDon.soLuong}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Divider className="my-2" />
          <div className="flex flex-col gap-1">
            <small className="text-default-500">THÔNG TIN THANH TOÁN</small>
            <p className="text-md font-semibold">
              Trạng thái thanh toán:{" "}
              <span className={`text-[#2DD196] font-semibold`}>
                {tinhTrang}
              </span>
            </p>
            <p className="text-md font-bol">
              Phương thức thanh toán:{" "}
              <span className={`text-[#2DD196] font-semibold`}>
                {phuongThucThanhToan}
              </span>
            </p>
            <p className="text-md font-bol">
              Tổng tiền:{" "}
              <span className={`text-[#2DD196] font-semibold`}>
                {formatCurrency(tongTien)}
              </span>
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TicketItem;
