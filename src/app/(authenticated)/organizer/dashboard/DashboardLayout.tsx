"use client";

import React, { useEffect } from "react";
import DashBoard from "./DashBoard";

const DashboardLayout = () => {
  return (
    <div className="w-full h-full mt-5 pl-7 pr-7">
      <div className="flex flex-col md:flex-row w-full">
        <DashBoard />
      </div>
    </div>
  );
};

export default DashboardLayout;
