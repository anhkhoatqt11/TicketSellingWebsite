import { AddNewEvent } from "./AddNewEvent";

export default async function page() {
  return (
    <div className="m-4">
      <AddNewEvent session={undefined} />
    </div>
  );
}
