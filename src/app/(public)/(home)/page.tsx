"use client";

import React from "react";
import NavigationBar from "./components/NavigationBar";
import ContentSection from "./components/ContentSection";

const page = () => {
  return (
    <div className="w-full min-h-screen h-full flex flex-col lg:flex-row">
      <NavigationBar></NavigationBar>
      <ContentSection></ContentSection>
    </div>
  );
};

export default page;
