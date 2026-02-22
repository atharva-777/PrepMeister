"use client";
import React, { useState } from "react";
import Description from "./Description/Description";
import Playground from "./Playground/Playground";
import Split from "react-split";
import { useQuery } from "react-query";
import ProblemService from "@/app/services/problem.service";
import { useSession } from "next-auth/react";
import Loader from "@/app/components/Loader";

interface ProblemType {
  _id: string;
  title: string;
  description: string;
  number: number;
  tags: Array<string>;
  company: Array<string>;
  level: string;
  slug: string;
  examples: Array<{
    input: string;
    output: string;
    explaination: string;
    _id?: string;
  }>;
}

type WorkspaceProps = {
  slug: string;
};

const Workspace: React.FC<WorkspaceProps> = ({ slug }) => {
  const { data: session, status: sessionStatus } = useSession();
  const [problem, setProblem] = useState<ProblemType>();

  const { isLoading, error, data } = useQuery({
    queryKey: ["problem", slug],
    queryFn: async () => {
      if (!slug) return null;
      const response = await ProblemService.getSingleProblem(slug);
      return response;
    },
    enabled: !!slug,
    onSuccess: (data) => {
      if (data?.data) {
        setProblem(data.data);
      }
    },
  });

  if (sessionStatus === "loading") {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader variant="page" message="Checking session..." />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center rounded-2xl border border-slate-200 bg-white/70 px-8 py-10 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Login Required</h2>
          <p className="text-slate-600">Please log in to solve problems</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader variant="page" message="Loading problem..." />
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center rounded-2xl border border-slate-200 bg-white/70 px-8 py-10 shadow-sm backdrop-blur">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Problem Not Found</h2>
          <p className="text-slate-600">The problem you&apos;re looking for doesn&apos;t exist</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-3 md:p-4">
      <div className="h-full rounded-2xl border border-slate-200/70 bg-white/70 shadow-xl backdrop-blur">
        <Split className="flex h-full" minSize={320} sizes={[42, 58]} gutterSize={10}>
          <Description problem={problem} />
          <Playground problem={problem} slug={slug} />
        </Split>
      </div>
    </div>
  );
};

export default Workspace;
