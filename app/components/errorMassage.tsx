import React, { PropsWithChildren, ReactNode } from "react";

export default function ErrorMassage({ children }: PropsWithChildren) {
    if (!children) return null;
  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col items-center justify-center gap-5">
      <p className="mt-1 w-full text-sm text-red-500 bg-red-100 rounded p-2">
        {children}
      </p>
    </div>
  );
}
