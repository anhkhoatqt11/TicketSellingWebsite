import { CouponList } from "./CouponList";

export default async function page({ params }) {
  return (
    <div className="m-4">
      <CouponList session={undefined} id={params.id} />
    </div>
  );
}
