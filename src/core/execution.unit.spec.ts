import { setupServer } from 'msw/node'
import type { Client } from 'viem'
import { sendTransaction } from 'viem/actions'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { requestSettings } from '../request'
import { buildRouteObject, buildStepObject } from '../tests/fixtures'
import { executeRoute } from './execution'
import { lifiHandlers } from './execution.unit.handlers'

let client: Partial<Client>

vi.mock('../balance', () => ({
  checkBalance: vi.fn(() => Promise.resolve([])),
}))

vi.mock('../execution/switchChain', () => ({
  switchChain: vi.fn(() => Promise.resolve(client)),
}))

vi.mock('../allowance/getAllowance', () => ({
  getAllowance: vi.fn(() => Promise.resolve(1500000n)),
}))

const step = buildStepObject({
  includingExecution: true,
})

describe.skip('Should pick up gas from wallet client estimation', () => {
  const server = setupServer(...lifiHandlers)

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  beforeEach(() => {
    requestSettings.retries = 0
    vi.clearAllMocks()

    client = {
      sendTransaction: () => Promise.resolve('0xabc'),
      getChainId: () => Promise.resolve(137),
      getAddresses: () =>
        Promise.resolve(['0x552008c0f6870c2f77e5cC1d2eb9bdff03e30Ea0']),
    } as Partial<Client>
  })

  afterEach(() => server.resetHandlers())
  afterAll(() => {
    server.close()
  })

  it('should pick up gas limit + price estimation from wallet client', async () => {
    const route = buildRouteObject({
      step,
    })

    await executeRoute(route)

    expect(sendTransaction).toHaveBeenCalledWith(client, {
      gasLimit: 125000n,
      gasPrice: 100000n,
      // TODO: Check the cause for gasLimit being outside transactionRequest. Currently working as expected in widget
      transactionRequest: {
        chainId: 137,
        data: '0xdata',
        from: '0x552008c0f6870c2f77e5cC1d2eb9bdff03e30Ea0',
        gasLimit: '682701',
        gasPrice: '0x27c01c1727',
        to: '0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE',
        value: '0x0600830dbc7f5bf7',
      },
    })
  })
})
