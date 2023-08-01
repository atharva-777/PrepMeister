"use client";
import Topbar from "@/app/components/Topbar";
import React from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = ({ params }: any) => {
  return (
    <div>
      <Topbar problemPage={true} />
      <div className="text-center text-lg">Problem : {params.id}</div>
    </div>
  );
};

export default ProblemPage;
