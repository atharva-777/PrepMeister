import React from "react";
import Link from "next/link";

const UserProfile = () => {
  return (
    <>
      <div>Welcome to home</div>
      <Link href="/login">Login</Link>
    </>
  );
};

export default UserProfile;
