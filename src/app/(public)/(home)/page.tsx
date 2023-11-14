"use client";

import React from "react";
import ButtonTest from "./component/ButtonTest";
import { Button } from "@/components/ui/button";
import DialogCustom from "@/components/ui/dialogCustom";
import NavigationBar from "./component/NavigationBar";
import ContentSection from "./component/ContentSection";

const page = () => {
  return (
    <div className="flex flex-row">
      <NavigationBar></NavigationBar>
      <ContentSection></ContentSection>
    </div>
  );
};

export default page;
