"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthDialog from "./AuthDialog";
import Loader from "./Loader";
import { HiCode, HiLightningBolt, HiChartBar, HiCursorClick } from "react-icons/hi";
import { useThemeMode } from "../context/ThemeContext";

export default function HomeUI() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && session?.user;
  const { theme } = useThemeMode();
  const isDarkTheme = theme === "dark";

  if (status === "loading") {
    return <Loader variant="fullPage" message="Loading..." dark />;
  }

  return (
    <>
      <div
        className={`min-h-screen overflow-hidden ${
          isDarkTheme
            ? "bg-[#0f0f12] text-white"
            : "bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 text-slate-900"
        }`}
      >
        {/* Gradient orbs */}
        <div
          className={`fixed top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
            isDarkTheme ? "bg-blue-600/20" : "bg-cyan-500/20"
          }`}
        />
        <div
          className={`fixed bottom-0 right-1/4 rounded-full blur-[110px] pointer-events-none ${
            isDarkTheme ? "w-[400px] h-[400px] bg-indigo-600/15" : "w-[420px] h-[420px] bg-indigo-500/18"
          }`}
        />
        {!isDarkTheme && (
          <div className="fixed top-1/3 -left-24 w-[260px] h-[260px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" />
        )}

        {/* Hero */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-16 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8 ${
                isDarkTheme
                  ? "bg-white/5 border border-white/10 text-gray-300"
                  : "bg-slate-200 border border-slate-300 text-slate-600"
              }`}
            >
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
            <p
              className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 ${
                isDarkTheme ? "text-gray-400" : "text-slate-600"
              }`}
            >
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
                  className={`px-8 py-4 rounded-xl border font-semibold text-lg transition text-center ${
                    isDarkTheme
                      ? "border-white/20 text-gray-200 hover:bg-white/5 hover:border-white/30"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
                  }`}
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

        <section className="relative px-6 pb-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className={`rounded-2xl border p-5 ${
                isDarkTheme
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-slate-200 bg-white/80"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-blue-500 mb-3">
                Problem Preview
              </p>
              <h3 className={`text-xl font-semibold ${isDarkTheme ? "text-white" : "text-slate-900"}`}>
                Two Sum
              </h3>
              <p className={`mt-3 text-sm leading-7 ${isDarkTheme ? "text-slate-300" : "text-slate-600"}`}>
                Given an array of integers and a target value, return the indices of
                the two numbers such that they add up to target. You may assume that
                each input has exactly one solution.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className={`rounded-xl border p-3 ${
                    isDarkTheme
                      ? "border-slate-700 bg-slate-900/70"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Input</p>
                  <pre className={`mt-2 text-sm ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>
{`nums = [2,7,11,15]
target = 9`}
                  </pre>
                </div>
                <div
                  className={`rounded-xl border p-3 ${
                    isDarkTheme
                      ? "border-slate-700 bg-slate-900/70"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Output</p>
                  <pre className={`mt-2 text-sm ${isDarkTheme ? "text-slate-200" : "text-slate-700"}`}>
{`[0,1]`}
                  </pre>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border overflow-hidden ${
                isDarkTheme
                  ? "border-slate-700 bg-slate-950"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between px-4 py-3 border-b ${
                  isDarkTheme
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <p className={`text-xs font-medium ${isDarkTheme ? "text-slate-300" : "text-slate-500"}`}>
                  JavaScript Boilerplate
                </p>
              </div>
              <pre
                className={`p-4 overflow-x-auto text-sm leading-7 ${
                  isDarkTheme ? "text-slate-200" : "text-slate-700"
                }`}
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace" }}
              >
{`function twoSum(nums, target) {
  const indexMap = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (indexMap.has(complement)) {
      return [indexMap.get(complement), i];
    }
    indexMap.set(nums[i], i);
  }
}`}
              </pre>
              <div
                className={`px-4 py-3 border-t flex items-center justify-between ${
                  isDarkTheme
                    ? "border-slate-700 bg-slate-900/70"
                    : "border-slate-200 bg-slate-50"
                }`}
              >
                <span className={`text-xs ${isDarkTheme ? "text-slate-400" : "text-slate-500"}`}>
                  Testcases: 12/12 passed
                </span>
                <span className="text-xs font-semibold text-emerald-500">Accepted</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          className={`relative py-24 px-6 border-t ${
            isDarkTheme ? "border-white/5" : "border-slate-200"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <h2
              className={`text-2xl sm:text-3xl font-bold text-center mb-16 ${
                isDarkTheme ? "text-gray-100" : "text-slate-900"
              }`}
            >
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
                  className={`p-6 rounded-2xl transition ${
                    isDarkTheme
                      ? "bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                      : "bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                    <Icon className="text-blue-400" size={24} />
                  </div>
                  <h3 className={`font-semibold mb-2 ${isDarkTheme ? "text-gray-100" : "text-slate-900"}`}>
                    {title}
                  </h3>
                  <p className={`text-sm ${isDarkTheme ? "text-gray-500" : "text-slate-500"}`}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - only show for guests */}
        {!isLoggedIn && (
          <section className="relative py-20 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className={`mb-6 ${isDarkTheme ? "text-gray-400" : "text-slate-600"}`}>
                Ready to start practicing?
              </p>
              <button
                onClick={() => setAuthDialogOpen(true)}
                className={`px-6 py-3 rounded-xl border transition font-medium ${
                  isDarkTheme
                    ? "border-white/20 text-gray-200 hover:bg-white/5 hover:border-white/30"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
                }`}
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
