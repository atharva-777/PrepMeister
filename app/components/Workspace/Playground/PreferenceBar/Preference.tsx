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
  handleLanguage: (sl:string) => void;
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


const PreferenceBar:React.FC<PreferenceBarProps> = ({handleLanguage}) => {
  const [isOpen, setIsOpen] = useState(false);
  let language = "Javascript";

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
          {language}
        </button>
        {languageOptions.map((lang,key)=>{
          return (
            <div key={key}>
              {/* <li onClick={()=>{handleLanguage(lang.name)}}>

              {lang.name}
              </li> */}
              </div>
          )
        })}
        {isOpen && (
          <ul className="z-50 absolute top-8 left-0 bg-black shadow-md w-40">
            <li
              className="py-2 px-4 hover:bg-blue-400 cursor-pointer"
                onClick={() => handleLanguage("javascript")}
              >
              Javascript
            </li>
            <li
              className="py-2 px-4 hover:bg-blue-400 cursor-pointer"
              onClick={() => handleLanguage("cpp")}
            >
              C++
            </li>
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
