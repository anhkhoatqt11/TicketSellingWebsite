/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { SelectAddress } from "../../(organizerRegister)/SelectAddress";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { FileDialog } from "@/components/ui/FileDialog";
import { ImageList } from "@/components/ui/ImageList";
import { Button } from "@/components/ui/button";
import DialogCustom from "@/components/ui/dialogCustom";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input, RadioGroup, Textarea } from "@nextui-org/react";
import { useOrganizer } from "@/hooks/useOrganizer";
import { checkEmail, checkPhoneNumber } from "@/lib/utils";
import { url } from "inspector";
import { Zoom } from "@/components/ui/zoom-image";
import { CustomRadio } from "@/components/ui/CustomRadio";
import EditorCustom from "@/components/editorCus/EditorCustom";
import { DatePicker } from "@/components/ui/date-picker";

function GeneralInformation({ props }) {
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
  const [typeEventSelected, setTypeEventSelected] = React.useState("");
  const [contentValue, setContentValue] = useState("");

  return (
    <div className="grid-cols-1 grid gap-4 mb-6 mt-5">
      <h1 className="font-semibold">Thông tin sự kiện</h1>
      <div className="rounded bg-white p-4">
        {/* avatar */}
        <div className="flex flex-col gap-y-3 w-full">
          <div className=" w-full h-41 border-2 rounded">
            <Zoom key={1} className={"w-full h-[360px]"}>
              <img
                src={avatarImageFile[0]?.preview || avatarImageFile[0]?.url}
                alt={avatarImageFile[0]?.name}
                className={`h-[360px] w-full rounded-md object-cover object-center`}
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
            className={" bg-emerald-400"}
          />
          {/* thong tin khac */}
          <div className="gap-6 mt-6">
            {/* so dien thoai */}
            <div className="flex flex-col gap-3 w-full">
              <Label className="font-bold text-sm">
                Tên sự kiện: <span className="text-red-500">*</span>
              </Label>
              <Input
                isInvalid={email !== "" ? false : true}
                errorMessage={`${
                  email !== "" ? "" : "Vui lòng nhập tên sự kiện"
                }`}
                className="w-full"
                radius="sm"
                value={email}
                placeholder="Nhập tên sự kiện"
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
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">Chủ đề:</Label>
            <div className="flex flex-col gap-1 w-full">
              <RadioGroup
                label="Chọn loại sự kiện"
                orientation="horizontal"
                value={typeEventSelected}
                onValueChange={setTypeEventSelected}
              >
                <CustomRadio value="buenos-aires">Buenos Aires</CustomRadio>
                <CustomRadio value="sydney">Sydney</CustomRadio>
                <CustomRadio value="san-francisco">San Francisco</CustomRadio>
                <CustomRadio value="london">London</CustomRadio>
                <CustomRadio value="tokyo">Tokyo</CustomRadio>
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">Mô tả:</Label>
            <EditorCustom
              contentValue={contentValue}
              // data={data?.policy}
              setContentValue={setContentValue}
              disabled={false}
            />
            {/* <Textarea /> */}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">Ngày sự kiện:</Label>
            {/* <Input
                isInvalid={email !== "" ? false : true}
                errorMessage={`${
                  email !== "" ? "" : "Vui lòng nhập tên sự kiện"
                }`}
                className="w-full"
                radius="sm"
                value={DatePicker}
                placeholder="Nhập tên sự kiện"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              /> */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex flex-row gap-2">
                <h1 className="leading-10 text-sm w-[60px]">Bắt đầu: </h1>
                <DatePicker
                  date={undefined}
                  setDate={function (date: Date): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
              <div className="flex flex-row gap-2">
                <h1 className="leading-10 text-sm w-[60px]">Kết thúc: </h1>
                <DatePicker
                  date={undefined}
                  setDate={function (date: Date): void {
                    throw new Error("Function not implemented.");
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInformation;
