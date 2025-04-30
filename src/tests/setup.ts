import { EVM } from '../core/EVM/EVM'
import { createConfig } from '../createConfig'

export const setupTestEnvironment = () => {
  createConfig({
    integrator: 'lifi-sdk',
    providers: [EVM()],
  })
}
