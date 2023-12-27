import React from "react";

const CreateGroup = () => {
    return (
        <section className="pt-24 p-8">
            <div>
                Create your own chat sessions to interact with peer learners
            </div>
            <div className="text-center m-4 p-6 space-y-5 border border-spacing-2 border-solid">
                <h2 className="text-xl font-bold">Create New ChatRoom</h2>
                <p className="space-x-4">
                Enter Group Name : 
                <input type="text" className="border border-black/25 m-2 p-2"/>
                </p>
                <p>
                    Group ID : 
                    <span className="border border-black/25 m-2 p-2">ID is displayed upon creating group</span>
                </p>
                <button className="bg-blue-400 p-3 rounded-md hover:bg-blue-600">Create Group</button>
            </div>
        </section>
    )
}

export default CreateGroup;