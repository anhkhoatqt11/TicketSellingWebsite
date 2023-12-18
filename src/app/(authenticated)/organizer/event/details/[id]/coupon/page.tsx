import { getSession } from "@/lib/auth";
import { CouponList } from "./CouponList";

export default async function page({ params }) {
  const session = await getSession();
  return (
    <div className="m-4">
      <CouponList session={session} id={params.id} />
    </div>
  );
}
