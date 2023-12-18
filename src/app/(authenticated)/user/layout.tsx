import React from "react";
import { getSession } from "@/lib/auth";
import { Header } from "@/components/header";
import { Sidebar } from "./components/Sidebar";
import { DashboardIcon } from "@radix-ui/react-icons";
import { SubscriptIcon, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Footer } from "@/components/footer";
// import OrganizerRegister from "./(components)/OrganizerRegister";

const navItems = [
  {
    title: "Hồ sơ cá nhân",
    value: "profile",
    icon: <DashboardIcon className="w-5 h-5" />,
  },
  {
    title: "Vé của tôi",
    value: "my-ticket",
    icon: <DashboardIcon className="w-5 h-5" />,
  },
];
export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="w-full h-full bg-slate-50">
      <Header session={session} />
      <div className="flex flex-col lg:flex-row justify-between h-full ">
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
