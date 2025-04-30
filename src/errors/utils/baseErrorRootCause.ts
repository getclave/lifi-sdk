import { BaseError } from '../baseError'
import { HTTPError } from '../httpError'

export const getRootCauseBaseError = (e: Error) => {
  let rootCause = e
  while (rootCause.cause && rootCause.cause instanceof BaseError) {
    rootCause = rootCause.cause as BaseError
  }
  return rootCause as BaseError
}

export const getRootCauseBaseErrorMessage = (e: Error) => {
  const rootCause = getRootCauseBaseError(e)

  return rootCause instanceof HTTPError
    ? (rootCause as HTTPError).responseBody?.message || rootCause.message
    : rootCause.message
}
