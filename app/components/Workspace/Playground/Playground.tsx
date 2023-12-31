import React, { useCallback, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import Split from "react-split";
import PreferenceBar from "./PreferenceBar/Preference";
import EditorFooter from "./Footer/EditorFooter";
import { api } from "@/app/config/axios";
import { toast } from "react-hot-toast";
import codes from "@/utils/boilerPlateCodes";
import { testCases } from "@/utils/testcases";
import { TestCase } from "@/utils/types/testcase";
import SubmissionService from "@/app/services/submission.service";
import { languageOptions } from "@/constants/languageOptions";

type PlaygroundProps = {
  slug: String;
  problem: ProblemType;
};

const Playground: React.FC<PlaygroundProps> = ({ slug }) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("javascript");
  const [currTestCases, setCurrTestCases] = useState<TestCase>(
    testCases[slug.toString()]
  );
  const [userCode, setUserCode] = useState<string>(codes.javascript.code);
  const extensions = [cpp()];

  const handleSubmit = async () => {
    // Judge0 api
    const language_id = languageOptions.filter((lang)=> lang.value===language)[0].id;
    const source_code = (userCode);
    const stdin = currTestCases.cases[0].input;
    const expected_output = currTestCases.cases[0].expected; 
    const data = await SubmissionService.createSubmission({
      language_id: language_id,
      source_code: source_code,
      stdin: stdin,
      expected_output:expected_output,
    });
      const submission_token = data.res.token;
      const submission_stat = await SubmissionService.getSubmission(submission_token);
    console.log("submission done", data);
  };

  const onChange = useCallback((val: string, ViewUpdate: any) => {
    setUserCode(val);
  }, []);

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: 52,
      // encode source code in base64
      source_code: btoa(userCode),
      stdin: btoa(""), // input
    };
    const options = {
      method: "POST",
      url: process.env.NEXT_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.NEXT_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.NEXT_RAPID_API_KEY,
      },
      data: formData,
    };
    api
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        // checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

          toast.error(
            `Quota of 100 requests exceeded for the Day! Please read the blog on freeCodeCamp to learn how to setup your own RAPID API Judge0!
            10000
            `
          );
        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  return (
    <div className="flex flex-col bg-black text-white relative overflow-hidden">
      <PreferenceBar
        language={language}
        setLanguage={setLanguage}
        setUserCode={setUserCode}
      />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={githubDark}
            // extensions={[javascript({jsx:true})]}
            extensions={extensions}
            style={{ fontSize: 16 }}
            onChange={onChange}
          />
        </div>

        <div className="w-full px-5 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          {currTestCases && (
            <div className="grid grid-cols-2 bg-gray-600 p-3">
              {currTestCases.cases.map((testcase, idx) => {
                return (
                  <div key={idx}>
                    <div className="">
                      <div className="mr-2 items-start mt-2 ">
                        <div className="flex flex-wrap items-center gap-y-4">
                          <div
                            className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap`}
                          >
                            Case {idx}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="font-semibold my-4">
                      <p className="text-sm font-medium mt-4 text-white">
                        Input:
                      </p>
                      <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        Input : {testcase.input}
                      </div>
                      <p className="text-sm font-medium mt-4 text-white">
                        Output:
                      </p>
                      <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
                        Expected Output : {testcase.expected}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} handleCompile={handleCompile} />
    </div>
  );
};

export default Playground;
