import React from "react";

export function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="border border-gray-300 rounded px-2 py-1 text-sm w-full"
      {...props}
    />
  );
}
