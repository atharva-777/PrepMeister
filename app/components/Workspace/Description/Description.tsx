import React from "react";

type DescriptionProps = {
    problem:ProblemType;
}

const Description:React.FC<DescriptionProps> = ({problem}) => {
    
    return (
      <div className="text-center p-8 text-lg font-bold h-screen">
        Problem Description
        <div className="text-md m-2 font-sans font-light text-start">
          <ul>
            <li>
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
          </ul>
          <div className="p-8 bg-slate-400">
          <h3 className="m-2">Examples</h3>
          {problem.examples && problem.examples.map((example, key) => {
            return (
              <div key={key}>
                <h2 className="m-2">Example : {key+1}</h2>
                <li>Input : {example.input}</li>
                <li>Output : {example.output}</li>
                <li>Explaination : {example.explaination}</li>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
}

export default Description