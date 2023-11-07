"use client";

import React, { useEffect, useState } from "react";
import { SelectAddress } from "./SelectAddress";
import { generateReactHelpers } from "@uploadthing/react/hooks";
// import { OurFileRouter } from '@/app/api/uploadthing/core';
import { FileDialog } from "@/components/ui/FileDialog";
import { ImageList } from "@/components/ui/ImageList";
import { Button } from "@/components/ui/button";
// import { useDoiTac } from '@/hooks/useDoiTac';
import DialogCustom from "@/components/ui/dialogCustom";
// import { PartnerName } from './PartnerName';
// import { PhoneNumber } from './PhoneNumber';
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@nextui-org/react";
import { useOrganizer } from "@/hooks/useOrganizer";
import { checkEmail, checkPhoneNumber } from "@/lib/utils";

// const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const RegisterForm = ({ organizerType }) => {
  //   const { startUpload } = useUploadThing('imageUploader');

  const [organizerName, setOrganizerName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [maSoThueCaNhan, setMaSoThueCaNhan] = useState("");
  const [maSoDKKD, setMaSoDKKD] = useState("");
  const [noiCap, setNoiCap] = useState("");
  const [ngayCap, setNgayCap] = useState("");

  const [avatarImageFile, setAvatarImageFile] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { fetchOrganizerById, uploadOrganizerInfo } = useOrganizer();
  useEffect(() => {
    const fetchOrganizer = async () => {
      // update session later
      const result = await fetchOrganizerById(1);
      setPhoneNumber(result[0]?.phoneNumber);
      console.log(result[0]);
      setEmail(result[0]?.email);
      setAddressValue(result[0]?.diaChi);
    };
    fetchOrganizer();
  }, []);

  //   const { uploadDoiTacInfo } = useDoiTac();

  const onSubmit = async () => {
    if (
      !addressValue ||
      !phoneNumber ||
      !email ||
      (organizerType === "canhan" && (!organizerName || !maSoThueCaNhan)) ||
      (organizerType === "doanhnghiep" &&
        (!companyName || !maSoDKKD || !ngayCap || !noiCap))
    ) {
      toast.error("Vui lòng nhập tất cả thông tin");
      return;
    }
    if (checkEmail(email)) {
      toast.error("Email không đúng định dạng, vui lòng nhập lại");
      return;
    }
    if (checkPhoneNumber(phoneNumber)) {
      toast.error("Số điện thoại không hợp lệ, vui lòng nhập lại");
      return;
    }
    // const [nationalIDFrontImage, nationalIDBackImage, giayPhepKinhDoanhImages] = await Promise.all([
    //   startUpload([...nationalIDFrontImageFile]).then((res) => {
    //     const formattedImages = res?.map((image) => ({
    //       id: image.key,
    //       name: image.key.split('_')[1] ?? image.key,
    //       url: image.url,
    //     }));
    //     return formattedImages ?? null;
    //   }),
    // ]);

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
      // anhChanDung: anhChanDungImageFiles ? JSON.stringify([...anhChanDungImageFiles]) : null,
      id: 1,
    };

    setIsSubmitting(true);
    await uploadOrganizerInfo(thongTin).then((data) => console.log(data));
  };
  return (
    <div className="grid-cols-1 grid gap-4 mb-6 mt-5">
      <h1 className="font-semibold">Thông tin cơ bản</h1>
      <div className="flex flex-row flex-wrap rounded bg-white p-4">
        <div className="basis-1/3 p-2 pr-3">
          {/* avatar */}
          <div className="flex flex-col gap-y-3 max-w-xs lg:max-w-lg">
            <div className="font-bold text-sm"></div>
            <div className=" w-full h-40">
              <ImageList
                className={"w-full h-40 border-2 rounded"}
                files={avatarImageFile}
                height={40}
                width={40}
              />
            </div>
            <FileDialog
              name="images"
              maxFiles={1}
              maxSize={1024 * 1024 * 4}
              files={avatarImageFile}
              setFiles={setAvatarImageFile}
              disabled={false}
              className={" bg-emerald-400 z-50"}
            />
          </div>
        </div>
        <div className="basis-2/3 p-2 space-y-4 pt-3">
          {/* ten doi tac */}
          {organizerType === "canhan" ? (
            <>
              <div className="flex flex-col gap-1 max-w-xs lg:max-w-2xl ">
                <Label className="font-bold text-sm">
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <Input
                  isInvalid={organizerName !== "" ? false : true}
                  errorMessage={`${
                    organizerName !== "" ? "" : "Vui lòng nhập họ tên cá nhân"
                  }`}
                  className="max-w-xs lg:max-w-2xl h-[60px]"
                  radius="sm"
                  value={organizerName}
                  placeholder="Nhập tên cá nhân ban tổ chức"
                  onChange={(e) => {
                    setOrganizerName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 max-w-xs lg:max-w-2xl ">
                <Label className="font-bold text-sm">
                  Mã số thuế cá nhân <span className="text-red-500">*</span>
                </Label>
                <Input
                  isInvalid={maSoThueCaNhan !== "" ? false : true}
                  errorMessage={`${
                    maSoThueCaNhan !== ""
                      ? ""
                      : "Vui lòng nhập mã số thuế cá nhân"
                  }`}
                  className="max-w-xs lg:max-w-2xl "
                  radius="sm"
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
              <div className="flex flex-col gap-1 max-w-xs lg:max-w-2xl ">
                <Label className="font-bold text-sm">
                  Tên doanh nghiệp <span className="text-red-500">*</span>
                </Label>
                <Input
                  isInvalid={companyName !== "" ? false : true}
                  errorMessage={`${
                    companyName !== "" ? "" : "Vui lòng nhập tên doanh nghiệp"
                  }`}
                  className="max-w-xs lg:max-w-2xl h-[52px]"
                  radius="sm"
                  value={companyName}
                  placeholder="Nhập tên doanh nghiệp ban tổ chức"
                  onChange={(e) => {
                    setCompanyName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 max-w-xs lg:max-w-2xl ">
                <Label className="font-bold text-sm">
                  Mã số đăng ký kinh doanh{" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  isInvalid={maSoDKKD !== "" ? false : true}
                  errorMessage={`${
                    maSoDKKD !== ""
                      ? ""
                      : "Vui lòng nhập mã số đăng ký kinh doanh"
                  }`}
                  className="max-w-xs lg:max-w-2xl h-[52px]"
                  radius="sm"
                  value={maSoDKKD}
                  placeholder="Nhập mã số đăng ký kinh doanh"
                  onChange={(e) => {
                    setMaSoDKKD(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 max-w-xs lg:max-w-2xl ">
                <Label className="font-bold text-sm">
                  Nơi cấp <span className="text-red-500">*</span>
                </Label>
                <Input
                  isInvalid={noiCap !== "" ? false : true}
                  errorMessage={`${
                    noiCap !== ""
                      ? ""
                      : "Vui lòng nhập nơi cấp mã số đăng ký kinh doanh"
                  }`}
                  className="max-w-xs lg:max-w-2xl h-[52px]"
                  radius="sm"
                  value={noiCap}
                  placeholder="Nhập nơi cấp mã số đăng ký kinh doanh"
                  onChange={(e) => {
                    setNoiCap(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-1 max-w-xs lg:max-w-2xl ">
                <Label className="font-bold text-sm">
                  Ngày cấp <span className="text-red-500">*</span>
                </Label>
                <Input
                  isInvalid={ngayCap !== "" ? false : true}
                  errorMessage={`${
                    ngayCap !== "" ? "" : "Vui lòng chọn ngày cấp"
                  }`}
                  type="date"
                  radius="sm"
                  className="max-w-xs lg:max-w-2xl h-[52px]"
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
        <div className="grid grid-cols-2 gap-6">
          {/* so dien thoai */}
          <div className="flex flex-col gap-3 max-w-xs lg:max-w-2xl ">
            <Label className="font-bold text-sm">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              isInvalid={phoneNumber !== "" ? false : true}
              errorMessage={`${
                phoneNumber !== "" ? "" : "Vui lòng nhập số điện thoại"
              }`}
              className="max-w-xs lg:max-w-2xl "
              radius="sm"
              value={phoneNumber}
              placeholder="Nhập số điện thoại"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-3 max-w-xs lg:max-w-2xl ">
            <Label className="font-bold text-sm">
              Email liên hệ: <span className="text-red-500">*</span>
            </Label>
            <Input
              isInvalid={email !== "" ? false : true}
              errorMessage={`${
                email !== "" ? "" : "Vui lòng nhập email liên hệ"
              }`}
              className="max-w-xs lg:max-w-2xl "
              radius="sm"
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
        <h1>Not completed</h1>
      </div>

      <div className="w-full flex items-center justify-center pt-6">
        <Button
          disabled={isSubmitting}
          onClick={() => {
            onSubmit();
          }}
          className="w-[100%] h-12 text-black bg-emerald-400 hover:bg-emerald-500 transition duration-300 ease-in-out active:scale-90"
        >
          Xác nhận
        </Button>
      </div>
      {isSubmitting && (
        <DialogCustom
          className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
          isModalOpen={isSubmitting}
          notShowClose={true}
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="text-center font-semibold text-xs sm:text-sm">
              Thông tin ban tổ chức đã được lưu vào hồ sơ.
            </div>
          </div>
        </DialogCustom>
      )}
    </div>
  );
};
