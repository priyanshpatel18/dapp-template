"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCrudProgram } from "./crud-data-access";

export function CrudInitialize() {
  const { initialize } = useCrudProgram()
  const { publicKey } = useWallet()

  if (!publicKey) {
    return <p>Wallet not connected</p>
  }

  return (
    <Button onClick={() => {
      if (!publicKey) {
        return toast.error('Wallet not connected');
      }
      initialize.mutateAsync(Keypair.generate())
    }}>
      Initialize
    </Button>
  );
}