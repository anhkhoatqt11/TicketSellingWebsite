/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { SelectAddress } from "./SelectAddress";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { FileDialog } from "@/components/ui/FileDialog";
import { ImageList } from "@/components/ui/ImageList";
import { Button } from "@/components/ui/button";
import DialogCustom from "@/components/ui/dialogCustom";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@nextui-org/react";
import { useOrganizer } from "@/hooks/useOrganizer";
import { checkEmail, checkPhoneNumber } from "@/lib/utils";
import { url } from "inspector";
import { Zoom } from "@/components/ui/zoom-image";
import { hover_color, main_color } from "../../../../../../public/color";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const RegisterForm = ({ organizerType, setIsLoading, userId }) => {
  const { startUpload } = useUploadThing("imageUploader");

  const [organizerName, setOrganizerName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [maSoThueCaNhan, setMaSoThueCaNhan] = useState("");
  const [maSoDKKD, setMaSoDKKD] = useState("");
  const [noiCap, setNoiCap] = useState("");
  const [ngayCap, setNgayCap] = useState("");
  const [chuTaiKhoan, setChuTaiKhoan] = useState("");
  const [soTaiKhoan, setSoTaiKhoan] = useState("");
  const [tenNganHang, setTenNganHang] = useState("");
  const [chiNhanh, setChiNhanh] = useState("");

  const [avatarImageFile, setAvatarImageFile] = React.useState([]);
  const [defaultAvatar, setDefaultAvatar] = useState("");

  const { fetchOrganizerById, uploadOrganizerInfo } = useOrganizer();
  useEffect(() => {
    const fetchOrganizer = async () => {
      const result = await fetchOrganizerById(userId);
      setPhoneNumber(result[0]?.phoneNumber);
      console.log(result[0]);
      setEmail(result[0]?.email);
      setAddressValue(result[0]?.diaChi);
      if (result[0]?.role !== "user") {
        setOrganizerName(result[0]?.hoTenOrganizer);
        setCompanyName(result[0]?.tenDoanhNghiep);
        setMaSoDKKD(result[0]?.maSoDKKD);
        setMaSoThueCaNhan(result[0]?.maSoThueCaNhan);
        setNoiCap(result[0]?.noiCap);
        setNgayCap(result[0]?.ngayCap);
        setDefaultAvatar(result[0]?.anhDaiDienToChuc);
        setChuTaiKhoan(result[0]?.tenChuTaiKhoan);
        setSoTaiKhoan(result[0]?.soTaiKhoan);
        setTenNganHang(result[0]?.tenNganHang);
        setChiNhanh(result[0]?.chiNhanh);
      }
    };
    fetchOrganizer().then(setIsLoading(false));
  }, []);

  const onSubmit = async () => {
    if (
      !organizerName ||
      !addressValue ||
      !phoneNumber ||
      !email ||
      !chuTaiKhoan ||
      !soTaiKhoan ||
      !tenNganHang ||
      !chiNhanh ||
      (organizerType === "canhan" && (!organizerName || !maSoThueCaNhan)) ||
      (organizerType === "doanhnghiep" &&
        (!companyName || !maSoDKKD || !ngayCap || !noiCap))
    ) {
      toast.error("Vui lòng nhập tất cả thông tin");
      return;
    }
    if (!checkEmail(email)) {
      toast.error("Email không đúng định dạng, vui lòng nhập lại");
      return;
    }
    if (!checkPhoneNumber(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ, vui lòng nhập lại");
      return;
    }
    if (!checkPhoneNumber(soTaiKhoan)) {
      toast.error("Số tài khoản không hợp lệ, vui lòng nhập lại");
      return;
    }

    setIsLoading(true);
    const [avatarImage] = await Promise.all([
      startUpload([...avatarImageFile]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split("_")[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
    ]);

    const thongTin = {
      hoTenOrganizer: organizerType === "canhan" ? organizerName : "",
      loaiHinhKinhDoanh: organizerType === "canhan" ? 1 : 2,
      maSoDKKD: organizerType === "canhan" ? "" : maSoDKKD,
      maSoThueCaNhan: organizerType === "canhan" ? maSoThueCaNhan : "",
      ngayCap: organizerType === "canhan" ? "" : ngayCap,
      noiCap: organizerType === "canhan" ? "" : noiCap,
      tenDoanhNghiep: organizerType === "canhan" ? "" : companyName,
      diaChi: addressValue,
      phoneNumber: phoneNumber,
      email: email,
      tenChuTaiKhoan: chuTaiKhoan,
      soTaiKhoan: soTaiKhoan,
      tenNganHang: tenNganHang,
      chiNhanh: chiNhanh,
      role: "organizer",
      anhDaiDienToChuc: avatarImage ? avatarImage[0]?.url : defaultAvatar,
      id: userId,
    };

    await uploadOrganizerInfo(thongTin).then(() => {
      setIsLoading(false);
      setTimeout(() => {}, 1000);
    });
  };
  return (
    <div className="grid-cols-1 grid gap-4 mb-6 mt-5">
      <h1 className="font-semibold">Thông tin cơ bản</h1>
      <div className="flex flex-col md:flex-row rounded bg-white p-4">
        <div className="md:basis-1/3 p-2 pr-3">
          {/* avatar */}
          <div className="flex flex-col items-center gap-y-3 w-full h-full justify-center">
            <div className="w-full flex flex-col gap-3 justify-center items-center h-full">
              <div className=" w-49 h-49 border-2 rounded-full">
                <Zoom key={1} className={"w-full "}>
                  <img
                    src={
                      avatarImageFile[0]?.preview ||
                      avatarImageFile[0]?.url ||
                      defaultAvatar
                    }
                    alt={avatarImageFile[0]?.name}
                    className={`h-48 w-48 rounded-full object-cover object-center`}
                  />
                </Zoom>
              </div>
              <FileDialog
                name="images"
                maxFiles={1}
                maxSize={1024 * 1024 * 4}
                files={avatarImageFile}
                setFiles={setAvatarImageFile}
                disabled={false}
              />
            </div>
          </div>
        </div>
        <div className="md:basis-2/3 p-2 space-y-2 pt-3">
          {/* ten doi tac */}
          {organizerType === "canhan" ? (
            <>
              <div className="flex flex-col gap-1 w-full ">
                <Label className="font-bold text-sm">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  variant="bordered"
                  size="md"
                  className="w-full h-[60px] "
                  radius="sm"
                  value={organizerName}
                  placeholder="Nhập tên cá nhân ban tổ chức"
                  onChange={(e) => {
                    setOrganizerName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 w-full ">
                <Label className="font-bold text-sm">
                  Mã số thuế cá nhân <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="w-full "
                  radius="sm"
                  variant="bordered"
                  size="md"
                  value={maSoThueCaNhan}
                  placeholder="Nhập mã số thuế cá nhân"
                  onChange={(e) => {
                    setMaSoThueCaNhan(e.target.value);
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1 w-full ">
                <Label className="font-bold text-sm">
                  Tên doanh nghiệp <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="w-full h-[52px]"
                  radius="sm"
                  variant="bordered"
                  size="md"
                  value={companyName}
                  placeholder="Nhập tên doanh nghiệp ban tổ chức"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 w-full ">
                <Label className="font-bold text-sm">
                  Mã số đăng ký kinh doanh{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="w-full h-[52px]"
                  radius="sm"
                  variant="bordered"
                  size="md"
                  value={maSoDKKD}
                  placeholder="Nhập mã số đăng ký kinh doanh"
                  onChange={(e) => {
                    setMaSoDKKD(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 w-full ">
                <Label className="font-bold text-sm">
                  Nơi cấp <span className="text-red-500">*</span>
                </Label>
                <Input
                  className="w-full h-[52px]"
                  radius="sm"
                  variant="bordered"
                  size="md"
                  value={noiCap}
                  placeholder="Nhập nơi cấp mã số đăng ký kinh doanh"
                  onChange={(e) => {
                    setNoiCap(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 w-full ">
                <Label className="font-bold text-sm">
                  Ngày cấp <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  radius="sm"
                  variant="bordered"
                  size="md"
                  className="w-full h-[52px]"
                  value={ngayCap}
                  placeholder="Chọn ngày cấp mã số đăng ký kinh doanh"
                  onChange={(e) => {
                    setNgayCap(e.target.value);
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <h1 className="font-semibold">Thông tin liên hệ</h1>
      <div className="flex flex-col flex-wrap rounded bg-white p-6 gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* so dien thoai */}
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              radius="sm"
              variant="bordered"
              size="md"
              value={phoneNumber}
              placeholder="Nhập số điện thoại"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Email liên hệ: <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              radius="sm"
              variant="bordered"
              size="md"
              value={email}
              type={"email"}
              placeholder="Nhập email liên hệ"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
        </div>
        <SelectAddress
          addressValue={addressValue}
          setAddressValue={setAddressValue}
        />
      </div>

      <h1 className="font-semibold">Thông tin ngân hàng</h1>
      <div className="flex flex-col flex-wrap rounded bg-white p-6 gap-2">
        <div className="grid grid-cols-1 gap-3">
          {/* so dien thoai */}
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Chủ tài khoản <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              radius="sm"
              variant="bordered"
              size="md"
              value={chuTaiKhoan}
              placeholder="Nhập tên chủ tài khoản"
              onChange={(e) => {
                setChuTaiKhoan(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Số tài khoản: <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              radius="sm"
              variant="bordered"
              size="md"
              value={soTaiKhoan}
              placeholder="Nhập số tài khoản"
              onChange={(e) => {
                setSoTaiKhoan(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Tên ngân hàng: <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              radius="sm"
              variant="bordered"
              size="md"
              value={tenNganHang}
              placeholder="Nhập tên ngân hàng"
              onChange={(e) => {
                setTenNganHang(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Chi nhánh: <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              radius="sm"
              variant="bordered"
              size="md"
              value={chiNhanh}
              placeholder="Nhập tên chi nhánh"
              onChange={(e) => {
                setChiNhanh(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center pt-6">
        <Button
          onClick={() => {
            onSubmit();
          }}
          className={`w-[100%] h-12 text-black bg-[#3BE1AA] hover:bg-[#2DD196] transition duration-300 ease-in-out active:scale-90`}
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
};
