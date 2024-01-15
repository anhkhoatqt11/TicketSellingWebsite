"use client";

import React, { useState, useEffect } from "react";
// import { useRole } from '@/hooks/useRole';
import DialogCustom from "@/components/ui/dialogCustom";
import Logo from "@/components/logo";
import { SelectLoaiHinhKinhDoanh } from "./SelectLoaiHinhKinhDoanh";
import { RegisterForm } from "./(organizerRegister)/RegisterForm";
import { useRole } from "@/hooks/useRole";

function OrganizerRegister({ session }) {
  const { fetchOrganizerRoleById } = useRole();
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loaiHinhKinhDoanhValue, setLoaiHinhKinhDoanhValue] =
    React.useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRole = await fetchOrganizerRoleById(session?.user?.id);
        setUserRole(userRole[0]?.role);
      } catch (error) {

      }
    };

    fetchUserRole();
  }, []);
  return (
    <div>
      {userRole === "user" ? (
        <DialogCustom
          className="w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center bg-slate-50"
          isModalOpen={true}
          notShowClose={true}
        >
          <div>
            <h1 className="font-medium text-xl mb-4">
              Đơn đăng ký ban tổ chức.
            </h1>
            <SelectLoaiHinhKinhDoanh
              setLoaiHinhKinhDoanhValue={setLoaiHinhKinhDoanhValue}
              loaiHinhKinhDoanhValue={loaiHinhKinhDoanhValue}
            />
            <div className="flex flex-col space-y-3">
              {loaiHinhKinhDoanhValue ? (
                <RegisterForm
                  organizerType={loaiHinhKinhDoanhValue}
                  setIsLoading={setIsLoading}
                  userId={session?.user?.id}
                />
              ) : null}
            </div>
          </div>
        </DialogCustom>
      ) : null}
    </div>
  );
}

export default OrganizerRegister;
