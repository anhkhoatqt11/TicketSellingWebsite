import Image from "next/image";
import Link from "next/link";
import React from "react";

function LicenseLogo() {
  return (
    <Link className="mr-2" href={"/"}>
      <div className="items-center w-full flex flex-row gap-2">
        <img alt="TicketBox" src="/license1.jpg" />
      </div>
    </Link>
  );
}

export default LicenseLogo;
