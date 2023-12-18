import { getSession } from "@/lib/auth";
import CheckIn from "./CheckIn";

export default async function page({ params }) {
  const session = await getSession();
  return (
    <div className="m-4">
      <CheckIn session={session} id={params.id} />
    </div>
  );
}
