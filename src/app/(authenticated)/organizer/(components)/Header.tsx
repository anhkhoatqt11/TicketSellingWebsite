"use client";

import { Navbar, NavbarBrand, NavbarContent, Button } from "@nextui-org/react";
import Logo from "@/components/logo";
import { BellIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import AuthSvg from "@/assets/AuthSvg";
import { main_color } from "../../../../../public/color";

const avatarNav = [
  {
    name: "Hồ sơ",
    href: "/user/profile",
  },
];

function Header({ session }) {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [user] = useState(session?.user);
  const router = useRouter();
  return (
    <div
      className={`flex justify-between p-6 py-3 h-fit w-full drop-shadow bg-[#3BE1AA] items-center border-b-1`}
    >
      <div className="flex items-center">
        <Logo />
        <div
          className="ml-3 mr-6 text-white font-bold"
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          TicketNow
        </div>
      </div>
      <div className="flex flex-row gap-3 max-w-full">
        <Dropdown
          shouldBlockScroll={true}
          onOpenChange={(open) => {
            setIsUserOpen(open);
          }}
          closeOnSelect={true}
          onClose={() => {
            setIsUserOpen(false);
          }}
          isOpen={isUserOpen}
        >
          <DropdownTrigger>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>Guest</AvatarFallback>
            </Avatar>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title={`${user?.name}`}>
              {avatarNav.map((item, index) => (
                <DropdownItem
                  onClick={() => {
                    router.push(item.href);
                  }}
                  className="w-full"
                  key={index}
                >
                  {item.name}
                </DropdownItem>
              ))}

              <DropdownItem
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                <div className="flex flex-row gap-2 items-center h-8  ">
                  <div className="">{AuthSvg.signIn()}</div>
                  <div>Logout</div>
                </div>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
