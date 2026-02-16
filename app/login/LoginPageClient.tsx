"use client";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";
import Loader from "../components/Loader";

export default function LoginPageClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/problems";

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace(callbackUrl);
    }
  }, [status, session, router, callbackUrl]);

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
    <section className="min-h-screen pt-20 bg-blue-600">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-white px-8 py-10 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            Sign in to continue to PrepMeister
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
