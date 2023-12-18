import { useCategory } from "@/hooks/useCategory";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import NavbarLinks from "./NavbarLinks";
import Loader from "@/components/Loader";
const NavigationBar = () => {
  const { fetchAllCategories } = useCategory();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn: () => {
      const res = fetchAllCategories();
      setIsLoading(true);
      return res;
    },
  });
  useEffect(() => {
    console.log(data);
  });
  return (
    <>
      <div className="bg-gray-100 w-full lg:basis-1/4">
        {!isLoading ? (
          <div className="flex h-screen items-center justify-center">
            <Loader />
          </div>
        ) : (
          <NavbarLinks data={data} />
        )}
      </div>
    </>
  );
};

export default NavigationBar;
