import { useCategory } from "@/hooks/useCategory";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import NavbarLinks from "./NavbarLinks";
const NavigationBar = () => {
  const { fetchAllCategories } = useCategory();
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => {
      const res = fetchAllCategories();
      return res;
    },
  });
  useEffect(() => {
    console.log(data);
  });
  return (
    <>
      <div className="bg-gray-100 w-[20%]">
        <NavbarLinks data={data} />
      </div>
    </>
  );
};

export default NavigationBar;
