import CheckIn from "./CheckIn";

export default async function page({ params }) {
    return (
        <div className="m-4">
            <CheckIn session={undefined} id={params.id}/>
        </div>
    );
}