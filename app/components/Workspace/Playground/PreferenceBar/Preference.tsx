"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineSetting,
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
} from "react-icons/ai";
import { BsCodeSlash } from "react-icons/bs";
import { languageOptions } from "@/constants/languageOptions";
import codes from "@/utils/boilerPlateCodes";

type PreferenceBarProps = {
  language: string;
  setLanguage: (lang: string) => void;
  setUserCode: (code: string) => void;
};

const PreferenceBar: React.FC<PreferenceBarProps> = ({
  language,
  setLanguage,
  setUserCode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    } else {
      document.documentElement.requestFullscreen?.();
    }
    setIsFullScreen(!isFullScreen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-40 flex items-center justify-between border-b border-slate-700/60 bg-slate-900/80 px-3 py-2 backdrop-blur">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-sm font-medium text-slate-200 hover:border-cyan-400/70 hover:text-cyan-200 transition"
        >
          <BsCodeSlash className="text-cyan-300" />
          {language}
        </button>

        {isOpen && (
          <ul className="absolute left-0 top-10 z-[80] grid max-h-64 w-[min(24rem,calc(100vw-2rem))] grid-cols-1 gap-1 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-2xl sm:grid-cols-2 md:grid-cols-3">
            {languageOptions.map((language, key) => {
              return (
                <li
                  key={key}
                  onClick={(e) => {
                    e.preventDefault();
                    setLanguage(language.value);
                    const selectedCode =
                      Object.values(codes).find((entry) => entry.name === language.value)
                        ?.code || codes.other.code;
                    setUserCode(selectedCode);
                    toggleDropdown();
                  }}
                  className="cursor-pointer rounded-md px-3 py-2 text-xs md:text-sm text-slate-200 hover:bg-cyan-500/20 hover:text-cyan-200 transition"
                >
                  {language.value}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/90 text-slate-300 transition hover:border-amber-400/70 hover:text-amber-200">
          <div className="h-4 w-4 text-base">
            <AiOutlineSetting />
          </div>
        </button>

        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/90 text-slate-300 transition hover:border-cyan-400/70 hover:text-cyan-200"
          onClick={handleFullScreen}
        >
          <div className="h-4 w-4 text-base">
            {!isFullScreen ? (
              <AiOutlineFullscreen />
            ) : (
              <AiOutlineFullscreenExit />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default PreferenceBar;
