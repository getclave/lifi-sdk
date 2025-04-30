import { createConfig } from '../src/createConfig'
import { EVM, Solana } from '../src/index'

export const setupTestEnvironment = () => {
  createConfig({
    integrator: 'lifi-sdk',
    providers: [EVM(), Solana()],
  })
}
