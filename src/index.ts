// biome-ignore lint/performance/noBarrelFile: module entrypoint
// biome-ignore lint/performance/noReExportAll: types
export * from '@lifi/types'
export { config } from './config'
export { EVM } from './core/EVM/EVM'
export {
  getTokenAllowance,
  getTokenAllowanceMulticall,
} from './core/EVM/getAllowance'
export {
  revokeTokenApproval,
  setTokenAllowance,
} from './core/EVM/setAllowance'
export { isEVM } from './core/EVM/types'
export { isBatchingSupported } from './core/EVM/isBatchingSupported'
export { isExtendedChain, convertExtendedChain } from './core/EVM/utils'
export { isRelayerStep, isGaslessStep } from './core/EVM/typeguards'
export type {
  EVMProvider,
  EVMProviderOptions,
} from './core/EVM/types'
export { StatusManager } from './core/StatusManager'
export {
  executeRoute,
  getActiveRoute,
  getActiveRoutes,
  resumeRoute,
  stopRouteExecution,
  updateRouteExecution,
} from './core/execution'
export type {
  AcceptExchangeRateUpdateHook,
  AcceptSlippageUpdateHook,
  AcceptSlippageUpdateHookParams,
  ExchangeRateUpdateParams,
  Execution,
  ExecutionOptions,
  ExecutionStatus,
  InteractionSettings,
  LiFiStepExtended,
  Process,
  ProcessStatus,
  ProcessType,
  RouteExecutionData,
  RouteExecutionDataDictionary,
  RouteExecutionDictionary,
  RouteExtended,
  SDKProvider,
  StepExecutor,
  StepExecutorOptions,
  StepExtended,
  SwitchChainHook,
  TransactionParameters,
  TransactionRequestParameters,
  TransactionRequestUpdateHook,
  UpdateRouteHook,
} from './core/types'
export { createConfig } from './createConfig'
export { checkPackageUpdates } from './utils/checkPackageUpdates'
export { convertQuoteToRoute } from './utils/convertQuoteToRoute'
export { fetchTxErrorDetails } from './utils/fetchTxErrorDetails'
export {
  getChains,
  getConnections,
  getContractCallsQuote,
  getGasRecommendation,
  getQuote,
  getRelayerQuote,
  getRoutes,
  getStatus,
  getStepTransaction,
  getToken,
  getTokens,
  getTools,
  getTransactionHistory,
} from './services/api'
export {
  getTokenBalance,
  getTokenBalances,
  getTokenBalancesByChain,
} from './services/balance'
export { getNameServiceAddress } from './services/getNameServiceAddress'
export type { RPCUrls, SDKBaseConfig, SDKConfig } from './types/internal'
export { BaseError } from './errors/baseError'
export {
  ErrorMessage,
  ErrorName,
  LiFiErrorCode,
} from './errors/constants'
export type { ErrorCode } from './errors/constants'
export {
  BalanceError,
  ProviderError,
  RPCError,
  ServerError,
  TransactionError,
  UnknownError,
  ValidationError,
} from './errors/errors'
export { HTTPError } from './errors/httpError'
export { SDKError } from './errors/SDKError'
