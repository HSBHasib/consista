"use client";

import { type ReactNode } from "react";
import { GoeyToaster } from "goey-toast";

interface ProvidersProps {
  readonly children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <GoeyToaster position="top-right" theme="light" />
      {children}
    </>
  );
}
