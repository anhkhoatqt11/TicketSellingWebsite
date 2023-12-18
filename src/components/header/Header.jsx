/* eslint-disable no-undef */
"use client";

import React, { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import "./styles.css";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { signOut } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import AuthSvg from "@/assets/AuthSvg";
import { MobileNav } from "./MobileNavBar";
import Logo from "../logo";
import { BsTicketPerforated } from "react-icons/bs";
import BackDropCus from "../backdropCus/backdropCus";
import { useRouter, usePathname } from "next/navigation";

const avatarNav = [
  {
    name: "Hồ sơ",
    href: "/agency",
  },
  {
    name: "Thêm sản phẩm",
    href: "/admin/add-product",
  },
  {
    name: "Team",
    href: "/admin/add-product",
  },
];

const NavigationMenuDemo = ({ session }) => {
  const [user] = useState(session?.user);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState("translate-y-0");
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  });
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY) {
        setShow("-translate-y-[82px]");
      } else {
        setShow("shadow-sm");
      }
    } else {
      setShow("translate-y-0");
    }
    setLastScrollY(window.scrollY);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      router.push(`/search?searchWord=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div
      className={`w-full h-[50px] md:h-[76px] 
    bg-white  items-center justify-between z-20
    sticky top-0 transition-transform duration-300 px-14 shadow-sm
    ${show}
    `}
    >
      <MobileNav />

      <div className="hidden lg:flex py-2 items-center h-full ">
        {isUserOpen ? <BackDropCus isOpen={isUserOpen} /> : null}
        {<Logo />}
        {pathname !== "/search" ? (
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered md:w-[500px] ml-5 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyPress}
            />
          </div>
        ) : null}
        {user ? (
          <div className="flex flex-row gap-5 items-center justify-center ml-auto">
            <div className="box-border w-full h-full flex gap-10">
              {
                <div className="flex gap-16">
                  <div>
                    <Link href="#">
                      <Button className="!box-content h-7 w-full rounded-full bg-blue-700 hover:bg-blue-800">
                        Tạo sự kiện
                      </Button>
                    </Link>
                  </div>
                  <div className="flex items-center">
                    <Link href={"/user/my-ticket"}>
                      <BsTicketPerforated
                        size={25}
                        className="hover:text-blue-700"
                      />
                    </Link>
                  </div>
                </div>
              }

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
        ) : (
          <div className="ml-auto mr-8">
            <Link href={"/auth/login"}>
              <Button className="!box-content h-8 w-full rounded-full bg-green-500">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const ListItem = React.forwardRef(
  ({ children, title, ...props }, forwardedRef) => (
    <li>
      <NavigationMenu.Link asChild>
        <a className={"ListItemLink"} {...props} ref={forwardedRef}>
          <div className="ListItemHeading">{title}</div>
          <p className="ListItemText">{children}</p>
        </a>
      </NavigationMenu.Link>
    </li>
  )
);

export default NavigationMenuDemo;
