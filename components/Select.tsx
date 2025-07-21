import React from "react";

export function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className="border border-gray-300 rounded px-2 py-1" {...props}>
      {children}
    </select>
  );
}

export function SelectItem({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return <option value={value}>{children}</option>;
}
