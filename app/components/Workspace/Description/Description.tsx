import React from "react";

type DescriptionProps = {
  problem: ProblemType;
};

const Description: React.FC<DescriptionProps> = ({ problem }) => {
  return (
    <div className="h-screen overflow-auto flex-1">
      <div className="text-md m-2 font-sans font-light text-start">
        <ul>
          <li className="text-xl font-bold">
            <span>
              {problem.number}
              {". "}
            </span>
            {problem.title}
          </li>
          <li>{problem.description}</li>
          <li>{problem.level}</li>
          <li>{problem.slug}</li>
          <li>{problem._id}</li>
          <li>{problem.tags[0]}</li>
          <li>{problem.company[0]}</li>

          <li>{problem.description}</li>
          <li>{problem.level}</li>
          <li>{problem.slug}</li>
          <li>{problem._id}</li>
          <li>{problem.tags[0]}</li>
          <li>{problem.company[0]}</li>
        </ul>
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
  );
};

export default Description;
