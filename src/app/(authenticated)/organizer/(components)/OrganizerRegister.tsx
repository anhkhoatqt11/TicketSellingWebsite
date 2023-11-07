"use client";

import React, { useState, useEffect } from "react";
// import { useRole } from '@/hooks/useRole';
import DialogCustom from "@/components/ui/dialogCustom";
import Logo from "@/components/logo";
import { SelectLoaiHinhKinhDoanh } from "./SelectLoaiHinhKinhDoanh";
import { RegisterForm } from "./(organizerRegister)/RegisterForm";
// import { ThongTinForm } from './(agencyRegister)/ThongTinForm';

function OrganizerRegister({ session }) {
  // const { getUserRole } = useRole();
  const [userRole, setUserRole] = useState("");
  const [duyetDoiTac, setDuyetDoiTac] = useState("");
  const [isUser, setIsuser] = React.useState(false);
  const [loaiHinhKinhDoanhValue, setLoaiHinhKinhDoanhValue] =
    React.useState("");
  const [canhan, setCaNhan] = React.useState(false);
  const [doanhnghiep, setDoanhNghiep] = React.useState(false);

  //   useEffect(() => {
  //     const fetchUserRole = async () => {
  //       try {
  //         const userRole = await getUserRole(session?.user?.id);
  //         const role = userRole?.role;
  //         const duyetDoiTac = userRole?.duyetDoiTac;
  //         setUserRole(role);
  //         if (role === "khach_hang") {
  //           setIsuser(true);
  //         }
  //         setDuyetDoiTac(duyetDoiTac);
  //         console.log(userRole);
  //       } catch (error) {
  //         console.error("Error fetching user role:", error);
  //       }
  //     };

  //     fetchUserRole();
  //   }, []);
  return (
    <div>
      <DialogCustom
        className="w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center bg-slate-50"
        // isModalOpen={isUser}
        isModalOpen={true}
        notShowClose={true}
      >
        <div>
          <h1 className="font-medium text-xl mb-4">Đơn đăng ký ban tổ chức.</h1>
          <SelectLoaiHinhKinhDoanh
            setLoaiHinhKinhDoanhValue={setLoaiHinhKinhDoanhValue}
          />
          <div className="flex flex-col space-y-3">
            {loaiHinhKinhDoanhValue ? (
              <RegisterForm organizerType={loaiHinhKinhDoanhValue} />
            ) : null}
          </div>
        </div>
      </DialogCustom>
    </div>
  );
}

export default OrganizerRegister;
