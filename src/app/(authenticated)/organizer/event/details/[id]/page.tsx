import { EditEvent } from "./EditEvent";

export default async function page({ params }) {
  return (
    <div className="m-4">
      <EditEvent session={undefined} id={params.id} />
    </div>
  );
}
