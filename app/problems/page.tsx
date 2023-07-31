"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import slugify from "slugify";
import Link from "next/link";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import { BsCheck } from "react-icons/bs";
import { FaCross } from "react-icons/fa";

interface ProblemType {
  title: string;
  description: string;
  number: number;
  tags: Array<string>;
  comapany: Array<string>;
  level: string;
}

const Problems = () => {
  const [data, setData] = useState<ProblemType[]>();
  const { user, setUser } = useContext<any>(UserContext);
  const [solved, setSolved] = useState<number[]>();
  let ps: ProblemType[];
  const lim = 50;
  const getProblems = async () => {
    try {
      const d = await axios.post("/api/problem/get", { lim });
      ps = d.data.data;
      setData(d.data.data);
      // console.log(data && data[0].title)
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getProblems();
    getSolvedProblems();
  }, [user]);

  const getSolvedProblems = async () => {
    try {
      if (!user) {
        return null;
      }
      const data = await axios.post("/api/users/getSolved", {
        email: user.email,
      });
      setSolved(data.data.record[0].solved);
      // solved?.sort
      // console.log(solved)
    } catch (error: any) {
      console.log(error.message);
      console.log("error");
    }
  };

  return (
    <div className="m-32 flex justify-center mx-auto">
      {/* <button onClick={getSolvedProblems}>Get Probs</button> */}
      <table className="w-full text-center space-x-10">
        <thead className="text-lg font-bold">
          <tr>
            <td>Status</td>
            <td>Number</td>
            <td>Title</td>
            <td>Tags</td>
            <td>Difficulty</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((problem, idx) => {
              const difficulyColor =
                problem.level === "easy"
                  ? "text-dark-green-s"
                  : problem.level === "medium"
                  ? "text-dark-yellow"
                  : "text-dark-red";
              return (
                <tr
                  key={idx}
                  className={`${
                    problem.number % 2 == 1 ? "bg-dark-layer-1" : ""
                  } m-2`}
                >
                  <td className="p-5 text-center">
                    {/* No */}
                    {user && solved?.includes(problem.number)===true ? <BsCheck />:<FaCross/>}
                  </td>
                  <td>{problem.number}</td>
                  <td>
                    <Link href={`/problems/${slugify(problem.title)}`}>
                      {problem.title}
                    </Link>
                  </td>
                  <td>
                    {problem.tags.map((tag, id) => {
                      return (
                        <span key={id} className="p-2 m-1 rounded">
                          {tag}
                        </span>
                      );
                    })}
                  </td>
                  <td className={`${difficulyColor}`}>
                    {problem.level ? problem.level : "medium"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Problems;
