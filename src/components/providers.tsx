"use client";

import { useEffect, type ReactNode } from "react";
import { GoeyToaster } from "goey-toast";
import { getClientUserFullData, syncSessionToCookies } from "@/utils/auth-helpers.utils";

interface ProvidersProps {
  readonly children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
      async function sync() {
        const fullData = await getClientUserFullData();
        syncSessionToCookies(fullData);
      }
      sync();
    }, []);

  return (
    <>
      <GoeyToaster position="top-right" theme="light" />
      {children}
    </>
  );
}

