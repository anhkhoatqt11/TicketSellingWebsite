"use client";

import { Label } from "@/components/ui/label";
import { Button, Divider, Input, Textarea } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { DatePicker } from "@/components/ui/date-picker";

function TicketInformation({ props }) {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  const [colorTicket, setColorTicket] = useState("#ff0000");
  const onSubmit = () => console.log(colorTicket);
  return (
    <div className="grid-cols-1 grid gap-4 mb-6 mt-5">
      <h1 className="font-semibold">Hệ thống vé</h1>
      <div className="rounded bg-white p-4">
        <div className="gap-6 mt-3">
          <div className="mb-3 flex flex-row gap-3">
            <Input
              className="w-full"
              radius="sm"
              // value={email}
              placeholder="Nhập tên loại vé"
              // onChange={(e) => {
              //   setEmail(e.target.value);
              // }}
            />
            <Button className="w-1/3 bg-emerald-400 text-white" radius="sm">
              Tạo vé mới
            </Button>
          </div>
          <Accordion selectionMode="multiple">
            <AccordionItem
              key="1"
              aria-label="Chung Miller"
              indicator={<CiEdit className="h-6 w-6" />}
              startContent={
                <Avatar
                  isBordered
                  color="primary"
                  radius="lg"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
              }
              subtitle="4 unread messages"
              title="Chung Miller"
            >
              <div className="space-y-3">
                <Input
                  className="w-full"
                  radius="sm"
                  // value={email}
                  placeholder="Nhập tên loại vé"
                  // onChange={(e) => {
                  //   setEmail(e.target.value);
                  // }}
                />
                <Textarea label="Mô tả vé" placeholder="Nhập mô tả loại vé" />
                <div className="flex h-20 items-center space-x-4 text-small">
                  <div className="space-y-3">
                    <div className="flex flex-row gap-2">
                      <h1 className="leading-10 text-sm w-[150px]">
                        Ngày bắt đầu bán:{" "}
                      </h1>
                      <DatePicker
                        date={undefined}
                        setDate={function (date: Date): void {
                          throw new Error("Function not implemented.");
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-2">
                      <h1 className="leading-10 text-sm w-[150px]">
                        Ngày kết thúc bán:{" "}
                      </h1>
                      <DatePicker
                        date={undefined}
                        setDate={function (date: Date): void {
                          throw new Error("Function not implemented.");
                        }}
                      />
                    </div>
                  </div>
                  <Divider orientation="vertical" />
                  <div>
                    <label htmlFor="favcolor" className="mr-2">
                      Chọn màu vé:
                    </label>
                    <input
                      type="color"
                      id="favcolor"
                      name="favcolor"
                      className="mt-2"
                      value={colorTicket}
                      onChange={(e) => setColorTicket(e.target.value)}
                    />
                  </div>
                </div>
                <Divider className="my-4" />
                <div className="flex h-20 items-center space-x-4 text-small">
                  <div className="flex flex-col gap-2">
                    <h1 className="leading-10 text-sm w-full text-center">
                      {`Giá vé (VNĐ)`}
                    </h1>
                    <Input
                      className="w-full"
                      radius="sm"
                      // value={email}
                      // onChange={(e) => {
                      //   setEmail(e.target.value);
                      // }}
                    />
                  </div>
                  <Divider orientation="vertical" />
                  <div className="flex flex-col gap-2">
                    <h1 className="leading-10 text-sm w-full text-center">
                      {`Tổng số lượng vé`}
                    </h1>
                    <Input
                      className="w-full"
                      radius="sm"
                      // value={email}
                      // onChange={(e) => {
                      //   setEmail(e.target.value);
                      // }}
                    />
                  </div>
                  <Divider orientation="vertical" />
                  <div className="flex flex-col gap-2">
                    <h1 className="leading-10 text-sm w-full text-center">
                      {`Số vé tối thiểu trong một đơn hàng`}
                    </h1>
                    <Input
                      className="w-full"
                      radius="sm"
                      // value={email}
                      // onChange={(e) => {
                      //   setEmail(e.target.value);
                      // }}
                    />
                  </div>
                  <Divider orientation="vertical" />
                  <div className="flex flex-col gap-2">
                    <h1 className="leading-10 text-sm w-full text-center">
                      {`Số vé tối đa trong một đơn hàng`}
                    </h1>
                    <Input
                      className="w-full"
                      radius="sm"
                      // value={email}
                      // onChange={(e) => {
                      //   setEmail(e.target.value);
                      // }}
                    />
                  </div>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default TicketInformation;
