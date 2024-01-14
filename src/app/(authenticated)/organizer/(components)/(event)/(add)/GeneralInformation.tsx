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
import { useTopic } from "@/hooks/useTopic";
import { hover_color, main_color } from "../../../../../../../public/color";

function GeneralInformation({ props }) {
  const [topicList, setTopicList] = useState([]);
  const { fetchTopic } = useTopic();
  useEffect(() => {
    const getTopic = async () => {
      props.setIsLoading(true);
      await fetchTopic().then((res) => {
        setTopicList(res);
        props.setIsLoading(false);
      });
    };
    getTopic();
  }, []);
  return (
    <div className="grid-cols-1 grid gap-4 mb-6 mt-5">
      <h1 className="font-semibold text-xl">Thông tin sự kiện</h1>
      {/* avatar */}
      <div className="flex flex-col gap-3 w-full rounded bg-white p-4">
        <div className=" w-full h-41 border-1 rounded">
          <img
            src={
              props.eventPosterFile[0]?.preview ||
              props.eventPosterFile[0]?.url ||
              props.defaultPoster
            }
            alt={props.eventPosterFile[0]?.name}
            className={`h-[360px] w-full rounded-md object-cover object-center`}
          />
        </div>
        <FileDialog
          name="images"
          maxFiles={1}
          maxSize={1024 * 1024 * 4}
          files={props.eventPosterFile}
          setFiles={props.setEventPosterFile}
          disabled={false}
          className={`p-0 px-6 bg-[#3BE1AA] hover:bg-[#2DD196]  text-white hover:text-white`}
        />
        {/* thong tin khac */}
        <div className="gap-6 mt-6">
          {/* so dien thoai */}
          <div className="flex flex-col gap-3 w-full">
            <Label className="font-bold text-sm">
              Tên sự kiện: <span className="text-red-500">*</span>
            </Label>
            <Input
              className="w-full"
              radius="sm"
              variant="bordered"
              size="md"
              value={props.eventName}
              placeholder="Nhập tên sự kiện"
              onChange={(e) => {
                props.setEventName(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="box-border">
          <SelectAddress
            addressValue={props.addressValue}
            setAddressValue={props.setAddressValue}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label className="font-bold text-sm">Chủ đề:</Label>
          <div className="flex flex-col gap-1 w-full">
            <RadioGroup
              label="Chọn loại sự kiện"
              orientation="horizontal"
              value={props.typeEventSelected}
              onValueChange={props.setTypeEventSelected}
            >
              {topicList.map((item) => (
                <CustomRadio key={item?.id} value={item?.id}>
                  {item?.name}
                </CustomRadio>
              ))}
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label className="font-bold text-sm">Mô tả:</Label>
          <EditorCustom
            contentValue={props.contentValue}
            // data={data?.policy}
            setContentValue={props.setContentValue}
            disabled={false}
          />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Label className="font-bold text-sm">Ngày sự kiện:</Label>
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex flex-row gap-2 items-center">
              <h1 className="leading-10 text-sm w-[60px]">Bắt đầu: </h1>
              <DatePicker date={props.startDate} setDate={props.setStartDate} />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <h1 className="leading-10 text-sm w-[60px]">Kết thúc: </h1>
              <DatePicker date={props.endDate} setDate={props.setEndDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralInformation;
