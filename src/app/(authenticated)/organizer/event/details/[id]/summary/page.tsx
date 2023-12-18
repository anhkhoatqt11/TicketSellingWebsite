import { getSession } from "@/lib/auth";
import { SummaryInformation } from "./SummaryInformation";

export default async function page({ params }) {
  const session = await getSession();
  return (
    <div className="m-4">
      <SummaryInformation session={session} id={params.id} />
    </div>
  );
}
