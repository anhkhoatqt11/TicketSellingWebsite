import { getSession } from "@/lib/auth";
import { EditEvent } from "./EditEvent";

export default async function page({ params }) {
  const session = await getSession();
  return (
    <div className="m-4">
      <EditEvent session={session} id={params.id} />
    </div>
  );
}
