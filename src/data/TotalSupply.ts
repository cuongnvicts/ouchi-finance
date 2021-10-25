import { useState, useEffect, useMemo } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { Token, TokenAmount } from '@uniswap/sdk'
import { toBN } from 'web3-utils'
import { useTokenContract, useCustomTokenContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0]
  return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined
}

export const hexToDecimal = (hexStr: string, decimals: number) => {
  const str = toBN(hexStr).toString()
  const strPad = str.padStart(str.length + decimals, '0')
  const intStr = strPad.substr(0, strPad.length - decimals).replace(/^0+/, '')
  const decStr = strPad.substr(strPad.length - decimals).replace(/0+$/, '')
  const result = decStr ? (intStr ? intStr + '.' + decStr : '0.' + decStr) : intStr
  return result
}

export function useTotalValueLocked(tokenAddress: string | undefined): string {
  const contract = useCustomTokenContract(tokenAddress)
  const [totalSupply, setTotalSupply] = useState<string>('1')

  useEffect(() => {
    const getTotal = async () => {
      const newTotal = await contract?.methods.totalSupply().call()
      setTotalSupply(newTotal)
    }
    getTotal()
  }, [contract])

  return useMemo(() => (totalSupply ? hexToDecimal(toBN(totalSupply).toString(16), 18) : '0'), [totalSupply])
}
