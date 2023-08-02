import React from "react";

type DescriptionProps = {
    problem:ProblemType;
}

const Description:React.FC<DescriptionProps> = ({problem}) => {
    
    return (
      <div className="text-center m-8 text-lg font-bold h-screen">
        Problem Description
        <div className="text-md font-sans text-start">
          <ul>
            <li>{problem.title}</li>
            <li>{problem.number}</li>
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