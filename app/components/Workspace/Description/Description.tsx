import React from "react";

type DescriptionProps = {
    problem:ProblemType;
}

const Description:React.FC<DescriptionProps> = ({problem}) => {
    
    return (
      <div className="text-center p-8  text-lg font-bold h-screen">
        Problem Description
        <div className="text-md m-2 font-sans font-light text-start">
          <ul>
            <li>
              <span>
              {problem.number}{". "}</span>
              {problem.title}
            </li>
            <li>{problem.description}</li>
            <li>{problem.level}</li>
            <li>{problem.slug}</li>
            <li>{problem._id}</li>
            <li>{problem.tags[0]}</li>
            <li>{problem.company[0]}</li>
          </ul>
        </div>
      </div>
    );
}

export default Description