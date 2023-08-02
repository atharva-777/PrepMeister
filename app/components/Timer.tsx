"use client";
import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { MdTimer } from "react-icons/md";

type TimerProps = {};

const Timer: React.FC<TimerProps> = () => {
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [showTimer]);

  // Function to format seconds to HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {showTimer ? (
        <div className="flex items-center space-x-2 bg-stone-400 p-4 cursor-pointer rounded hover:bg-stone-300">
          <div
            onClick={() => {
              setShowTimer(false);
              setSeconds(0);
            }}
          >
            {formatTime(seconds)}
          </div>
          <FiRefreshCcw onClick={() => setSeconds(0)} />
        </div>
      ) : (
        <div
          className="flex items-center p-4 hover:bg-stone-300 rounded cursor-pointer"
          onClick={() => {
            setShowTimer(true);
            setSeconds(0);
          }}
        >
          <MdTimer size={30} />
        </div>
      )}
    </div>
  );
};

export default Timer;
