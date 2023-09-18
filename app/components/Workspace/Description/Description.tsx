import React from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { TbCircleCheckFilled } from "react-icons/tb";

type DescriptionProps = {
  problem: ProblemType;
};

const Description: React.FC<DescriptionProps> = ({ problem }) => {
  return (
    <div className="h-screen overflow-auto flex-1">
      <div className="text-md m-2 font-sans font-light text-start">
        {/* overall description */}
        <div className="flex flex-col">
          {/* title */}
          <div className="text-xl hover:font-bold font-medium flex flex-row">
            <div>
              {problem.number} {problem.title}
            </div>
            <div>
              <TbCircleCheckFilled size={10} />
            </div>
          </div>
          {/* Description */}
          <div className="font-sm text-neutral-700">
            {problem.description}
          </div>

          {/* examples */}
          <div className="flex flex-col justify-between">
            <h3 className="text-center m-2 text-lg font-bold">Examples</h3>
            <div>
              {problem.examples &&
                problem.examples.map((example, key) => {
                  return (
                    <div
                      className=" border shadow-lg bg-gray-200/100 m-3 p-4"
                      key={key}
                    >
                      <h2 className="">Example No : {key + 1}</h2>
                      <ul>
                        <li>Input : {example.input}</li>
                        <li>Output : {example.output}</li>

                        <li>Explaination : {example.explaination}</li>
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
