import { ChainId } from '@uniswap/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x43cd24bfEBCD96A7371aB32522242fa6b8f705CA',
  [ChainId.RINKEBY]: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
  [ChainId.NODOKA_TEST]: '0x6B6Fb3B0cd54907A2DdEe1dad4fbC0b22c3b3785'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
