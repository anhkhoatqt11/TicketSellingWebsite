"use client";
import { Button, Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { BiBookAdd } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-hook-form";
import { useRouter } from "next/navigation";
import { main_color } from "../../../../../../public/color";

export function SearchAndCreateBar({ setSearchWord }) {
  const [searchKey, setSearchKey] = useState("");
  try {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchSubmit();
    });
  } catch (except) {}
  const searchSubmit = () => {
    setSearchWord(searchKey);
  };
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 md:flex-row md:justify-between mr-6 md:mr-0">
      <div className="flex flex-row">
        <Input
          className="h-[52px] w-full md:w-[270px] bg-white"
          variant="bordered"
          radius="sm"
          label="Nhập tên sự kiện ..."
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button
          className="h-[52px] w-[0px] rounded-md m-0 p-0 -ml-[50px] min-w-unit-12 bg-transparent"
          onClick={searchSubmit}
        >
          <MagnifyingGlassIcon className={`h-6 w-6 text-[#2DD196]`} />
        </Button>
      </div>
      {/* <Button
        className="h-[52px] w-full md:w-[200px] rounded-md m-0 p-0 font-medium bg-emerald-400 text-base text-white mr-6 md:mr-6"
        onClick={() => {
          router.push("/organizer/event/add");
        }}
      >
        <BiBookAdd />
        Tạo sự kiện
      </Button> */}
    </div>
  );
}

export default SearchAndCreateBar;
