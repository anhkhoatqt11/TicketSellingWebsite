import React from "react";
import { getSession } from "@/lib/auth";
import Header from "./(components)/Header";
import { Sidebar } from "./(components)/Sidebar";
import { redirect } from "next/navigation";
import OrganizerRegister from "./(components)/OrganizerRegister";
import { Footer } from "@/components/footer";

import CalendarIcon from "@/components/calendar";
import UserIcon from "@/components/userprofileicon";
import AnalyticsIcon from "@components/analytics";

const navItems = [
  {
    title: "Hồ sơ ban tổ chức",
    value: "profile",
    icon: <UserIcon className="mr-2 ms-3 w-6 h-6" />,
  },
  {
    title: "Quản lý sự kiện",
    value: "event",
    icon: <CalendarIcon className="mr-2 ms-3 w-6 h-6" />,
  },
  {
    title: "Thống kê",
    value: "dashboard",
    icon: <AnalyticsIcon className="mr-2 ms-3 w-6 h-6" />,
  },
];
export default async function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  return (
    <div className="w-full h-full bg-slate-50">
      <Header session={session} />
      <div className="flex flex-col lg:flex-row justify-between h-full ">
        <OrganizerRegister session={session} />
        <Sidebar
          navItems={navItems}
          title="Navigation"
          className="w-full lg:basis-1/4 bg-white shadow-md"
        />
        <div className="flex-1 w-full h-full min-h-screen bg-slate-50">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
