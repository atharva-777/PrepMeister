"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "../context/UserProvider";
import { ProblemProvider } from "../context/ProblemContext";
import { SessionProvider } from "next-auth/react";

const client = new QueryClient();

type ProviderProps = {
  children: React.ReactNode;
  session: any;
};

const Providers: React.FC<ProviderProps> = ({ children,session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <UserProvider>
          <ProblemProvider>
            <QueryClientProvider client={client}>
              {children}
            </QueryClientProvider>
          </ProblemProvider>
        </UserProvider>
      </SessionProvider>
    </>
  );
};

export default Providers;
