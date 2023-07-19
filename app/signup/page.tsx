"use client";
import Link from 'next/link';
import React,{ useState,useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";

function SignUp () {
  const notify = (msg:string) => {
    toast.success(`${msg}`)
  }
  const [signup,setSignup] = useState<boolean>(false);
  const [disableButton,setDisableButton] = useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({
    username:"",
    email: "",
    password: "",
  });
  useEffect(() => {
    if(user.email.endsWith("@gmail.com") && user.username.length > 0) {
      setDisableButton(false);
    }else{
      setDisableButton(true);
    }
  }, [user])
  
  const handleChange = (e: { target: any }) => {
    const { target } = e;
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    // alert('sumbmitted')
    e.preventDefault();
    setSignup(true);
  };
  return (
    <div className="text-center justify-center items-center mt-40">
      <Toaster position='bottom-left' reverseOrder={false}/>
      <h1 className="text-3xl font-bold p-2">Signup</h1>
      <form
        action="#"
        className="my-12 justify-center items-center text-center"
      >
        <div className="space-x-4 m-4">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            className="border shadow hover:shadow-slate-700 p-4"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-x-4 m-4">
          <label htmlFor="name">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            className="border shadow hover:shadow-slate-700 p-4"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-x-4 m-4">
          <label htmlFor="name">password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="border shadow hover:shadow-slate-700 p-4"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center">
          <button
          // onClick={(e)=>{handleSubmit(e)};notify('done');}
          onClick={(e)=>{
            handleSubmit(e);
            notify('Submitted');
          }}
            type="submit"
            // className="hover:bg-green-600 bg-green-400 p-3 font-medium text-center rounded text-md"
            className={`hover:bg-green-600 bg-green-400 p-3 font-medium text-center rounded text-md`}
            disabled={disableButton}
          >
            Submit
          </button>
        </div>
      </form>
    <h3>Already have account? <Link href='/login'>Login</Link></h3>
    <br />
    <Link href={signup===true?'/':'/login'}>Protected Route</Link>
    </div>
  );
}

export default SignUp;