"use client"
import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";

interface ProblemType {
  title:string;
  description:string;
  number:number;
}

const Problems = () => {
  const [data,setData] = useState<ProblemType>()
  let ps:ProblemType|[] = []
  const perPage = 1;
  const getProblems = async () => {
    console.log('data')
    try {
      const d = await axios.post("/api/problem/get", { perPage });
      ps = d.data.data
      console.log(ps)
      // setData(data?.title:d.data.title)
    } catch (error: any) {
      console.log(error.message);
    }
  };
    useEffect(()=>{
      getProblems()
    },[])

  return (
    <div>
      <div className="m-48 text-center text-3xl font-bold">
        <p>Problems</p>
      </div>
      <div className="text-center">
        {/* {ps.length>0 && ps?.map((problem,ind)=>{
          <div key={ind}></div>
        })} */}
      </div>
    </div>
  );
};

export default Problems;
