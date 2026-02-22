import React from "react";
import Link from "next/link";
import { BsChatDots, BsPeople, BsPlusCircle } from "react-icons/bs";

const groupsActions = [
  {
    title: "Create Group",
    description:
      "Start a focused room for interview prep, weekly contests, or topic-wise revision.",
    href: "/createGroup",
    icon: <BsPlusCircle className="text-2xl" />,
    accent: "from-cyan-500 to-blue-500",
  },
  {
    title: "Join Group",
    description:
      "Enter with chat ID or group name and jump into active problem-solving discussions.",
    href: "/joinGroup",
    icon: <BsPeople className="text-2xl" />,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Open Chats",
    description:
      "Continue ongoing conversations, review messages, and collaborate in real time.",
    href: "/chats",
    icon: <BsChatDots className="text-2xl" />,
    accent: "from-amber-500 to-orange-500",
  },
];

const Groups = () => {
  return (
    <div className="relative min-h-[calc(100vh-60px)] overflow-hidden bg-slate-100 pt-20 dark:bg-slate-950">
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/15 dark:bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-emerald-400/15 dark:bg-emerald-400/20 blur-3xl" />

      <section className="relative mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-300 bg-white/90 p-6 backdrop-blur md:p-10 dark:border-slate-700/70 dark:bg-slate-900/75">
          <p className="inline-flex rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-cyan-700 dark:border-cyan-300/40 dark:bg-cyan-400/10 dark:text-cyan-200">
            GROUP LEARNING
          </p>
          <h1
            className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl dark:text-white"
            style={{ fontFamily: "'Space Grotesk', 'Sora', ui-sans-serif, sans-serif" }}
          >
            Collaborate On Problems,
            <br />
            Not In Isolation
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-base dark:text-slate-300">
            Use groups to practice consistently with peers. Create focused rooms, join active
            cohorts, and keep problem-solving momentum with structured discussions.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <p className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">3 Steps</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Create, Join, Solve
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">Live</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Group Messaging
              </p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
              <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">Focused</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                Prep Workflows
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {groupsActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-2xl border border-slate-300 bg-white/90 p-5 transition hover:-translate-y-1 hover:border-slate-400 hover:bg-white dark:border-slate-700/70 dark:bg-slate-900/70 dark:hover:border-slate-500 dark:hover:bg-slate-900"
            >
              <div
                className={`inline-flex rounded-lg bg-gradient-to-r ${action.accent} p-3 text-white shadow-lg`}
              >
                {action.icon}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{action.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{action.description}</p>
              <p className="mt-5 text-sm font-semibold text-cyan-700 transition group-hover:text-cyan-600 dark:text-cyan-200 dark:group-hover:text-cyan-100">
                Continue -&gt;
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Groups;
