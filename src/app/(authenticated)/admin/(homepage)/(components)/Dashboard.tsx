'use client';

import React from 'react'
import { useAdmin } from "@/hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Card, Button, Progress, CardBody } from "@nextui-org/react";
import { Ticket, User } from 'lucide-react';
import { BiMoney } from 'react-icons/bi';


const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'VND',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}


export default function Dashboard() {

    const { fetchTotalInfo } = useAdmin();
    const [isLoading, setIsLoading] = React.useState(true);


    const { data: DashBoardInfo } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetchTotalInfo();
            setIsLoading(false);
            return res;
        }
    });

    if (isLoading) return (
        <div className="flex h-screen items-center justify-center">
            <Loader />
        </div>
    )
    return (
        <div className="flex flex-wrap md:flex-row gap-6">
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[190px] md:w-[270px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng sự kiện</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo?.totalEvent}</p>
                        </div>
                        <div>
                            <Button className={`bg-yellow-100 w-[50px] h-[50px]`}>
                                <Ticket className={`w-6 h-6 text-yellow-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={parseInt(DashBoardInfo?.totalEvent)}
                        maxValue={100}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-yellow-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="font-bold">120</p>
                            <p className="text-gray-200 font-bold">/tháng</p>
                        </div>
                        <p className={`text-yellow-500 font-bold`}>6,8%</p>
                    </div>
                </CardBody>
            </Card>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[190px] md:w-[270px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng người dùng</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo?.totalUser}</p>
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
                        maxValue={10000}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-blue-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="font-bold">120</p>
                            <p className="text-gray-200 font-bold">/tháng</p>
                        </div>
                        <p className={`text-blue-500 font-bold`}>6,8%</p>
                    </div>
                </CardBody>
            </Card>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[190px] md:w-[270px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng nhà tổ chức</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo.totalOrganizer}</p>
                        </div>
                        <div>
                            <Button className={`bg-green-100 w-[50px] h-[50px]`}>
                                <User className={`w-6 h-6 text-green-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={parseInt(DashBoardInfo?.totalUser)}
                        maxValue={10000}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-green-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="font-bold">120</p>
                            <p className="text-gray-200 font-bold">/tháng</p>
                        </div>
                        <p className={`text-green-500 font-bold`}>6,8%</p>
                    </div>
                </CardBody>
            </Card>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[190px] md:w-[270px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng doanh thu</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo.totalRevenue}</p>
                        </div>
                        <div>
                            <Button className={`bg-purple-100 w-[50px] h-[50px]`}>
                                <BiMoney className={`w-6 h-6 text-purple-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={parseInt(formatCurrency(DashBoardInfo.totalRevenue))}
                        maxValue={10000}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-purple-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="font-bold">120</p>
                            <p className="text-gray-200 font-bold">/tháng</p>
                        </div>
                        <p className={`text-purple-500 font-bold`}>6,8%</p>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

