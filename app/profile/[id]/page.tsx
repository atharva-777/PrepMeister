import React from "react";
import Link from "next/link";

const Profile = ({ params }: any) => {
  return (
    <div>
      <div className="text-center font-bold text-3xl m-40">
        id :{" "}
        <span className="bg-slate-900 text-white font-bold p-2 rounded">
          {" "}
          {params.id}{" "}
        </span>
        <br />
      </div>
      <button className="text-center mx-50 bg-green-400 rounded p-4">
        <Link href={"/profile"}>Dashboard</Link>
      </button>
    </div>
  );
};

export default Profile;
