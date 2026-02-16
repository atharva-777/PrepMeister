"use client";

import React from "react";

type LoaderProps = {
  /** "fullPage" = entire viewport, "page" = large centered block, "section" = inline block, "inline" = small */
  variant?: "fullPage" | "page" | "section" | "inline";
  /** Optional message below spinner */
  message?: string;
  /** For dark backgrounds (e.g. landing) */
  dark?: boolean;
};

const spinnerClass = "rounded-full border-2 border-transparent border-t-current animate-spin";

export default function Loader({ variant = "page", message, dark = false }: LoaderProps) {
  const isFullPage = variant === "fullPage";
  const isPage = variant === "page";
  const isSection = variant === "section";
  const isInline = variant === "inline";

  const textColor = dark ? "text-white/90" : "text-gray-600";
  const spinnerSize = isInline ? "h-6 w-6 border" : isSection ? "h-10 w-10 border-2" : "h-12 w-12 border-b-2";
  const spinnerColor = dark ? "border-white/40 border-t-white" : "border-gray-200 border-t-blue-600";

  const content = (
    <div className={`flex flex-col items-center justify-center gap-3 ${isPage || isFullPage ? "min-h-[60vh]" : ""}`}>
      <div className={`${spinnerClass} ${spinnerSize} ${spinnerColor}`} role="status" aria-label="Loading" />
      {message && (
        <p className={`text-sm font-medium ${textColor}`}>{message}</p>
      )}
    </div>
  );

  if (isFullPage) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f12]">
        {content}
      </div>
    );
  }

  if (isPage) {
    return (
      <div className="flex items-center justify-center w-full py-24">
        {content}
      </div>
    );
  }

  if (isSection) {
    return (
      <div className="flex items-center justify-center w-full py-12">
        {content}
      </div>
    );
  }

  return content;
}
