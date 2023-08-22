"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast,{Toaster} from 'react-hot-toast'
import { useRouter } from "next/navigation";

function SignUp() {
  const router = useRouter();
  const [disableButton, setDisableButton] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user.email.endsWith("@gmail.com") && user.username.length > 0 && user.password.length>5) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  const handleChange = (e: { target: any }) => {
    const { target } = e;
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // const data = await axios.post('/api/users/signup',user);
      //  const resp = await fetch("/api/users/signup", {
      //    method: "POST",
      //    body: JSON.stringify(user),
      //  });
      // console.log(resp)
      const data = await axios({method : 'POST',url:'/api/users/signup',data:user})
      // console.log(data)
      toast.success('User saved Successfully')
      setTimeout(() => {
        router.push('/login')
      }, 2000);
    } catch (error:any) {
      toast.error('User already exists')
    }
  };
  return (
    <div className="text-center justify-center items-center h-screen flex flex-col">
      <Toaster />

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
            onClick={(e) => handleSubmit(e)}
            type="submit"
            // className="hover:bg-green-600 bg-green-400 p-3 font-medium text-center rounded text-md"
            className={`${
              disableButton == true ? "hover:bg-red-600" : "hover:bg-green-600"
            } bg-green-400 p-3 font-medium text-center rounded text-md`}
            disabled={disableButton}
          >
            Submit
          </button>
        </div>
      </form>
      <h3>
        Already have account? <Link href="/login">Login</Link>
      </h3>
    </div>
  );
}

export default SignUp;
