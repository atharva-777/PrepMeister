"use client";
import Link from 'next/link';
import React,{ useState } from 'react'

function SignUp () {
//   const [isLogin, setIsLogin] = useState(true);
// eslint-disable-next-line react-hooks/rules-of-hooks
const [isLogin,setIsLogin] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({
    username:"",
    email: "",
    password: "",
  });
  const handleChange = (e: { target: any }) => {
    const { target } = e;
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <div className="text-center justify-center items-center mt-40">
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
          onClick={(e)=>handleSubmit(e)}
            type="submit"
            className="hover:bg-green-600 bg-green-400 p-3 font-medium text-center rounded text-md"
          >
            Submit
          </button>
        </div>
      </form>
    <h3>Already have account? <Link href='/login'>Login</Link></h3>
    </div>
  );
}

export default SignUp;