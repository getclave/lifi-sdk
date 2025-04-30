import { http, HttpResponse } from 'msw'
import { buildStepObject } from '../../tests/fixtures'
import { config } from '../config'
import {
  mockChainsResponse,
  mockStatus,
  mockStepTransactionWithTxRequest,
} from './execution.unit.mock'

const _config = config.get()

export const lifiHandlers = [
  http.post(`${_config.apiUrl}/advanced/stepTransaction`, async () =>
    HttpResponse.json(
      mockStepTransactionWithTxRequest(
        buildStepObject({
          includingExecution: true,
        })
      )
    )
  ),
  http.get(`${_config.apiUrl}/chains`, async () =>
    HttpResponse.json({
      chains: mockChainsResponse,
    })
  ),
  http.get(`${_config.apiUrl}/status`, async () =>
    HttpResponse.json(mockStatus)
  ),
]
