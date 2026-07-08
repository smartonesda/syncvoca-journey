"use client";

import type { ReactNode } from "react";
import { PageTransitionProvider } from "@/components/layout/page-transition-provider";
import { AppQueryProvider } from "@/lib/query/query-client-provider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AppQueryProvider>
      <PageTransitionProvider>{children}</PageTransitionProvider>
    </AppQueryProvider>
  );
}
