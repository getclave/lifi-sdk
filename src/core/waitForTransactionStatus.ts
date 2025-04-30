import type { FullStatusData, LiFiStep, StatusResponse } from '@lifi/types'
import { ServerError } from '../errors/errors'
import { getStatus } from '../services/api'
import { waitForResult } from '../utils/waitForResult'
import type { StatusManager } from './StatusManager'
import { getSubstatusMessage } from './processMessages'
import type { ProcessType } from './types'

const TRANSACTION_HASH_OBSERVERS: Record<string, Promise<StatusResponse>> = {}

export async function waitForTransactionStatus(
  txHash: string,
  statusManager: StatusManager,
  processType: ProcessType,
  step: LiFiStep,
  interval = 5_000
): Promise<StatusResponse> {
  const _getStatus = (): Promise<StatusResponse | undefined> => {
    return getStatus({
      fromChain: step.action.fromChainId,
      toChain: step.action.toChainId,
      txHash,
      ...(step.tool !== 'custom' && { bridge: step.tool }),
    })
      .then((statusResponse) => {
        switch (statusResponse.status) {
          case 'DONE':
            return statusResponse
          case 'PENDING':
            statusManager?.updateProcess(step, processType, 'PENDING', {
              substatus: statusResponse.substatus,
              substatusMessage:
                statusResponse.substatusMessage ||
                getSubstatusMessage(
                  statusResponse.status,
                  statusResponse.substatus
                ),
              txLink: (statusResponse as FullStatusData).bridgeExplorerLink,
            })
            return undefined
          case 'NOT_FOUND':
            return undefined
          default:
            return Promise.reject()
        }
      })
      .catch((e) => {
        if (process.env.NODE_ENV === 'development') {
          console.debug('Fetching status from backend failed.', e)
        }
        return undefined
      })
  }

  let status = TRANSACTION_HASH_OBSERVERS[txHash]

  if (!status) {
    status = waitForResult(_getStatus, interval)
    TRANSACTION_HASH_OBSERVERS[txHash] = status
  }

  const resolvedStatus = await status

  if (!('receiving' in resolvedStatus)) {
    throw new ServerError(
      "Status doesn't contain destination chain information."
    )
  }

  return resolvedStatus
}
