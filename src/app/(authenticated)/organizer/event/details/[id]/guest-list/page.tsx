import { getSession } from "@/lib/auth";
import { GuestList } from "./GuestList";

export default async function page({ params }) {
  const session = await getSession();
  return (
    <div className="m-4">
      <GuestList session={session} id={params.id} />
    </div>
  );
}
