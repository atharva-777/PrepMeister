// "use client"
import React,{useContext,useEffect} from "react";
import Description from "./Description/Description";
import Playground from "./Playground/Playground";
import Split from "react-split";
import { ProblemContext } from "@/app/context/ProblemContext";
import axios from "axios";
import { useQuery } from "react-query";
import ProblemService from "@/app/services/problem.service";

type WorkspaceProps = {
    slug: String;
};

const Workspace: React.FC<WorkspaceProps> = ({ slug }) => {

    const { problem, setProblem } = useContext<any>(ProblemContext);

    const {data,isLoading} = useQuery(
      ["problem"],
      () => ProblemService.getSingleProblem(slug),
      {
        onSuccess(data) {
          setProblem(data)
            console.log("data",data)
        },
        onError(err) {
            console.log("error occured")
        },
      }
    )
    

    useEffect(() => {
      const getProblem = async (slug: String) => {
        try {
          const p = await axios.post("/api/problem/getProblem", {
            slug: slug,
          });
          setProblem(p.data.problem);
          // console.log("res ",problem)
        } catch (error: any) {
          console.log(error.message);
        }
      };
      getProblem(slug);
    }, [setProblem, slug]);

    return (
      <Split className="split" minSize={0}>
          <Description problem={problem}/>
          <Playground />
      </Split>  
    );
};

export default Workspace;
