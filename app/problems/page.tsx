"use client"
import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import slugify from "slugify";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
// import YouTube from "react-youtube";


interface ProblemType {
  title:string;
  description:string;
  number:number;
  tags:Array<string>;
  comapany:Array<string>;
  level:string;
}

const Problems = () => {
  const [data,setData] = useState<ProblemType[]>()
  let ps:ProblemType[]
  const lim = 4;
  const getProblems = async () => {
    try {
      const d = await axios.post("/api/problem/get", { lim });
      ps = d.data.data
      setData(d.data.data)
      // console.log(data && data[0].title)
    } catch (error: any) {
      console.log(error.message);
    }
  };
    useEffect(()=>{
      getProblems()
    },[])

  return (
    // <div>
    //   <div className="mt-48 p-4 text-center text-3xl font-bold">
    //     <p>Problems</p>
    //   </div>
    //   <div className="text-lg">
    //     {data && data.map((problem,id)=>{
    //       return (
    //         <ul key={id} className="flex flex-col m-4 p-4 space-x-4">
    //           <li> {problem.number}</li>
    //           <li> {problem.title}</li>
    //           <li> {problem.description}</li>
    //         </ul>
    //       );
    //     })}
    //   </div>
    // </div>

    <div className="m-32 flex justify-center mx-auto">
        <table className="w-full text-center space-x-10">
        <thead className="text-lg font-bold">
          <tr>
            <td>Number</td>
            <td>Title</td>
            <td>Tags</td>
            <td>Difficulty</td>
          </tr>

        </thead>
        <tbody>

        {data && data.map((problem, idx) => {
          const difficulyColor =
          problem.level === "easy"
          ? "text-dark-green-s"
          : problem.level === "medium"
          ? "text-dark-yellow"
              : "text-dark-red";
          return (
            <tr
              key={idx}
              className={`${problem.number % 2 == 1 ? "bg-dark-layer-1" : ""}`}
            >
              <td>{problem.number}</td>
              <td>
                <Link href={`/problems/${slugify(problem.title)}`}>
                {problem.title}
                </Link>
                </td>
              <td>
                {problem.tags.map((tag, id) => {
                  return (
                    <span key={id} className="p-2 bg-slate-500/70 m-1 rounded">
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
