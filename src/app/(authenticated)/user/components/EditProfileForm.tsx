/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { SelectAddress } from "./SelectAddress";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { FileDialog } from "@/components/ui/FileDialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input, user } from "@nextui-org/react";
import { checkEmail, checkPhoneNumber } from "@/lib/utils";
import { Zoom } from "@/components/ui/zoom-image";
import { useUser } from "@/hooks/useUser";
import { Image } from "@nextui-org/react";
const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const EditProfileForm = ({ userId, setIsLoading }) => {
  const { startUpload } = useUploadThing("imageUploader");

  const [nameValue, setNameValue] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [avatarImageFile, setAvatarImageFile] = React.useState([]);
  const [defaultAvatar, setDefaultAvatar] = useState("");
  const [isLoaded, setIsLoaded] = React.useState(true);
  const { fetchUserInfoById, uploadUserInfo1 } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      // update session later
      const result = await fetchUserInfoById(userId);
      console.log(result);
      setNameValue(result?.name);
      setEmail(result?.email);
      setPhoneNumber(result?.phoneNumber);
      setAddressValue(result?.diaChi);
      setPassword(result?.password);
      setDefaultAvatar(result.avatar);
    };
    fetchUser().then(setIsLoading(false));
  }, []);

  const onSubmit = async () => {
    if (!addressValue || !phoneNumber || !email) {
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
    if (oldPassword || newPassword || confirmPassword) {
      // Kiểm tra xem mật khẩu cũ có đúng không
      if (password && oldPassword !== password) {
        toast.error("Mật khẩu cũ không đúng, vui lòng kiểm tra lại");
        return;
      }

      // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có khớp nhau không
      if (newPassword !== confirmPassword) {
        toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
        return;
      }
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
    const updatedPassword = newPassword || password;

    const thongTin = {
      name: nameValue,
      email: email,
      phoneNumber: phoneNumber,
      diaChi: addressValue,
      avatar: avatarImage ? avatarImage[0]?.url : defaultAvatar,
      id: userId,
      password: updatedPassword,
    };

    await uploadUserInfo1(thongTin).then(() => {
      setIsLoading(false);
      setTimeout(() => {}, 1000);
    });
  };
  return (
    <div className="grid-cols-1 grid gap-4 mb-6">
      <h1 className="text-2xl font-extrabold">Hồ sơ cá nhân</h1>
      <h1 className="font-semibold">Ảnh đại diện</h1>
      <div className="flex flex-col md:flex-row rounded bg-white p-4">
        <div className="p-2 pr-3">
          {/* avatar */}
          <div className="flex flex-col items-center gap-y-3 max-w-xs lg:max-w-lg">
            <div className="font-bold text-sm"></div>
            <div className=" w-full h-full border-2 rounded ml-auto">
              <Zoom key={1} className={"w-full "}>
                <Image
                  src={
                    avatarImageFile[0]?.preview ||
                    avatarImageFile[0]?.url ||
                    defaultAvatar
                  }
                  width={200}
                  height={200}
                  alt={avatarImageFile[0]?.name}
                  className={`h-40 w-full rounded-md object-cover object-center`}
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
              className={
                " bg-blue-700 hover:bg-blue-800 hover:text-white text-white"
              }
            />
          </div>
        </div>
      </div>

      <h1 className="font-semibold">Thông tin liên hệ</h1>
      <div className="flex flex-col flex-wrap rounded bg-white p-6 gap-2">
        <div className="flex flex-col gap-3 w-full">
          <Label className="font-bold text-sm">
            Họ và tên <span className="text-red-500">*</span>
          </Label>
          <Input
            isInvalid={nameValue !== "" ? false : true}
            errorMessage={`${
              nameValue !== "" ? "" : "Vui lòng nhập số điện thoại"
            }`}
            className="w-full"
            radius="sm"
            value={nameValue}
            placeholder="Nhập số điện thoại"
            onChange={(e) => {
              setNameValue(e.target.value);
            }}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* so dien thoai */}
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              isInvalid={phoneNumber !== "" ? false : true}
              errorMessage={`${
                phoneNumber !== "" ? "" : "Vui lòng nhập số điện thoại"
              }`}
              className="w-full"
              radius="sm"
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
              isInvalid={email !== "" ? false : true}
              errorMessage={`${
                email !== "" ? "" : "Vui lòng nhập email liên hệ"
              }`}
              className="w-full"
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
        <div className="box-border">
          <SelectAddress
            addressValue={addressValue}
            setAddressValue={setAddressValue}
          />
        </div>
      </div>
      <h1 className="font-semibold">Đổi mật khẩu</h1>
      <div className="flex flex-col flex-wrap rounded bg-white p-6 gap-2 w-[50%]">
        {/* mật khẩu cũ */}
        <div className="flex flex-col gap-3 w-full">
          <Label className="font-bold text-sm">Mật khẩu cũ</Label>
          <Input
            type="password"
            className="w-full"
            radius="sm"
            value={oldPassword}
            placeholder="Nhập mật khẩu cũ"
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        {/* mật khẩu mới */}
        <div className="flex flex-col gap-3 w-full">
          <Label className="font-bold text-sm">Mật khẩu mới</Label>
          <Input
            type="password"
            className="w-full"
            radius="sm"
            value={newPassword}
            placeholder="Nhập mật khẩu mới"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* xác nhận mật khẩu mới */}
        <div className="flex flex-col gap-3 w-full">
          <Label className="font-bold text-sm">Xác nhận mật khẩu mới</Label>
          <Input
            type="password"
            className="w-full"
            radius="sm"
            value={confirmPassword}
            placeholder="Xác nhận mật khẩu mới"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center pt-6">
        <Button
          onClick={() => {
            onSubmit();
          }}
          className="w-[100%] h-12 text-white bg-blue-700 hover:bg-blue-800 transition duration-300 ease-in-out active:scale-90"
        >
          Xác nhận
        </Button>
      </div>
    </div>
  );
};
