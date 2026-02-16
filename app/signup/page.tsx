"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "../components/Loader";

const input_style =
  "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

export default function SignUp() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace("/problems");
      return;
    }
  }, [status, session, router]);

  useEffect(() => {
    const valid =
      user.username.trim().length > 0 &&
      user.email.includes("@") &&
      user.email.includes(".") &&
      user.password.length >= 6;
    setDisableButton(!valid);
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disableButton) return;
    try {
      setLoading(true);
      await axios.post("/api/users/signup", { ...user });
      toast.success("Account created! You can log in now.");
      router.push("/login");
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something unexpected occurred";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <section className="min-h-screen pt-20 bg-blue-600 flex items-center justify-center">
        <Loader variant="page" message="Loading..." dark />
      </section>
    );
  }

  if (status === "authenticated") {
    return null; // redirecting
  }

  return (
    <>
      <Toaster />
      <section className="min-h-screen pt-20 bg-blue-600">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 rounded-lg shadow-xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              Create account
            </h1>
            <p className="text-gray-500 text-sm text-center mb-8">
              Sign up to start practicing problems
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={input_style}
                  value={user.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={input_style}
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  className={input_style}
                  value={user.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
              </div>
              <button
                type="submit"
                disabled={disableButton || loading}
                className="inline-block px-7 py-4 w-full text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor:
                    disableButton || loading ? "#94a3b8" : "#2563eb",
                }}
              >
                {loading ? "Creating account..." : "Sign up"}
              </button>
            </form>
            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
