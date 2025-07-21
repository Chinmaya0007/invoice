import React from "react";

export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}
