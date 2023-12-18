import React from "react";
import EventCarousel from "./EventCarousel";
import ListComponent from "./ListComponent";
const ContentSection = () => {
  return (
    <div className="bg-grey-200 flex flex-1 flex-col items-center">
      <EventCarousel />
      <ListComponent />
    </div>
  );
};

export default ContentSection;
