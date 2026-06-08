import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`rounded-xl border border-slate-700 ${className}`}>
      {children}
    </div>
  );
}