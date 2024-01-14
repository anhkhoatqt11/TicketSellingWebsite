"use client";

import * as React from "react";
import { Heading } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import classnames from "classnames";
import * as Collapsible from "@radix-ui/react-collapsible";
import Logo from "@/components/logo";
import { usePathname } from "next/navigation";
import { main_color } from "../../../../../public/color";

type SidebarElement = React.ElementRef<"aside">;
type RootProps = React.ComponentPropsWithoutRef<"aside">;

interface NavItem {
  title: string;
  value: string;
  icon: React.ReactNode; // Icon component or SVG
}

interface SidebarProps extends RootProps {
  navItems: NavItem[];
  title?: string;
}

export const Sidebar = React.forwardRef<SidebarElement, Readonly<SidebarProps>>(
  ({ navItems, title, ...props }, forwardedRef) => {
    return (
      <aside
        ref={forwardedRef}
        className="px-6 flex flex-col gap-4 border-r border-slate-6 bg-[black] shadow-xl"
        {...props}
      >
        <div className="flex flex-col gap-3 pl-4 pr-4 pb-4 pt-4 items-center justify-center bg-[#3BE1AA]">
          <Logo />
          <div
            className={`text-base font-semibold text-[black]`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            TicketNow
          </div>
        </div>
        <nav className="flex flex-col gap-4 bg-[#3BE1AA] h-full">
          <Collapsible.Root defaultOpen>
            {navItems && navItems.length > 0 && (
              <Collapsible.Content className="relative">
                <div className="absolute left-2.5 w-px h-full bg-slate-6" />

                <div className="pb-2 flex flex-col truncate space-y-2 font-medium">
                  <LayoutGroup id="sidebar">
                    {navItems.map((item) => {
                      const pathName = usePathname();
                      const lastPathname = pathName.split("/").pop();

                      const isCurrentPage = lastPathname === item.value;
                      return (
                        <Link
                          key={item.title}
                          href={`/admin/${item.value}`}
                          className="flex items-center font-bold text-black rounded-lg  hover:bg-[#2DD196] mx-2"
                        >
                          <motion.span
                            className={classnames(
                              "text-[14px] px-4 flex items-center font-medium gap-2 w-full pl-4 h-10 text-slate-11 relative transition rounded ease-in-out duration-200",
                              {
                                "text-black": isCurrentPage,
                                "hover:text-slate-12": title !== item.title,
                                "font-bold": isCurrentPage,
                                "bg-[#f2f2f2] rounded": isCurrentPage,
                              }
                            )}
                          >
                            {isCurrentPage && (
                              <motion.span
                                layoutId="sidebar"
                                className="absolute left-0 right-0 top-0 bottom-0 rounded-md bg-cyan-5"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                <div className="bg-cyan-11 w-px absolute top-1 left-2.5 h-6" />
                              </motion.span>
                            )}
                            {item.icon} {/* Display the icon here */}
                            {item.title}
                          </motion.span>
                        </Link>
                      );
                    })}
                  </LayoutGroup>
                </div>
              </Collapsible.Content>
            )}
          </Collapsible.Root>
        </nav>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";
