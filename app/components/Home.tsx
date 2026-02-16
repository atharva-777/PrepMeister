"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthDialog from "./AuthDialog";
import Loader from "./Loader";
import { HiCode, HiLightningBolt, HiChartBar, HiCursorClick } from "react-icons/hi";

export default function HomeUI() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && session?.user;

  if (status === "loading") {
    return <Loader variant="fullPage" message="Loading..." dark />;
  }

  return (
    <>
      <div className="min-h-screen bg-[#0f0f12] text-white overflow-hidden">
        {/* Gradient orbs */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-16 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isLoggedIn ? "Welcome back" : "Coding practice for interviews"}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                algorithms
              </span>
              <br />
              one problem at a time
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              {isLoggedIn
                ? "Continue practicing and track your progress."
                : "PrepMeister helps you practice coding problems, track progress, and get interview-ready with a structured workspace."}
            </p>
            {isLoggedIn ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/problems"
                  className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 transition text-center"
                >
                  Go to Problems
                </Link>
                <Link
                  href="/profile"
                  className="px-8 py-4 rounded-xl border border-white/20 text-gray-200 hover:bg-white/5 hover:border-white/30 font-semibold text-lg transition text-center"
                >
                  View Profile
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setAuthDialogOpen(true)}
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 transition"
              >
                Get started
              </button>
            )}
          </div>
        </section>

        {/* Features */}
        <section className="relative py-24 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-gray-100">
              Why PrepMeister?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: HiCode,
                  title: "Curated problems",
                  desc: "Practice with problems designed to build strong fundamentals.",
                },
                {
                  icon: HiLightningBolt,
                  title: "Code in browser",
                  desc: "Write and run code without leaving the platform.",
                },
                {
                  icon: HiChartBar,
                  title: "Track progress",
                  desc: "See your solved problems and stay motivated.",
                },
                {
                  icon: HiCursorClick,
                  title: "Interview focus",
                  desc: "Structured by difficulty to match real interviews.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                    <Icon className="text-blue-400" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-100 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - only show for guests */}
        {!isLoggedIn && (
          <section className="relative py-20 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-gray-400 mb-6">Ready to start practicing?</p>
              <button
                onClick={() => setAuthDialogOpen(true)}
                className="px-6 py-3 rounded-xl border border-white/20 text-gray-200 hover:bg-white/5 hover:border-white/30 transition font-medium"
              >
                Login or Sign up
              </button>
            </div>
          </section>
        )}
      </div>

      <AuthDialog open={authDialogOpen} onClose={() => setAuthDialogOpen(false)} />
    </>
  );
}
