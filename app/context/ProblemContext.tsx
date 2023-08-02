"use client";
import React, { createContext,useState } from "react";
import axios from "axios";

const p: ProblemType = {
  _id: "",
  title: "",
  description: "",
  number: 0,
  level: "",
  tags: [],
  comapany: [],
  slug: "",
};

const ProblemContext = createContext({});

const getProblem = async (slug: string) => {
  try {
    const p = await axios.post("/api/problem/getProblem", { slug: slug });
    return p.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

const ProblemProvider = ({ children }: { children: React.ReactNode }) => {
    const [problem,setProblem] = useState<ProblemType>(p);
  return (
    <ProblemContext.Provider value={{problem,setProblem}}>
      {children}
    </ProblemContext.Provider>
  );
};

export { ProblemContext, ProblemProvider };
