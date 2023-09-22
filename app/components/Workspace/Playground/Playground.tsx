import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import {githubDark} from '@uiw/codemirror-theme-github'
import { javascript } from "@codemirror/lang-javascript";
import Split from "react-split";
import Preference from "./PreferenceBar/Preference";
import EditorFooter from "./Footer/EditorFooter";

type PlaygroundProps = {
  // language : string;
  // theme : string;
  problem : ProblemType;
};

const Playground: React.FC<PlaygroundProps> = ({}) => {

  const boilerPlate = `function twoSum(nums,target){
    // Write your code here
  };`;
  
  let [userCode,setUserCode] = useState<string>(boilerPlate);

  const selectLanguage = (sl:string) => {
    selectLanguage(sl);
  }


  const handleSubmit = () => {
    // Judge0 api 
  };

  return (
    <div className="flex flex-col bg-black text-white relative overflow-hidden">
      <Preference />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={boilerPlate}
            theme={githubDark}
            extensions={[javascript({jsx:true})]}
            style={{ fontSize: 16 }}
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

          <div className="flex">
            <div className="mr-2 items-start mt-2 ">
              <div className="flex flex-wrap items-center gap-y-4">
                <div
                  className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap`}
                >
                  Case 1
                </div>
              </div>
            </div>
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              atharva
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              not palindrome
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default Playground;
