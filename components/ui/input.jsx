import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-lg border border-slate-700 bg-transparent px-3 py-2 ${className}`}
      {...props}
    />
  );
}