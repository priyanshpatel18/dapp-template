import { getCrudProgram, getCrudProgramId } from "@project/anchor";
import { Cluster, Keypair } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { toast } from "sonner";
import { useAnchorProvider } from "../Providers";
import { useTransactionToast } from "../useTransactionToast";

export function useCrudProgram() {
  const provider = useAnchorProvider();
  const cluster = useMemo(() => 'devnet' as Cluster, ['devnet' as Cluster]);
  const programId = useMemo(() => getCrudProgramId(cluster as Cluster), [cluster as Cluster]);
  const program = useMemo(() => getCrudProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['learn', 'all', { cluster }],
    queryFn: () => program.account.crudAccount.all(),
  })

  const initialize = useMutation({
    mutationKey: ['learn', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ crudAccount: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      useTransactionToast()(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    accounts,
    initialize
  }
}