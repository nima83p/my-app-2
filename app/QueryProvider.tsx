"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
}: {
  children: ReactNode;
}) {
  console.log("QUERY PROVIDER RUNNING");

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}