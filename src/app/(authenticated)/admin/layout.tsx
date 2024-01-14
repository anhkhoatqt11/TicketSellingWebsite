import React from "react";
import { getSession } from '@/lib/auth';
import Header from "./(components)/Header";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Sidebar } from "./(components)/Sidebar";
import { Airplay, CalendarRange, User } from "lucide-react";
import { Footer } from "@/components/footer";


const navItems = [
  {
    title: "Trang chủ",
    value: "/",
    icon: <DashboardIcon className="w-5 h-5" />,
  },
  {
    title: "Quản lý sự kiện",
    value: "events",
    icon: <CalendarRange className="w-5 h-5" />,
  },
  {
    title: "Quản lý người dùng",
    value: "users",
    icon: <User className="w-5 h-5" />,
  },
  {
    title: "Quản lý banner",
    value: "banners",
    icon: <Airplay className="w-5 h-5" />,
  },
];

async function layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (session?.user?.role !== 'admin') {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <p>Bạn không có quyền truy cập trang này</p>
      </div>
    )
  }
  return (
    <div className="h-full w-full">
      <div className="flex flex-col lg:flex-row justify-between h-full ">
        <Sidebar
          navItems={navItems}
          title="Navigation"
          className="w-full lg:basis-1/5 bg-white rounded"
        />
        <div className="flex-1 w-full h-full min-h-screen bg-slate-50">
          <Header session={session} />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default layout;
