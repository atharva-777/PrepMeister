"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "../context/UserProvider";
import { ProblemProvider } from "../context/ProblemContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const client = new QueryClient();

type ProviderProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
    <Toaster/>
      <SessionProvider>
        {/* <UserProvider>
          <ProblemProvider> */}
            <QueryClientProvider client={client}>
              {children}
            </QueryClientProvider>
          {/* </ProblemProvider>
        </UserProvider> */}
      </SessionProvider>
    </>
  );
};

export default Providers;
