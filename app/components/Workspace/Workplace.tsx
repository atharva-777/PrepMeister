// "use client"
import React, { useEffect, useState } from "react";
import Description from "./Description/Description";
import Playground from "./Playground/Playground";
import Split from "react-split";
import axios from "axios";
import { useQuery } from "react-query";
import ProblemService from "@/app/services/problem.service";
import { useSession } from "next-auth/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export const getServerSideProps = (async (context) => {
  const { slug } = context.query;
  console.log("Problem ", slug);
  const problem = await ProblemService.getSingleProblem(slug);
  return { props: { problem } };
}) satisfies GetServerSideProps<{ problem: ProblemType }>;

type WorkspaceProps = {
  slug: String;
  problem?: InferGetServerSidePropsType<typeof getServerSideProps>;
};

const Workspace: React.FC<WorkspaceProps> = ({ slug,  }) => {
  const { data: session } = useSession();
  const [problem, setProblem] = useState<ProblemType>();

  const {isLoading,error,data} = useQuery('problems',async ()=>{
      const p = await axios.post('http://localhost:3000/api/problem/getProblem',{slug:slug})
      setProblem(p.data.problem)
      return p.data},
      {
        onSuccess(data){
          setProblem(data.problem)
        }
      })

  // useEffect(() => {
  //   const getProblem = async (slug: String) => {
  //     const p = await axios.post(
  //       "http://localhost:4000/api/v1/problems/getProblem",
  //       { slug: slug }
  //     );
  //     console.log("Backend ",p.data)
  //     setProblem(p.data.problem);
  //   };
  //   getProblem(slug);
  // }, [slug]);

  return (
      <>
        {problem && 
      <Split className="split mt-8" minSize={0}>
        <Description problem={problem}/>
          <Playground problem={problem}/>
      </Split>
        }
        </>
  );
};

export default Workspace;
