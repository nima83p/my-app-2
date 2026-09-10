import React, { PropsWithChildren, ReactNode } from "react";

export default function ErrorMassage({ children }: PropsWithChildren) {
    if (!children) return null;
  return (
    <div>
      <p className="mt-1 w-full text-sm text-red-500 bg-red-100 rounded p-2">
        {children}
      </p>
    </div>
  );
}
