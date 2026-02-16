"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { HiOutlineLogin, HiOutlineUserAdd } from "react-icons/hi";

type AuthDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthDialog({ open, onClose }: AuthDialogProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <IoClose size={24} />
        </button>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Welcome to PrepMeister</h2>
        <p className="text-gray-500 text-sm mb-8">Choose an option to continue</p>
        <div className="space-y-3">
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            <HiOutlineLogin size={22} />
            Already a user? Login
          </Link>
          <Link
            href="/signup"
            onClick={onClose}
            className="flex items-center justify-center gap-3 w-full px-5 py-4 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl transition"
          >
            <HiOutlineUserAdd size={22} />
            New User? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
