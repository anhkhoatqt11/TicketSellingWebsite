import { mustBeLoggedIn } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    await mustBeLoggedIn();

  return (
    <div className="">
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
