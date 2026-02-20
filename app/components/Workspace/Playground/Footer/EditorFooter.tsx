import React from "react";
import { BsChevronUp } from "react-icons/bs";

type EditorFooterProps = {
  handleSubmit: () => void;
  handleCompile: () => void;
  processing: boolean;
};

const EditorFooter: React.FC<EditorFooterProps> = ({
  handleSubmit,
  handleCompile,
  processing,
}) => {
  return (
    <div className="w-full border-t border-slate-700/60 bg-slate-950/80 px-4 py-2 backdrop-blur">
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300">
          Console
          <BsChevronUp className="text-slate-400" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="rounded-lg border border-cyan-500/60 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleCompile}
            disabled={processing}
          >
            {processing ? "Running..." : "Run"}
          </button>
          <button
            className="rounded-lg border border-emerald-500/60 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleSubmit}
            disabled={processing}
          >
            {processing ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorFooter;
