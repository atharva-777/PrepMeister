"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Avatar from "react-avatar";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";
import Loader from "../components/Loader";
import { HiOutlineCalendar, HiOutlineFire, HiOutlineCheckCircle, HiOutlineLogout } from "react-icons/hi";

/** Simple seeded random (returns 0–1). Mutates seed. */
function nextRandom(seed: { v: number }): number {
  seed.v = (seed.v * 1103515245 + 12345) & 0x7fffffff;
  return seed.v / 0x7fffffff;
}

/** Generate heatmap grid: 7 rows (Sun–Sat), last 12 weeks. Values 0–4 for intensity. Deterministic from solvedCount. */
function generateHeatmapData(solvedCount: number): number[][] {
  const weeks = 12;
  const daysInWeek = 7;
  const grid: number[][] = Array.from({ length: daysInWeek }, () => Array(weeks).fill(0));
  const totalCells = weeks * daysInWeek;
  const activeDays = Math.min(Math.max(1, Math.floor(solvedCount / 2)), totalCells - 1);
  const seed = { v: solvedCount * 12345 + 6789 };

  const indices: number[] = [];
  while (indices.length < activeDays) {
    const r = Math.floor(nextRandom(seed) * totalCells);
    if (!indices.includes(r)) indices.push(r);
  }

  indices.forEach((idx) => {
    const d = idx % daysInWeek;
    const w = Math.floor(idx / daysInWeek);
    grid[d][w] = 1 + Math.floor(nextRandom(seed) * 3);
  });

  for (let w = weeks - 1; w >= weeks - 3; w--) {
    for (let d = 0; d < daysInWeek; d++) {
      if (grid[d][w] === 0 && nextRandom(seed) > 0.6) grid[d][w] = 1 + Math.floor(nextRandom(seed) * 2);
    }
  }

  return grid;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const UserProfile = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const router = useRouter();
  const [solvedCount, setSolvedCount] = useState(0);
  const [loadingSolved, setLoadingSolved] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (!user?.email) return;
    let cancelled = false;
    setLoadingSolved(true);
    axios
      .post("/api/users/getSolved", { email: user.email })
      .then((res) => {
        if (!cancelled) {
          const list = res.data?.record?.[0]?.solved || [];
          setSolvedCount(Array.isArray(list) ? list.length : 0);
        }
      })
      .catch(() => {
        if (!cancelled) setSolvedCount(0);
      })
      .finally(() => {
        if (!cancelled) setLoadingSolved(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Loader variant="page" message="Loading profile..." />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const heatmap = generateHeatmapData(solvedCount);
  const daysActive = heatmap.flat().filter((v) => v > 0).length; // dummy: count of active cells
  const memberSince = "Jan 2024"; // dummy
  const currentStreak = Math.min(7, Math.floor(daysActive / 4)); // dummy streak

  const intensityColors = [
    "bg-gray-100 dark:bg-gray-700",
    "bg-emerald-200",
    "bg-emerald-400",
    "bg-emerald-600",
    "bg-emerald-700",
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600" />
          <div className="px-6 sm:px-8 pb-8 -mt-12 relative">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="ring-4 ring-white rounded-full shadow-lg bg-white flex-shrink-0">
                  <Avatar
                    name={user.name || user.email || "U"}
                    email={user.email ?? undefined}
                    size="120"
                    round="50%"
                    color="#2563eb"
                    fgColor="#fff"
                  />
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {user.name || user.email?.split("@")[0] || "User"}
                  </h1>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                  <p className="text-gray-400 text-xs mt-1">Member since {memberSince}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/problems"
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Problems
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
                >
                  <HiOutlineLogout size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <HiOutlineCheckCircle className="text-emerald-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {loadingSolved ? "—" : solvedCount}
                </p>
                <p className="text-sm text-gray-500">Problems solved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <HiOutlineCalendar className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{daysActive}</p>
                <p className="text-sm text-gray-500">Days active</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <HiOutlineFire className="text-amber-600" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{currentStreak}</p>
                <p className="text-sm text-gray-500">Current streak (days)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity heatmap (GitHub-style: 7 rows = days, 12 columns = weeks) */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Activity</h2>
          <p className="text-sm text-gray-500 mb-4">
            Problems solved over the last 12 weeks (dummy distribution for demo)
          </p>
          <div className="overflow-x-auto">
            <div className="flex gap-1 items-start">
              <div className="flex flex-col gap-1 justify-around pt-3 pb-0.5">
                {DAY_LABELS.map((label) => (
                  <span key={label} className="text-xs text-gray-400 h-3 w-6 flex items-center">
                    {label}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {[0, 1, 2, 3, 4, 5, 6].map((row) => (
                  <div key={row} className="flex gap-0.5">
                    {heatmap[row].map((value, col) => (
                      <div
                        key={`${row}-${col}`}
                        className={`w-3 h-3 rounded-sm ${intensityColors[value]}`}
                        title={`Week ${12 - col}, ${DAY_LABELS[row]}: ${value > 0 ? value + " solved" : "No activity"}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between mt-2 px-1">
              <span className="text-xs text-gray-400">12 weeks ago</span>
              <span className="flex gap-0.5 items-center">
                <span className="text-xs text-gray-400 mr-1">Less</span>
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className={`w-3 h-3 rounded-sm ${intensityColors[i]}`}
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">More</span>
              </span>
              <span className="text-xs text-gray-400">Today</span>
            </div>
          </div>
        </div>

        {/* Quick link */}
        <div className="mt-6 text-center">
          <Link
            href="/problems"
            className="text-blue-600 font-medium hover:underline"
          >
            → Go to Problems
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
