"use client";

import React from "react";
import { Provider } from "jotai";
import { Toaster } from "@/components/ui/toaster";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <Provider>{children}</Provider>
      <Toaster />
    </>
  );
}
