import { getSession } from "@/lib/auth";
import DashboardLayout from "./DashboardLayout";

export default async function page() {
  const session = await getSession();
  const userId = session?.user?.id;
  return <div className="m-4">{<DashboardLayout />}</div>;
}
