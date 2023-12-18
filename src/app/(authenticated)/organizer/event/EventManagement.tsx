"use client";

import React, { useState } from "react";
import EventListComponent from "../(components)/(event)/EventListComponent";
import SearchAndCreateBar from "../(components)/(event)/SearchAndCreateBar";

export function EventManagement({ session }) {
  const [searchWord, setSearchWord] = useState("");

  return (
    <>
      <SearchAndCreateBar setSearchWord={setSearchWord} />
      <EventListComponent props={searchWord} session={session} />
    </>
  );
}
