import React from "react";

export function EventInfo({ EventDetail }) {
    return (
        <div className="w-full h-2/3 bg-blue-700">
            <div className="flex flex-col p-4 text-white">
                <p className="font-bold text-lg">{EventDetail.name}</p>
                <p>{EventDetail.diaChi}</p>
                <p>{EventDetail.ngayBatDau}</p>
            </div>
        </div>
    );
}
