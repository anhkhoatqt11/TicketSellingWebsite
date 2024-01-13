"use client";

import React from "react";
import { Button, Input } from "@nextui-org/react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { main_color } from "../../../../../../public/color";

export function UserListSearch({ setSearchWord }) {
  const [searchKey, setSearchKey] = React.useState("");
  try {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchSubmit();
    });
  } catch (except) {}
  const searchSubmit = () => {
    setSearchWord(searchKey);
  };

  return (
    <div className="flex flex-row">
      <Input
        className="h-[52px] w-full md:w-[270px] bg-white"
        variant="bordered"
        radius="sm"
        label="Nhập tên người dùng ..."
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <Button
        className="h-[52px] w-[0px] rounded-md m-0 p-0 -ml-[50px] min-w-unit-12 bg-transparent"
        onClick={searchSubmit}
      >
        <MagnifyingGlassIcon className={`h-6 w-6 text-[${main_color}]`} />
      </Button>
    </div>
  );
}

export default UserListSearch;
