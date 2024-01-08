import { getSession } from "@/lib/auth";
import DashboardLayout from "./DashboardLayout";

export default async function page() {
  return <div className="m-4">{<DashboardLayout />}</div>;
}
