"use client";
import Workspace from "@/app/components/Workspace/Workplace";
import React from "react";

type ProblemPageProps = {
  params: { id: string };
};

const ProblemPage: React.FC<ProblemPageProps> = ({ params }) => {
  return (
    <div className="relative h-[calc(100vh-60px)] overflow-hidden bg-[#f3f6fb]">
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-cyan-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 -bottom-28 h-80 w-80 rounded-full bg-amber-300/35 blur-3xl" />
      <Workspace slug={params.id} />
    </div>
  );
};

export default ProblemPage;
