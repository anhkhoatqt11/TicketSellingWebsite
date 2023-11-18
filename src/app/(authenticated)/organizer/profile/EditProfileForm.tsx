"use client";
import { useRole } from "@/hooks/useRole";
import { CircularProgress } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { RegisterForm } from "../(components)/(organizerRegister)/RegisterForm";
import { SelectLoaiHinhKinhDoanh } from "../(components)/SelectLoaiHinhKinhDoanh";
export const EditProfileForm = () => {
  const [loaiHinhKinhDoanhValue, setLoaiHinhKinhDoanhValue] =
    React.useState("");
  const { fetchOrganizerRoleById } = useRole();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchOrganizer = async () => {
      // update session later
      const result = await fetchOrganizerRoleById(1);
      setLoaiHinhKinhDoanhValue(
        result[0]?.loaiHinhKinhDoanh === 1 ? "canhan" : "doanhnghiep"
      );
      console.log(loaiHinhKinhDoanhValue);
    };
    fetchOrganizer().then(() => {
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="relative min-h-[1032px]">
      <h1 className="font-medium text-xl mb-4">Đơn đăng ký ban tổ chức.</h1>
      <SelectLoaiHinhKinhDoanh
        setLoaiHinhKinhDoanhValue={setLoaiHinhKinhDoanhValue}
        loaiHinhKinhDoanhValue={loaiHinhKinhDoanhValue}
      />
      <div className="flex flex-col space-y-3">
        {loaiHinhKinhDoanhValue ? (
          <RegisterForm
            organizerType={loaiHinhKinhDoanhValue}
            setIsLoading={setIsLoading}
          />
        ) : null}
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center bg-gray-200 z-10 absolute top-0">
          <CircularProgress
            color="success"
            aria-label="Loading..."
            classNames={{
              svg: "w-28 h-28 drop-shadow-md",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
