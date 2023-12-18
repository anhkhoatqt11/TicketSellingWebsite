import { getSession } from "@/lib/auth";
import { EditProfileForm } from "./EditProfileForm";

export default async function page() {
  const session = await getSession();
  const userId = session?.user?.id;
  return (
    <div className="m-4">
      <EditProfileForm userId={userId} />
    </div>
  );
}
