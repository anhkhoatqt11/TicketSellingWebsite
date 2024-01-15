"use client";

import { Navbar, NavbarBrand, NavbarContent, Button } from "@nextui-org/react";
import Logo from "@/components/logo";
import { BellIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import AuthSvg from "@/assets/AuthSvg";

const avatarNav = [];

function Header({ session }) {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [user] = useState(session?.user);
  const router = useRouter();
  const pathanme = usePathname();

  return (
    <Navbar shouldHideOnScroll className="bg-gray-50 justify-end shadow-md">
      <NavbarContent as="div" justify="end">
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
              <AvatarImage src={session?.user?.avatar} />
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
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
