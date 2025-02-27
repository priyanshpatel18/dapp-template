import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'

import CrudIDL from '../target/idl/crud.json';
import type { Crud } from '../target/types/crud';

export { Crud, CrudIDL }

export const MY_PROGRAM_PROGRAM_ID = new PublicKey(CrudIDL.address)

export function getCrudProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...CrudIDL, address: address ? address.toBase58() : CrudIDL.address } as Crud, provider)
}

export function getCrudProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      return new PublicKey('FPHQ1sMbRbHyJuBDHwYU8q15W4FdFQT1Zvc3LVsgwYYK')
    case 'mainnet-beta':
    default:
      return MY_PROGRAM_PROGRAM_ID
  }
}