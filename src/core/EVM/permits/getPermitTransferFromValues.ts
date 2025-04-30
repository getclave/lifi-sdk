import type { ExtendedChain } from '@lifi/types'
import type { Address, Client } from 'viem'
import { readContract } from 'viem/actions'
import { permit2ProxyAbi } from '../abi'
import type { PermitTransferFrom } from './signatureTransfer'

export const getPermitTransferFromValues = async (
  client: Client,
  chain: ExtendedChain,
  tokenAddress: Address,
  amount: bigint
): Promise<PermitTransferFrom> => {
  const nonce = await readContract(client, {
    address: chain.permit2Proxy as Address,
    abi: permit2ProxyAbi,
    functionName: 'nextNonce',
    args: [client.account!.address],
  })

  return {
    permitted: {
      token: tokenAddress,
      amount: amount,
    },
    spender: chain.permit2Proxy as Address,
    nonce: nonce,
    deadline: BigInt(Math.floor(Date.now() / 1000) + 30 * 60), // 30 minutes
  }
}
