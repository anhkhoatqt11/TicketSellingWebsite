"use client";
import React, { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import { ListComponent } from "./ListComponent";
export interface searchType {
  searchWord: string;
  location: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  chuDeId: string;
}
const SearchLayout = () => {
  const [searchProps, setSearchProps] = useState<searchType>();
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  useEffect(() => {
    setProps();
  }, []);
  const setProps = () => {
    setSearchProps({
      searchWord: "",
      location: "",
      ngayBatDau: "",
      ngayKetThuc: "",
      chuDeId: "",
    });
  };
  return (
    <div className="flex flex-col w-full">
      <SearchComponent setSearchProps={setSearchProps} />

      <ListComponent searchProps={searchProps} />
    </div>
  );
};

export default SearchLayout;
