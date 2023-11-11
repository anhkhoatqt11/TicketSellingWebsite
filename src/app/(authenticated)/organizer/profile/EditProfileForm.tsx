"use client";
import { useRole } from "@/hooks/useRole";
import React, { useEffect } from "react";
import { RegisterForm } from "../(components)/(organizerRegister)/RegisterForm";
import { SelectLoaiHinhKinhDoanh } from "../(components)/SelectLoaiHinhKinhDoanh";
export const EditProfileForm = () => {
  const [loaiHinhKinhDoanhValue, setLoaiHinhKinhDoanhValue] =
    React.useState("");
  const { fetchOrganizerRoleById } = useRole();
  useEffect(() => {
    const fetchOrganizer = async () => {
      // update session later
      const result = await fetchOrganizerRoleById(1);
      setLoaiHinhKinhDoanhValue(
        result[0]?.loaiHinhKinhDoanh === 1 ? "canhan" : "doanhnghiep"
      );
    };
    fetchOrganizer();
  }, []);
  return (
    <div>
      <h1 className="font-medium text-xl mb-4">Đơn đăng ký ban tổ chức.</h1>
      <SelectLoaiHinhKinhDoanh
        setLoaiHinhKinhDoanhValue={setLoaiHinhKinhDoanhValue}
        loaiHinhKinhDoanhValue={loaiHinhKinhDoanhValue}
      />
      <div className="flex flex-col space-y-3">
        {loaiHinhKinhDoanhValue ? (
          <RegisterForm
            organizerType={loaiHinhKinhDoanhValue}
            setTrigger={() => {}}
          />
        ) : null}
      </div>
    </div>
  );
};
