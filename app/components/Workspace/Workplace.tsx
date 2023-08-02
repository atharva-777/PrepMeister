import React from "react";
import Description from "./Description/Description";
import Playground from "./Playground/Playground";
import Split from "react-split";

type WorkspaceProps = {
    slug: String;
};

const Workspace: React.FC<WorkspaceProps> = ({ slug }) => {
    return (
    //   Problem : {slug}
    <Split className="split">
        <Description />
        <Playground />
    </Split>
  );
};

export default Workspace;
