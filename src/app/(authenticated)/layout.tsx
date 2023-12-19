import { Footer } from "@/components/footer";
import { getSession, mustBeLoggedIn } from "@/lib/auth";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  await mustBeLoggedIn();
  return (
    <div className="">
      <div className="w-full h-full">{children}</div>
    </div>
  );
}
