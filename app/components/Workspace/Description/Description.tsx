import React from "react";
import { TbCircleCheckFilled } from "react-icons/tb";

type DescriptionProps = {
  problem: ProblemType;
};

const Description: React.FC<DescriptionProps> = ({ problem }) => {
  return (
    <div className="h-full overflow-auto flex-1 border-r border-slate-200/70 bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <div className="mx-auto max-w-4xl p-5 md:p-6 text-start">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl md:text-2xl font-semibold text-slate-900 leading-tight">
            {problem.number}. {problem.title}
          </h1>
          <TbCircleCheckFilled size={16} className="mt-1 text-emerald-500" />
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white/70 p-4">
          <h2 className="text-xs uppercase tracking-[0.2em] text-slate-500">Description</h2>
          <p className="mt-2 whitespace-pre-wrap text-[15px] leading-7 text-slate-700">
            {problem.description}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">Examples</h3>
          <div className="space-y-3">
            {problem.examples?.map((example, key) => (
              <div key={key} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <h4 className="text-sm font-semibold text-slate-800">Example {key + 1}</h4>
                <p className="mt-2 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Input:</span> {example.input}
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Output:</span> {example.output}
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Explanation:</span>{" "}
                  {example.explaination}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
