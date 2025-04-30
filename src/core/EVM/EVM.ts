import { ChainType } from '@lifi/types'
import { isAddress } from 'viem'
import type { StepExecutorOptions } from '../types'
import { EVMStepExecutor } from './EVMStepExecutor'
import { getENSAddress } from './getENSAddress'
import { getEVMBalance } from './getEVMBalance'
import type { EVMProvider, EVMProviderOptions } from './types'

export function EVM(options?: EVMProviderOptions): EVMProvider {
  const _options: EVMProviderOptions = options ?? {}
  return {
    get type() {
      return ChainType.EVM
    },
    get options() {
      return _options
    },
    isAddress,
    resolveAddress: getENSAddress,
    getBalance: getEVMBalance,
    getWalletClient: _options.getWalletClient,
    async getStepExecutor(
      options: StepExecutorOptions
    ): Promise<EVMStepExecutor> {
      if (!_options.getWalletClient) {
        throw new Error('Client is not provided.')
      }

      const walletClient = await _options.getWalletClient()

      const executor = new EVMStepExecutor({
        client: walletClient,
        routeId: options.routeId,
        executionOptions: {
          ...options.executionOptions,
          switchChainHook:
            _options.switchChain ?? options.executionOptions?.switchChainHook,
        },
      })

      return executor
    },
    setOptions(options: EVMProviderOptions) {
      Object.assign(_options, options)
    },
  }
}
