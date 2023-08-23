import Navbar from "@/app/components/Navbar";
import Topbar from "@/app/components/Topbar";
import React from 'react'

export default function ProblemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
        <main>
            {/* <Topbar problemPage={true}/> */}
            <main>

        {children}
            </main>
        </main>
        </section>
  );
}
