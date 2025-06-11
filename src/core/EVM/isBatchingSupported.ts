import { ChainType } from '@lifi/types'
import type { Client } from 'viem'
import { getCapabilities } from 'viem/actions'
import { getAction } from 'viem/utils'
import { config } from '../../config'
import { sleep } from '../../utils/sleep'
import type { EVMProvider } from './types'

export async function isBatchingSupported({
  client,
  chainId,
}: {
  client?: Client
  chainId: number
}): Promise<boolean> {
  const _client =
    client ??
    (await (
      config.getProvider(ChainType.EVM) as EVMProvider
    )?.getWalletClient?.())

  if (!_client) {
    throw new Error('WalletClient is not provided.')
  }

  try {
    const capabilities = await Promise.race([
      getAction(_client, getCapabilities, 'getCapabilities')({ chainId }),
      sleep(2_000),
    ])
    return (
      capabilities?.atomicBatch?.supported ||
      capabilities?.atomic?.status === 'supported' ||
      capabilities?.atomic?.status === 'ready' ||
      false
    )
  } catch {
    // If the wallet does not support getCapabilities or the call fails,
    // we assume that atomic batch is not supported
    return false
  }
}
