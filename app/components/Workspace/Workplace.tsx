// "use client"
import React,{useContext,useEffect} from "react";
import Description from "./Description/Description";
import Playground from "./Playground/Playground";
import Split from "react-split";
import { ProblemContext } from "@/app/context/ProblemContext";
import axios from "axios";

type WorkspaceProps = {
    slug: String;
};

const Workspace: React.FC<WorkspaceProps> = ({ slug }) => {

    const { problem, setProblem } = useContext<any>(ProblemContext);

    useEffect(() => {
      const getProblem = async (slug: String) => {
        try {
          const p = await axios.post("/api/problem/getProblem", {
            slug: slug,
          });
          setProblem(p.data.problem);
        //   console.log(problem)
        } catch (error: any) {
          console.log(error.message);
        }
      };
      getProblem(slug);
    }, []);

    return (
      <Split className="split">
          <Description problem={problem}/>
          <Playground />
      </Split>  
    );
};

export default Workspace;
