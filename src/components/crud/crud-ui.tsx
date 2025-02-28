"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair, PublicKey } from "@solana/web3.js";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useCrudProgram } from "./crud-data-access";
import Link from "next/link";
import { ellipsify } from "@/lib/ellipsify";
import { getCrudProgramId } from "@project/anchor";
import { SquareArrowOutUpRightIcon } from "lucide-react";

export function CrudInitialize() {
  const { initialize } = useCrudProgram()
  const { publicKey } = useWallet()

  if (!publicKey) {
    return <p>Wallet not connected</p>
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Link
        href={`https://explorer.solana.com/address/${getCrudProgramId("devnet").toBase58()}?cluster=devnet`}
        className="underline font-bold flex gap-1 items-center"
        target="_blank"
      >
        {ellipsify(getCrudProgramId("devnet").toBase58(), 8)}
        <SquareArrowOutUpRightIcon className="w-3.5 h-3.5" />
      </Link>
      <Button onClick={() => {
        if (!publicKey) {
          return toast.error('Wallet not connected');
        }
        initialize.mutateAsync(Keypair.generate())
      }}>
        Initialize Account
      </Button>
    </div>
  );
}

export function CrudAccounts() {
  const { accounts, getProgramAccount } = useCrudProgram();

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }

  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <CrudCard account={account.publicKey} key={account.publicKey.toString()} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function CrudCard({ account }: { account: PublicKey }) {
  return (
    <div className="">
      <Link href={`https://explorer.solana.com/address/${account.toBase58()}?cluster=devnet`} target="_blank">
        <Button>
          {ellipsify(account.toBase58(), 8)}
        </Button>
      </Link>
    </div>
  )
}