"use client";
import Topbar from "@/app/components/Topbar";
import Workspace from "@/app/components/Workspace/Workplace";
import React from "react";

type ProblemPageProps = {
  params: { id: string };
};

const ProblemPage: React.FC<ProblemPageProps> = ({ params }) => {
  return (
    <div className="h-screen overflow-hidden">
      <Workspace slug={params.id} />
    </div>
  );
};

export default ProblemPage;
