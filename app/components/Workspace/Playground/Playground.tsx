import React, { useCallback, useMemo, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import Split from "react-split";
import PreferenceBar from "./PreferenceBar/Preference";
import EditorFooter from "./Footer/EditorFooter";
import { toast } from "react-hot-toast";
import codes from "@/utils/boilerPlateCodes";
import { testCases } from "@/utils/testcases";
import { TestCase } from "@/utils/types/testcase";
import SubmissionService from "@/app/services/submission.service";
import { languageOptions } from "@/constants/languageOptions";
import axios from "axios";
import { useSession } from "next-auth/react";

type PlaygroundProps = {
  slug: string;
  problem: ProblemType;
};

const EMPTY_TESTCASES: TestCase = {
  cases: [],
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Playground: React.FC<PlaygroundProps> = ({ slug, problem }) => {
  const { data: session } = useSession();
  const [processing, setProcessing] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("javascript");
  const [userCode, setUserCode] = useState<string>(codes.javascript.code);
  const [resultMessage, setResultMessage] = useState<string>(
    "Run code to see testcase output."
  );
  const [submissionMessage, setSubmissionMessage] = useState<string>("");
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  const currTestCases = useMemo<TestCase>(() => testCases[slug] || EMPTY_TESTCASES, [slug]);
  const selectedCase = currTestCases.cases[selectedCaseIndex];

  const extensions = useMemo(() => {
    if (language === "javascript" || language === "typescript") {
      return [javascript({ jsx: true })];
    }
    return [cpp()];
  }, [language]);

  const getLanguageId = () => {
    return languageOptions.find((option) => option.value === language)?.id ?? 63;
  };

  const getSubmissionToken = (response: any) =>
    response?.res?.token || response?.token || response?.data?.token || "";

  const normalizeSubmissionResult = (response: any) => {
    const source = response?.output || response?.res || response;
    const status = source?.status || {};
    const stdout = source?.stdout ?? "";
    const stderr = source?.stderr ?? "";
    const compile_output = source?.compile_output ?? "";
    const message = source?.message ?? "";
    const statusId = Number(status?.id ?? -1);
    const statusDesc = String(status?.description || "").toLowerCase();

    return {
      statusId,
      statusDesc,
      stdout: String(stdout || ""),
      stderr: String(stderr || ""),
      compileOutput: String(compile_output || ""),
      message: String(message || ""),
    };
  };

  const pollSubmission = async (token: string) => {
    for (let attempt = 0; attempt < 12; attempt++) {
      const response = await SubmissionService.getSubmission(token);
      const parsed = normalizeSubmissionResult(response);
      if (![1, 2].includes(parsed.statusId)) {
        return parsed;
      }
      await sleep(1200);
    }
    return null;
  };

  const updateSolvedProblem = async () => {
    if (!session?.user?.email) return;

    await axios.post("/api/users/updateSolved", {
      email: session.user.email,
      num: problem.number,
    });
  };

  const handleSubmit = async () => {
    if (processing) return;

    if (!currTestCases.cases.length) {
      toast.error("No testcase configured for this problem.");
      return;
    }

    try {
      setProcessing(true);
      setSubmissionMessage("Submitting...");
      const language_id = getLanguageId();

      let passed = 0;
      for (let index = 0; index < currTestCases.cases.length; index++) {
        const testCase = currTestCases.cases[index];
        const submission = await SubmissionService.createSubmission({
          language_id,
          source_code: userCode,
          stdin: testCase.input,
          expected_output: testCase.expected,
        });

        const token = getSubmissionToken(submission);
        if (!token) {
          throw new Error("Failed to create submission token");
        }

        const result = await pollSubmission(token);
        if (!result) {
          throw new Error("Timed out while waiting for submission result");
        }

        const isAccepted = result.statusId === 3 || result.statusDesc.includes("accepted");
        if (!isAccepted) {
          setSubmissionMessage(
            `Wrong answer on case ${index + 1}: ${
              result.stderr ||
              result.compileOutput ||
              result.message ||
              result.stdout ||
              "Execution failed"
            }`
          );
          toast.error("Submission failed");
          return;
        }

        passed += 1;
      }

      setSubmissionMessage(`Accepted (${passed}/${currTestCases.cases.length} testcases passed)`);
      toast.success("Accepted");
      await updateSolvedProblem().catch(() => null);
    } catch (error: any) {
      setSubmissionMessage(error?.message || "Submission failed");
      toast.error("Submission failed");
    } finally {
      setProcessing(false);
    }
  };

  const onChange = useCallback((val: string) => {
    setUserCode(val);
  }, []);

  const handleCompile = async () => {
    if (processing) return;

    try {
      setProcessing(true);
      setResultMessage("Running...");

      const firstCase = currTestCases.cases[0];
      const submission = await SubmissionService.createSubmission({
        language_id: getLanguageId(),
        source_code: userCode,
        stdin: firstCase?.input || "",
      });

      const token = getSubmissionToken(submission);
      if (!token) {
        throw new Error("Failed to create run token");
      }

      const result = await pollSubmission(token);
      if (!result) {
        throw new Error("Timed out while waiting for run result");
      }

      const output = result.stdout || result.stderr || result.compileOutput || result.message;
      setResultMessage(output || "Execution finished with no output.");
      toast.success("Run completed");
    } catch (error: any) {
      setResultMessage(error?.message || "Failed to run code");
      toast.error("Run failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-r-2xl border-l border-slate-700/40 bg-slate-950 text-slate-100"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace" }}
    >
      <PreferenceBar language={language} setLanguage={setLanguage} setUserCode={setUserCode} />

      <Split className="relative z-0 flex-1 min-h-0" direction="vertical" sizes={[62, 38]} minSize={120}>
        <div className="h-full min-h-0 overflow-hidden p-3">
          <div className="h-full min-h-0 overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900 shadow-[0_20px_45px_-20px_rgba(34,211,238,0.35)]">
            <CodeMirror
              value={userCode}
              theme={oneDark}
              extensions={extensions}
              height="100%"
              style={{ fontSize: 15 }}
              className="h-full min-h-0 [&_.cm-editor]:h-full [&_.cm-scroller]:overflow-auto"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="h-full overflow-auto px-4 pb-4">
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Testcases</p>
              <p className="text-xs text-slate-400">
                {currTestCases.cases.length ? `${currTestCases.cases.length} cases` : "No cases"}
              </p>
            </div>

            {currTestCases.cases.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {currTestCases.cases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCaseIndex(idx)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                      selectedCaseIndex === idx
                        ? "bg-cyan-500/25 text-cyan-200 ring-1 ring-cyan-400/70"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
              </div>
            )}

            {selectedCase && (
              <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
                <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">Input</p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-200">
                    {selectedCase.input}
                  </pre>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                    Expected Output
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-200">
                    {selectedCase.expected}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Run Result</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-200">{resultMessage}</pre>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Submission</p>
              <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-200">
                {submissionMessage || "No submission yet."}
              </pre>
            </div>
          </div>
        </div>
      </Split>

      <EditorFooter
        handleSubmit={handleSubmit}
        handleCompile={handleCompile}
        processing={processing}
      />
    </div>
  );
};

export default Playground;
