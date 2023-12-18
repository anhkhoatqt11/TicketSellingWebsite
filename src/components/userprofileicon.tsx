import React from "react";

function UserIcon({ className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt="User icon" src="/profile.png" className={className} />
  );
}

export default UserIcon;
