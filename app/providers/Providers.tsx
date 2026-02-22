"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { UserProvider } from "../context/UserProvider";
import { ProblemProvider } from "../context/ProblemContext";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

const client = new QueryClient();

type ProviderProps = {
  children: React.ReactNode;
};

const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
      <Toaster/>
      <ThemeProvider>
        <SessionProvider>
        {/* <UserProvider>
          <ProblemProvider> */}
            <QueryClientProvider client={client}>
              {children}
              <ThemeToggle />
            </QueryClientProvider>
          {/* </ProblemProvider>
        </UserProvider> */}
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
