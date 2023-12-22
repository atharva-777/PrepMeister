"use client";
import Topbar from "@/app/components/Topbar";
import Workspace from "@/app/components/Workspace/Workplace";
import React from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ProblemService from "@/app/services/problem.service";


export const getServerSideProps = (async (context) => {
  const { slug } = context.query;
  const problem = await ProblemService.getSingleProblem(slug);
  console.log(problem)
  return { props: { problem } };
}) satisfies GetServerSideProps<{ problem: ProblemType }>;

type ProblemPageProps = {
  // problem:ProblemType
  params:any
};

const ProblemPage: React.FC<ProblemPageProps> = ({ params }) => {
  return (
    <div className="h-screen overflow-hidden">
      <Workspace slug={params.id} />
    </div>
  );
};

export default ProblemPage;
