"use client";
import React from 'react'
import axios from 'axios'
import { api } from '../config/axios';
import { useSession } from 'next-auth/react';
import ProblemService from '../services/problem.service';
import { useQuery } from 'react-query';

const s = "two-sum";

const Explore = () => {

  const {data:session} = useSession();
  const user = session?.user;


  const { isLoading, error, data } = useQuery(
    "problems",
    async () => {
      // const p = await axios.post(
      //   "http://localhost:3000/api/problem/getProblem",
      //   { slug: "two-sum" }
      // );
      console.log("use query")
      const d = await ProblemService.getSingleProblem({slug:"two-sum"});
      console.log("by problemservice" ,d)
    const p = await api.post("/problems/getProblem", {slug:"two-sum"});
      console.log("by api ",p.data)
      return p.data;
    },
    {
      onSuccess(data) {
        console.log("success")
      },
      onError(err){
        console.log("Error ",err);
      }
    }
  );  


    const call = async () => {
        // const res = await axios({
        //   method: "POST",
        //   url: "http://localhost:4000/api/v1/problems/getProblem",
        //   data: {
        //     slug: "two-sum",
        //   },
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        //   },
        // });

          const res = data;

            console.log("fetched ",res)
    }
    

  return (
    <div className='m-64'>
        <button onClick={()=>{call()}}>Click me</button>
        {user && <div className='m-12 bg-green-400 p-12 border rounded-full'>
          <ul>
            <li>{user.email}</li>
            <li>{user.name}</li>
            <li>{session.expires}</li>
          </ul>
          </div>}

          {!user && <div>
            <li className='m-12'>User not logged in</li>
            </div>}
        
    </div>
  )
}

export default Explore