import { createConfig } from '../src/createConfig'
import { EVM } from '../src/index'

export const setupTestEnvironment = () => {
  createConfig({
    integrator: 'lifi-sdk',
    providers: [EVM()],
  })
}
