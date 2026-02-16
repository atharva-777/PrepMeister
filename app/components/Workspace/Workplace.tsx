"use client";
import React, { useEffect, useState } from "react";
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
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader variant="page" message="Checking session..." />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600">Please log in to solve problems</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader variant="page" message="Loading problem..." />
      </div>
    );
  }

  if (error || !problem) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Problem Not Found</h2>
          <p className="text-gray-600">The problem you&apos;re looking for doesn&apos;t exist</p>
        </div>
      </div>
    );
  }

  return (
    <Split className="split" minSize={0}>
      <Description problem={problem} />
      <Playground problem={problem} slug={slug} />
    </Split>
  );
};

export default Workspace;
