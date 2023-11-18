import { GuestList } from "./GuestList";

export default async function page({ params }) {
  return (
    <div className="m-4">
      <GuestList session={undefined} id={params.id} />
    </div>
  );
}
