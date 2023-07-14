import React from 'react'

const Profile = ({params}:any) => {
  return (
    <div className="text-center font-bold text-3xl m-40">
      id : <span  className='bg-slate-900 text-white font-bold p-2 rounded'> {params.id} </span>
    </div>
  );
}

export default Profile