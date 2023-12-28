import React from "react";

const JoinGroup = () => {
  return (
    <section className="pt-24">
      <h1 className="text-center text-3xl font-bold mt-0 m-4">Join Chat Rooms</h1>
      <div className="space-x-6 space-y-4 border border-gray-600 mx-36 m-4 p-6 rounded-md text-center">
        <h2 className="text-xl">Join Using ChatID</h2>
        <p>
          Enter ChatId :
          <input type="text" className="p-2 border border-black m-2" />
        </p>
        <button className="p-2 rounded-md bg-green-400">Join Chat</button>
      </div>
      <div className="m-4 text-center space-y-4">
        <p className="text-xl">OR</p>
      </div>
      <div className="space-x-6 space-y-4 border border-gray-600 mx-36 m-4 p-6 rounded-md text-center">
        <h2 className="text-xl">Join Using group Name</h2>
        <p>Enter Chat Name : 
            <input type="text" className="p-2 border border-black m-2"/>
        </p>
        <button className="p-2 rounded-md bg-blue-300">Join Chat</button>
      </div>
    </section>
  );
};

export default JoinGroup;
