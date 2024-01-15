"use client";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CommonSvg } from "@/assets/CommonSvg";
import Link from "next/link";
import Logo from "../logo";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import UserIcon from "../userprofileicon";
import TicketIcon from "../ticketicon";
import OrganizerIcon from "../nhatochucicon";
import LogoutIcon from "../logouticon";
import { signOut } from "next-auth/react";
import { Separator } from "@radix-ui/react-separator";
import { Divide } from "lucide-react";
import { Divider } from "@nextui-org/react";
import AdminIcon from "../adminicon";
const avatarNav = [
  {
    name: "Hồ sơ",
    href: "/user/profile",
    icon: <UserIcon className="mr-2 ms-3 w-6 h-6" />,
  },
  {
    name: "Vé của tôi",
    href: "/user/my-ticket",
    icon: <TicketIcon className="mr-2 ms-3 w-6 h-6" />,
  },
  {
    name: "Nhà tổ chức",
    href: "/organizer/profile",
    icon: <OrganizerIcon className="mr-2 ms-3 w-6 h-6" />,
  },
];
const adminAvatarNav = [
  {
    name: "Hồ sơ",
    href: "/user/profile",
    icon: <UserIcon className="mr-2 ms-3 w-6 h-6" />,
  },
  {
    name: "Vé của tôi",
    href: "/user/my-ticket",
    icon: <TicketIcon className="mr-2 ms-3 w-6 h-6" />,
  },
  {
    name: "Nhà tổ chức",
    href: "/organizer/profile",
    icon: <OrganizerIcon className="mr-2 ms-3 w-6 h-6" />,
  },
  {
    name: "Trang admin",
    href: "/admin",
    icon: <AdminIcon className="mr-2 ms-3 w-6 h-6" />,
  },
];
export function MobileNav({ session }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useState(session?.user);
  const [HeaderNav, setHeaderNav] = useState(avatarNav);
  useEffect(() => {
    if (user?.role === "admin") {
      setHeaderNav(adminAvatarNav);
    }
  }, []);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <div className="flex flex-row h-full lg:hidden">
          <Button
            variant="ghost"
            className="h-full p-0 text-base hover:bg-transparent
          focus-visible:bg-transparent focus-visible:ring-0 
          focus-visible:ring-offset-0 lg:hidden text-white"
          >
            {CommonSvg.menuBurger()}
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="flex ml-auto items-center lg:hidden">
            <Logo />
          </div>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="pl-0 pr-0">
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 px-8">
          {user ? (
            <>
              <div className="flex flex-row items-center">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>Guest</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div>Xin chào</div>
                  <div className="font-semibold text-blue-700">{user.name}</div>
                </div>
              </div>
              <div className="mt-6">
                {HeaderNav.map((item, index) => (
                  <>
                    <Link href={item.href} key={index}>
                      <div className="flex flex-row items-center py-3">
                        {item.icon}
                        <div>{item.name}</div>
                      </div>
                      <Divider />
                    </Link>
                  </>
                ))}
                <Link onClick={() => signOut()} href={"/auth/login"}>
                  <div className="flex flex-row items-center py-3">
                    <LogoutIcon className="mr-2 ms-3 w-6 h-6" />
                    <div>Đăng xuất</div>
                  </div>
                </Link>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="pr-6">
                Hãy
                {
                  <Link href={"/auth/login"}>
                    <span className="font-bold text-blue-700"> đăng nhập </span>
                  </Link>
                }
                để đặt cho mình những chiếc vé sớm nhất.
              </div>
              <div className="pr-6">
                Chưa có tài khoản?
                {
                  <Link href={"/auth/register"}>
                    <span className="font-bold text-blue-700">
                      {" "}
                      Đăng kí ngay!{" "}
                    </span>
                  </Link>
                }
              </div>
            </>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
