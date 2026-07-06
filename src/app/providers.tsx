"use client";

import type { ReactNode } from "react";
import { AppQueryProvider } from "@/lib/query/query-client-provider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <AppQueryProvider>{children}</AppQueryProvider>;
}
