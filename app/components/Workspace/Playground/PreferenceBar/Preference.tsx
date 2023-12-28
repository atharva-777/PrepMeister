"use client";
import React, { useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { languageOptions } from "@/constants/languageOptions";
import Modal from "@/app/components/CustomModal/Modal";

type PreferenceBarProps = {
  language: string;
  setLanguage: (lang:string) => void;
  // selectLanguage: (sl: string) => void;
};

// const PreferenceBar:React.FC<PreferenceBarProps> = ({handleLanguage}) => {
//   return (
//     <div>
//       <Modal open={true}>
//         <Preference handleLanguage={handleLanguage}/>
//       </Modal>
//     </div>
//   );
// }


const PreferenceBar:React.FC<PreferenceBarProps> = ({language,setLanguage}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-11 w-full "> 
      <div className="relative px-4">
        <button onClick={toggleDropdown} className="rounded-md">
          Language : {language}
        </button>

        {isOpen && (
          <ul className="z-50 absolute top-8 left-0 grid grid-cols-3 bg-gray-800 shadow-md w-96 rounded-md">
            {languageOptions.map((language,key)=>{
              return (
                <li
                  key={key}
                  onClick={(e)=>{
                    e.preventDefault();
                    setLanguage(language.value);
                    toggleDropdown();
                  }}
                  className="py-2 px-4 hover:bg-blue-400 cursor-pointer"
                >
                  {language.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center m-2">
        <button
          className="preferenceBtn group"
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
            <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
              {!isFullScreen ? (
                <AiOutlineFullscreen />
              ) : (
                <AiOutlineFullscreenExit />
              )}
            </div>
            <div className="preferenceBtn-tooltip">Full Screen</div>
          </button>
      </div>
    </div>
  );
};

export default PreferenceBar;
