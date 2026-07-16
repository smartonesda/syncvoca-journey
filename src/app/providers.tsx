"use client";

import type { ReactNode } from "react";
import { PageTransitionProvider } from "@/components/layout/page-transition-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { AppQueryProvider } from "@/lib/query/query-client-provider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AppQueryProvider>
      <SmoothScroll />
      <PageTransitionProvider>{children}</PageTransitionProvider>
    </AppQueryProvider>
  );
}
