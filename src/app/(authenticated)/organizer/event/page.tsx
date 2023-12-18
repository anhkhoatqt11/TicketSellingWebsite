import { getSession } from "@/lib/auth";
import { EventManagement } from "./EventManagement";

export default async function page() {
  const session = await getSession();
  return (
    <div className="m-4">
      <EventManagement session={session} />
    </div>
  );
}
