import { getCrudProgram, getCrudProgramId } from "@project/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { toast } from "sonner";
import { useAnchorProvider } from "../Providers";
import { useTransactionToast } from "../useTransactionToast";

export function useCrudProgram() {
  const provider = useAnchorProvider();
  const cluster = useMemo(() => 'devnet' as Cluster, ['devnet' as Cluster]);
  const programId = useMemo(() => getCrudProgramId(cluster as Cluster), [cluster as Cluster]);
  const program = useMemo(() => getCrudProgram(provider, programId), [provider, programId])
  const { connection } = useConnection();
  const client = useQueryClient();

  const accounts = useQuery({
    queryKey: ['crud', 'all', { cluster }],
    queryFn: () => program.account.crudAccount.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['crud', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ crudAccount: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      useTransactionToast()(signature)
      client.invalidateQueries({ queryKey: ['get-program-account', { cluster }] })
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    accounts,
    initialize,
    getProgramAccount
  }
}

export function useCrudProgramAccounts({ account }: { account: PublicKey }) {
  const cluster = useMemo(() => 'devnet' as Cluster, ['devnet' as Cluster]);
  const { program, accounts } = useCrudProgram()

  const accountQuery = useQuery({
    queryKey: ['crud', 'fetch', { cluster, account }],
    queryFn: () => program.account.crudAccount.fetch(account),
  });

  return {
    accountQuery,
    accounts
  }
}