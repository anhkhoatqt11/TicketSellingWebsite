import {EventDetail} from "./(components)/EventDetail";


export default function page({ params }) {
  return <EventDetail id={params.id} />;
}
