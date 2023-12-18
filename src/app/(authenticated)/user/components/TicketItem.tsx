import OutsideIcon from "@/components/outside";
import { Card } from "@/components/ui/card";
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
import { QrCode } from "lucide-react";

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

const TicketItem = ({ ticketItem }: TicketItemProps) => {
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

  const toggleAccordion = () => {
    setExpanded(!isExpanded);
  };
  return (
    <Card className="mt-4 " key={`batdongsan_${"item.id"}`}>
      <div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 h-[150px] m-3 relative">
            <img
              className="rounded-md h-[150px] w-full object-cover"
              src={hinhAnhSuKien}
            />
          </div>
          <div className="lg:w-2/3 m-3">
            <h1 className="text-base text-blue-700 mt-1 flex flex-row gap-2">
              {getIconById(ChuDeId)}
              {ChuDe.name}
            </h1>
            <div className="flex flex-row">
              <h1 className="text-2xl font-extrabold mt-1">{name}</h1>
            </div>
            <h1 className="text-base text-slate-500 mt-1 flex flex-row gap-2">
              <IoLocationOutline className="mt-1" />
              {diaChi}
            </h1>
            <h1 className="text-base text-slate-500 mt-1 flex flex-row gap-2">
              <AiOutlineClockCircle className="mt-1" />
              {convertDateTimeToDate(ngayBatDau)}
              {" - "}
              {convertDateTimeToDate(ngayKetThuc)}
            </h1>
          </div>
        </div>
        <Separator />
        <div>
          <div className="flex flex-col">
            {HoaDonVe.map((hoaDon, index) => (
              <div key={index} className="flex items-center m-3">
                {/* <h3>{hoaDon.ve.name}</h3>
                <p>{hoaDon.ve.moTa}</p>
                <p>Số lượng: {hoaDon.soLuong}</p>
                <p>Tổng giá: {hoaDon.tongGia}</p> */}
                <IoTicketOutline className="h-8 w-8" color={hoaDon.ve.mau} />
                <div className="ml-3 flex-1">
                  <h1 className="text-xl font-extrabold">{hoaDon.ve.name}</h1>
                  <p className=" text-medium text-slate-500 text-ellipsis overflow-hidden h-[60px]">
                    Mô tả vé: {hoaDon.ve.moTa}
                  </p>
                </div>
                {/* <div className="flex flex-col">
                  <p className="text-base font-semibold">
                    Số lượng:{" "}
                    <span className="text-blue-700">{hoaDon.soLuong}</span>
                  </p>
                  <p className="text-base font-semibold">
                    Tổng giá:{" "}
                    <span className="text-blue-700">{hoaDon.tongGia}₫</span>{" "}
                  </p>
                </div> */}
                <div className="flex items-center mt-2 ml-2">
                  <div className="flex flex-col">
                    <p className="text-base text-slate-500">
                      Số lượng:{" "}
                      <span className="text-blue-700 font-semibold">
                        {hoaDon.soLuong}
                      </span>
                    </p>
                    <p className="text-base text-slate-500">
                      Tổng giá:{" "}
                      <span className="text-blue-700 font-semibold">
                        {hoaDon.tongGia}₫
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <Separator /> */}
        {/* <div className="thongtinthanhtoan">
          <div className="grid grid-cols-4 m-3 justify-center">
            <p className="text-base font-semibold text-center">
              Ngày đặt hàng:{" "}
              <span className="text-blue-700">
                {convertDateTimeToDate(ngayDatHang)}
              </span>
            </p>
            <p className="text-base font-semibold text-center">
              Tinh trạng: <span className="text-blue-700">{tinhTrang}</span>
            </p>
            <p className="text-base font-semibold text-center">
              Phương thức thanh toán:{" "}
              <span className="text-blue-700">{phuongThucThanhToan}</span>
            </p>
            <p className="text-base font-semibold text-center">
              Tổng cộng: <span className="text-blue-700">{tongTien}₫</span>
            </p>
          </div>
        </div> */}
        <div className="thongtinthanhtoan">
          <button
            onClick={toggleAccordion}
            className="flex items-center justify-center w-full cursor-pointer focus:outline-none"
          >
            <span className="text-base font-semibold text-center">
              Chi tiết hóa đơn
            </span>
            <span
              className={`ml-2 ${isExpanded ? "transform rotate-180" : ""}`}
            >
              {/* You can replace this with your caret-down icon */}▼
            </span>
          </button>
          {isExpanded && (
            <>
              <div className="grid grid-cols-2 xl:grid-cols-4 m-3 justify-center">
                <p className="text-base text-slate-500  text-center">
                  Ngày đặt hàng:{" "}
                  <span className="text-blue-700 font-semibold">
                    {convertDateTimeToDate(ngayDatHang)}
                  </span>
                </p>
                <p className="text-base text-slate-500  text-center">
                  Tình trạng:{" "}
                  <span className="text-blue-700 font-semibold">
                    {tinhTrang}
                  </span>
                </p>
                <p className="text-base text-slate-500  text-center">
                  Phương thức:{" "}
                  <span className="text-blue-700 font-semibold">
                    {phuongThucThanhToan}
                  </span>
                </p>
                <p className="text-base text-slate-500  text-center">
                  Tổng cộng:{" "}
                  <span className="text-blue-700 font-semibold">
                    {tongTien}₫
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 m-3 justify-center">
                <p className="text-base text-slate-500  text-center">
                  Mã đặt chỗ:{" "}
                  <span className="text-blue-700 font-semibold">
                    {maDatCho}
                  </span>
                </p>
                <p className="text-base text-slate-500  text-center">
                  QR Code:
                  {/* {QrCode ở đây khoa ơi}  */}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TicketItem;
