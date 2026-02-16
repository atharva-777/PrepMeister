"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import ProblemService from "../services/problem.service";
import axios from "axios";
import Loader from "../components/Loader";

interface ProblemType {
  _id: string;
  title: string;
  number: number;
  tags: Array<string>;
  company: Array<string>;
  level: string;
  slug: string;
}

const Problems = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [solved, setSolved] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  const getSolvedProblems = useCallback(async () => {
    try {
      if (!session?.user?.email) return;
      const response = await axios.post("/api/users/getSolved", {
        email: session.user.email,
      });
      setSolved(response.data.record?.[0]?.solved || []);
    } catch (error) {
      console.error("Failed to fetch solved problems", error);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    getSolvedProblems();
  }, [getSolvedProblems]);

  const { data: problemsData, isLoading } = useQuery({
    queryKey: "problems",
    queryFn: async () => {
      const res = await ProblemService.getAllProblems(100);
      return res.data || [];
    },
    enabled: !!session?.user,
  });

  // Filter problems based on search and difficulty
  const filteredProblems = (problemsData || []).filter((problem: ProblemType) => {
    const matchesSearch = 
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDifficulty = !selectedDifficulty || problem.level === selectedDifficulty;
    
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const isLoadingSession = sessionStatus === "loading";
  const showContent = sessionStatus === "authenticated" && session?.user;

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <Loader variant="page" message="Loading..." />
      </div>
    );
  }

  if (!showContent) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Please log in to view problems</p>
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Problems</h1>
          <p className="text-gray-600">Master DSA problems used in technical interviews</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search problems by title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedDifficulty(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedDifficulty === null
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {["easy", "medium", "hard"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  selectedDifficulty === difficulty
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <Loader variant="section" message="Loading problems..." />
          ) : filteredProblems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No problems found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProblems.map((problem: ProblemType, idx: number) => {
                    const isSolved = solved.includes(problem.number);
                    return (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-blue-50 transition"
                      >
                        <td className="px-6 py-4">
                          {isSolved ? (
                            <BsCheckCircle className="text-green-600" size={20} />
                          ) : (
                            <BsCircle className="text-gray-400" size={20} />
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {problem.number}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/problems/${problem.slug}`}
                            className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                          >
                            {problem.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.level)}`}>
                            {problem.level.charAt(0).toUpperCase() + problem.level.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap max-w-xs">
                            {problem.tags.slice(0, 2).map((tag, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags.length > 2 && (
                              <span className="inline-block px-2 py-1 text-xs text-gray-600">
                                +{problem.tags.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 text-sm">Total Problems</p>
            <p className="text-3xl font-bold text-gray-900">{problemsData?.length || 0}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 text-sm">Solved</p>
            <p className="text-3xl font-bold text-green-600">{solved.length}</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg shadow text-center">
            <p className="text-gray-600 text-sm">Completion Rate</p>
            <p className="text-3xl font-bold text-blue-600">
              {problemsData?.length ? Math.round((solved.length / problemsData.length) * 100) : 0}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
