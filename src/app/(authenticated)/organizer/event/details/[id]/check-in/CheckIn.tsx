"use client";

import React, { useState, useEffect, use } from "react";
import { FcSportsMode } from "react-icons/fc";
import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import TicketInformation, {
  TicketProps,
} from "../../../../(components)/(event)/(add)/TicketInformation";
import { GuestItem } from "@/app/(authenticated)/organizer/(components)/(event)/(detail)/GuestItem";
import { QrReader } from "react-qr-reader";
import Loader from "@/components/Loader";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  user,
  Button,
} from "@nextui-org/react";
import Logo from "@/components/logo";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import LiveMusic from "@/components/livemusic";
import NightLifeIcon from "@/components/nightlife";
import StageIcon from "@/components/stage";
import ConferenceIcon from "@/components/conference";
import CourseIcon from "@/components/course";
import TourismIcon from "@/components/tourism";
import SportIcon from "@/components/sport";
import OutsideIcon from "@/components/outside";
import {
  convertDateTimeToDate,
  currencyFormat,
  prismaDateToNextDate,
} from "@/lib/utils";

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
const CheckIn = ({ session, id }) => {
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [eventName, setEventName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [type, setType] = useState("");
  const [typeId, setTypeId] = useState();
  const [guestList, setGuestList] = useState<GuestItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    fetchEventAngGuestListById,
    fetchHoaDonByMaDatCho,
    updateCheckInStatus,
  } = useEventOrganizer();
  const { fetchUserInfoById } = useUser();
  const [searchKey, setSearchKey] = useState("");
  const [copyList, setCopyList] = useState<GuestItem[]>([]);
  const [data, setData] = useState(undefined);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [hoaDonScanned, setHoaDonScanned] = useState();
  const [userScanned, setUserScanned] = useState();

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      let ticketCopy: TicketProps[] = [];
      await fetchEventAngGuestListById(id).then((res) => {
        setAddressValue(res?.diaChi);
        setEventName(res?.name);
        console.log(res);
        setType(res.ChuDe?.name);
        setTypeId(res?.ChuDe?.id);
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

  useEffect(() => {
    const fetchTicket = async () => {
      if (data !== undefined) {
        setIsFetchingData(true);
        await fetchHoaDonByMaDatCho(data).then((res) => {
          if (res.length === 0) {
            setIsFetchingData(false);
            setHoaDonScanned(undefined);
          } else if (res[0].suKienId.toString() !== id.toString()) {
            setIsFetchingData(false);
            console.log(res[0].suKienId);
            console.log(id);
            setHoaDonScanned(undefined);
          } else {
            setHoaDonScanned(res[0]);
            console.log(res);
            fetchUser(res[0].userId);
          }
        });
      }
    };
    const fetchUser = async (userId) => {
      await fetchUserInfoById(userId).then((res) => {
        setIsFetchingData(false);
        setUserScanned(res);
        console.log(res);
      });
    };
    fetchTicket();
  }, [data]);

  const checkIn = async () => {
    if (hoaDonScanned?.checkIn === false) {
      const data = {
        id: hoaDonScanned?.id,
        checkIn: true,
      };

      const success = await updateCheckInStatus(data);
      if (success) {
        setHoaDonScanned(undefined);
        setUserScanned(undefined);
        setData(undefined);
        toast.success("Check-in thành công");
      }
    }
  };

  const cancelCheckIn = async () => {
    setHoaDonScanned(undefined);
    setUserScanned(undefined);
    setData(undefined);
  };

  return (
    <div className="min-h-[1032px]">
      <div className="mt-6">
        <h1 className="font-semibold text-2xl">{eventName}</h1>
        <h1 className="text-gray-600">{addressValue}</h1>
        <h1 className="text-base text-blue-700 mt-1 flex flex-row gap-2">
          {getIconById(typeId)}
          {type}
        </h1>
        <Divider className="my-4 mt-6" />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-center md:items-start items-center">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setData(result?.text);
            }
          }}
          className="w-[450px] rounded-md"
          constraints={{ facingMode: "environment" }}
        />
        <div className="w-full ml-4 flex justify-center md:justify-start">
          <div className="flex flex-col gap-2 mt-10">
            <Card className="w-[400px] rounded-md">
              <CardHeader className="flex gap-3">
                {/* <Image
                                    alt="nextui logo"
                                    height={40}
                                    radius="sm"
                                    src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                                    width={40}
                                /> */}
                <Logo />
                <div className="flex flex-col">
                  <p className="text-md">Checkin bằng mã QR</p>
                  <p className="text-small text-default-500">TicketNow</p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                {data === undefined ? (
                  <p>Đang chờ quét mã QR</p>
                ) : (
                  <>
                    {isFetchingData === true ? (
                      <div className="w-full flex justify-center">
                        <Loader />
                      </div>
                    ) : (
                      <>
                        {hoaDonScanned ? (
                          <div>
                            <div className="flex flex-col items-center justify-center">
                              <Image
                                alt="nextui logo"
                                height={80}
                                radius="full"
                                src={userScanned?.avatar}
                                width={80}
                              />
                              <p className="ml-2 font-medium text-xl">
                                {userScanned?.name}
                              </p>
                            </div>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm">
                                Mã đặt chỗ: {hoaDonScanned?.maDatCho}
                              </p>
                              <p className="text-sm">
                                Ngày đặt:{" "}
                                {convertDateTimeToDate(
                                  hoaDonScanned?.createdAt
                                )}
                              </p>
                              <p className="text-sm">
                                Phương thức thanh toán:{" "}
                                {hoaDonScanned?.phuongThucThanhToan}
                              </p>
                              <p className="text-sm">
                                Tổng tiền thanh toán:{" "}
                                {currencyFormat(hoaDonScanned?.tongTien)}
                              </p>
                              <p className="text-sm">
                                Mã giảm giá:{" "}
                                {hoaDonScanned?.maGiamGiaId === null ? (
                                  <span>Không</span>
                                ) : (
                                  hoaDonScanned?.maGiamGiaId
                                )}
                              </p>
                              <p className="text-sm">
                                Trạng thái Check-in:{" "}
                                {hoaDonScanned?.checkIn === false ? (
                                  <span>Chưa check-in</span>
                                ) : (
                                  <span>Đã check-in</span>
                                )}
                              </p>
                            </div>
                            {hoaDonScanned?.checkIn === false ? (
                              <div className="grid grid-cols-2 gap-6 mt-2">
                                <Button
                                  onClick={() => checkIn()}
                                  radius="sm"
                                  className="border-1 border-emerald-400 text-emerald bg-gray-50 text-emerald-400 hover:bg-white hover:text-emerald-400"
                                >
                                  Xác nhận Check-in
                                </Button>
                                <Button
                                  onClick={() => cancelCheckIn()}
                                  radius="sm"
                                  className="border-1 border-red-400 text-red bg-gray-50 text-red-400 hover:bg-white hover:text-red-400"
                                >
                                  Huỷ Check-in
                                </Button>
                              </div>
                            ) : (
                              <Button
                                className="w-full"
                                onClick={() => cancelCheckIn()}
                              >
                                Quét mã QR khác
                              </Button>
                            )}
                          </div>
                        ) : (
                          <p>Không tìm thấy hóa đơn hoặc không đúng sự kiện</p>
                        )}
                      </>
                    )}
                  </>
                )}
              </CardBody>
              <Divider />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
