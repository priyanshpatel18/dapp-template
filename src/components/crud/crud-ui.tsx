"use client";

import { Button } from "../ui/button";
import { useCrudProgram } from "./crud-data-access";
import { Keypair } from "@solana/web3.js"

export function CrudInitialize() {
  const { initialize } = useCrudProgram()

  return (
    <Button onClick={() => initialize.mutateAsync(Keypair.generate())}>
      Initialize
    </Button>
  );
}