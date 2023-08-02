"use client";
import Topbar from "@/app/components/Topbar";
import Workspace from "@/app/components/Workspace/Workplace";
import React from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = ({ params }: any) => {
  return (
    <div>
      <Topbar problemPage={true} />
      <Workspace slug={params.id}/>
    </div>
  );
};

export default ProblemPage;
