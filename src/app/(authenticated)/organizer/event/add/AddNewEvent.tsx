"use client";

import React, { useState } from "react";
import GeneralInformation from "../../(components)/(event)/(add)/GeneralInformation";
import TicketInformation from "../../(components)/(event)/(add)/TicketInformation";

export function AddNewEvent({ session }) {
  return (
    <>
      <GeneralInformation props={undefined} />
      <TicketInformation props={undefined} />
    </>
  );
}
