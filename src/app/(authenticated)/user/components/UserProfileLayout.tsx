"use client";
import React, { useState } from "react";
import { EditProfileForm } from "./EditProfileForm";
interface Props {
  id: number;
}
const UserProfileLayout = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="flex flex-col space-y-3 p-4">
      <EditProfileForm userId={id} setIsLoading={setIsLoading} />
    </div>
  );
};

export default UserProfileLayout;
