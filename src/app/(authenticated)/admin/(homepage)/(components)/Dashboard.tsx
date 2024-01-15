"use client";

import React, { useEffect } from "react";
import { useAdmin } from "@/hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Card, Button, Progress, CardBody } from "@nextui-org/react";
import { Calendar, Ticket, User } from "lucide-react";
import { BiMoney } from "react-icons/bi";

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}

export default function Dashboard() {
  const { fetchTotalInfo } = useAdmin();
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentDateTime, setCurrentDateTime] = React.useState("");

  const { data: DashBoardInfo } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await fetchTotalInfo();
      setIsLoading(false);
      return res;
    },
  });

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone/Asia/Bangkok")
      .then((response) => response.json())
      .then((data) => {
        const timestamp = new Date(data.datetime);
        const formattedDate = timestamp.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short",
        });
        setCurrentDateTime(formattedDate);
      });
  }, []);

  if (isLoading)
    return (
      <div className="w-full flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  return (
    <div className="flex flex-wrap md:flex-row gap-6">
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full h-[180px] md:w-[380px]"
      >
        <CardBody className="p-5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="font-normal text-gray-400">Tổng sự kiện</p>
              <p className="text-3xl font-extrabold mt-2">
                {DashBoardInfo?.totalEvent}
              </p>
            </div>
            <div>
              <Button className={`bg-yellow-100 w-[50px] h-[50px]`}>
                <Calendar className={`w-6 h-6 text-yellow-500`} />
              </Button>
            </div>
          </div>
          <Progress
            aria-label="Loading..."
            value={parseInt(DashBoardInfo?.totalEvent)}
            maxValue={100}
            color="warning"
            classNames={{
              base: "w-full mt-5",
            }}
          />
          <div className="flex flex-row justify-between items-center text-sm mt-4">
            <div className="flex flex-row">
              <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
            </div>
            {/* <p className={`text-yellow-500 font-bold`}>Đã cập nhật...</p> */}
          </div>
        </CardBody>
      </Card>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full h-[180px] md:w-[380px]"
      >
        <CardBody className="p-5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="font-normal text-gray-400">Tổng người dùng</p>
              <p className="text-3xl font-extrabold mt-2">
                {DashBoardInfo?.totalUser}
              </p>
            </div>
            <div>
              <Button className={`bg-blue-100 w-[50px] h-[50px]`}>
                <User className={`w-6 h-6 text-blue-500`} />
              </Button>
            </div>
          </div>
          <Progress
            aria-label="Loading..."
            value={parseInt(DashBoardInfo?.totalUser)}
            maxValue={100}
            classNames={{
              base: "w-full mt-5",
              indicator: `bg-blue-600`,
            }}
          />
          <div className="flex flex-row justify-between items-center text-sm mt-4">
            <div className="flex flex-row">
              <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
            </div>
            {/* <p className={`text-blue-500 font-bold`}>Đã cập nhật...</p> */}
          </div>
        </CardBody>
      </Card>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full h-[180px] md:w-[380px]"
      >
        <CardBody className="p-5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="font-normal text-gray-400">Tổng nhà tổ chức</p>
              <p className="text-3xl font-extrabold mt-2">
                {DashBoardInfo.totalOrganizer}
              </p>
            </div>
            <div>
              <Button className={`bg-emerald-100 w-[50px] h-[50px]`}>
                <User className={`w-6 h-6 text-emerald-400`} />
              </Button>
            </div>
          </div>
          <Progress
            aria-label="Loading..."
            value={parseInt(DashBoardInfo?.totalUser)}
            maxValue={100}
            color="success"
            classNames={{
              base: "w-full mt-5",
            }}
          />
          <div className="flex flex-row justify-between items-center text-sm mt-4">
            <div className="flex flex-row">
              <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
            </div>
            {/* <p className={`text-green-500 font-bold`}>Đã cập nhật...</p> */}
          </div>
        </CardBody>
      </Card>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full h-[180px] md:w-[380px]"
      >
        <CardBody className="p-5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="font-normal text-gray-400">Tổng doanh thu</p>
              <p className="text-3xl font-extrabold mt-2">
                {formatCurrency(DashBoardInfo.totalRevenue / 3)}
              </p>
            </div>
            <div>
              <Button className={`bg-purple-100 w-[50px] h-[50px]`}>
                <BiMoney className={`w-6 h-6 text-purple-500`} />
              </Button>
            </div>
          </div>
          <Progress
            aria-label="Loading..."
            value={DashBoardInfo.totalRevenue / 3}
            maxValue={10000000}
            classNames={{
              base: "w-full mt-5",
              indicator: `bg-purple-400`,
            }}
          />
          <div className="flex flex-row justify-between items-center text-sm mt-4">
            <div className="flex flex-row">
              <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
            </div>
            {/* <p className={`text-purple-500 font-bold`}>Đã cập nhật...</p> */}
          </div>
        </CardBody>
      </Card>
      <Card
        isFooterBlurred
        radius="lg"
        className="border-none w-full h-[180px] md:w-[380px]"
      >
        <CardBody className="p-5">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="font-normal text-gray-400">Tổng vé đã tạo</p>
              <p className="text-3xl font-extrabold mt-2">
                {DashBoardInfo.totalTicket}
              </p>
            </div>
            <div>
              <Button className={`bg-pink-100 w-[50px] h-[50px]`}>
                <Ticket className={`w-6 h-6 text-pink-500`} />
              </Button>
            </div>
          </div>
          <Progress
            aria-label="Loading..."
            value={parseInt(formatCurrency(DashBoardInfo.totalTicket))}
            maxValue={100}
            color="danger"
            classNames={{
              base: "w-full mt-5",
            }}
          />
          <div className="flex flex-row justify-between items-center text-sm mt-4">
            <div className="flex flex-row">
              <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
            </div>
            {/* <p className={`text-orange-500 font-bold`}>Đã cập nhật...</p> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
