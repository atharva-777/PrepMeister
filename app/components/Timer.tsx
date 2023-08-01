"use client";
import  React,{useState} from "react";
import {FiRefreshCcw} from 'react-icons/fi'
import {MdTimer} from 'react-icons/md'

type TimerProps = {

}

const Timer:React.FC<TimerProps> = () => {
    const [showTimer,setShowTimer] = useState<boolean>(false);
    return (
        <div>
            {showTimer ? (
                <div className="flex items-center space-x-2 bg-stone-500 p-4 cursor-pointer rounded hover:bg-stone-300" onClick={()=>setShowTimer(false)}>
                    <div>

                    00:08:45
                    </div>
                    <FiRefreshCcw/>
                </div>

            ) : (

                <div className="flex items-center p-4 hover:bg-stone-300 rounded cursor-pointer" onClick={()=>setShowTimer(true)}>
                    <MdTimer size={30}/>
                </div>
            )}
        </div>
    );
}

export default Timer;