"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState, Suspense } from "react";

const LoginFormContent = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("LoginForm: Attempting sign in", { email: formValues.email });
      
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      console.log("LoginForm: Sign in response", res);

      setLoading(false);

      if (res?.error) {
        // Handle specific error messages
        const errorMessage = res.error === "CredentialsSignin" 
          ? "Invalid email or password" 
          : res.error || "Failed to sign in";
        setError(errorMessage);
        console.error("LoginForm: Sign in error", res.error);
      } else if (res?.ok && !res?.error) {
        setFormValues({ email: "", password: "" });
        const targetUrl = res?.url || callbackUrl;
        console.log("LoginForm: Sign in successful, redirecting to", targetUrl);
        // Use window.location so session is refreshed (required when using redirect: false)
        window.location.href = targetUrl;
      } else {
        setError("An unexpected error occurred. Please try again.");
        console.error("LoginForm: Unexpected response", res);
      }
    } catch (error: any) {
      setLoading(false);
      const errorMessage = error?.message || "An error occurred during login";
      setError(errorMessage);
      console.error("LoginForm: Exception during sign in", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const input_style =
    "form-control block w-full px-4 py-5 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
      onSubmit();    }}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}
      <div className="mb-6">
        <input
          required
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="Email address"
          className={`${input_style}`}
        />
      </div>
      <div className="mb-6">
        <input
          required
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="Password"
          className={`${input_style}`}
        />
      </div>
      <button
        type="submit"
        style={{ backgroundColor: `${loading ? "#94a3b8" : "#2563eb"}` }}
        className="inline-block px-7 py-4 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-center text-gray-600 text-sm mt-6">
        New user?{" "}
        <Link href="/signup" className="text-blue-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export const LoginForm = () => {
  return (
    <Suspense fallback={<div className="text-center py-4">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
};
