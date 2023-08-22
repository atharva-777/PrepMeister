"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "../context/UserProvider";
import {  ProblemProvider } from "../context/ProblemContext";

const client = new QueryClient();

type ProviderProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <UserProvider>
        <ProblemProvider>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </ProblemProvider>
      </UserProvider>
    </>
  );
};

export default Providers;
