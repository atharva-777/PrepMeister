import React from "react";
import Topbar from "../components/Topbar";

export default function GroupLayout({
    children,
}:{
    children:React.ReactNode;
}){
    return (
        <section>
            {children}
        </section>
    )
}