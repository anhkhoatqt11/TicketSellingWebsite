'use client';

import React, { useEffect } from "react";
import { useEvent } from '@/hooks/useEvent'
import { useQuery } from '@tanstack/react-query';
import Loader from "@/components/Loader";
import Image from "next/image";

export function EventInfo({ EventDetail }) {    
    return (
        <div className="w-full h-[110px] bg-emerald-400">
            <div className="flex flex-col p-4 text-white">
                <p className="font-bold text-lg">{EventDetail.name}</p>
                <p>{EventDetail.diaChi}</p>
                <p>{EventDetail.ngayBatDau}</p>
            </div>
        </div>
    )
}