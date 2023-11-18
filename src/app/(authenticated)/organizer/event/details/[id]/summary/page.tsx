import { SummaryInformation } from "./SummaryInformation";

export default async function page({ params }) {
  return (
    <div className="m-4">
      <SummaryInformation session={undefined} id={params.id} />
    </div>
  );
}
