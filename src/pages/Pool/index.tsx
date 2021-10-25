import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair, JSBI } from '@uniswap/sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE, HideSmall } from '../../theme'
import { Text } from 'rebass'
import Card from '../../components/Card'
import { RowBetween } from '../../components/Row'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'
import { useTranslation } from 'react-i18next'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { useStakingInfo } from '../../state/stake/hooks'
import { BIG_INT_ZERO } from '../../constants'
import SwapLiquidity, { SwapLiquidityTabs } from 'components/SwapLiquidity/SwapLiquidity'

const PageWrapper = styled(AutoColumn)`
  width: 100%;
  background-color: #ffffff;
  max-width: 1026px;
  max-height: 600px;
  border-radius: 6px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border: 1px solid #dfe0eb;
  @media (max-width: 1294px) {
    width: 900px;
  }
  @media (max-width: 1024px) {
    width: 760px;
  }
  @media (max-width: 768px) {
    width: 500px;
  }
  @media (max-width: 419px) {
    width: 360px;
  }
`

const TitleRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-direction: column-reverse;
    @media(max-width:419px){
      flex-direction:row;
      justify-content:space-between;
      align-items:center;
    }
  `};
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  width: fit-content;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 48%;
  `};
`

const EmptyProposals = styled.div`
  // border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 'none';
  
`
// define styled CSS
const BottomContent = styled.div`
  min-height: 300;
  border-radius: 6px;
  background: linear-gradient(92.3deg, rgba(197, 199, 205, 0.3) 0%, rgba(197, 199, 205, 0.3) 99.15%);
  @media (max-width: 768px) {
    width: 500px;
    padding: 30px;
  }
  @media (max-width: 419px) {
    width: 360px;
  }
`
const CustomDiv = styled.div`
  width: 100%;
  padding-left: 140px;
  padding-right: 140px;
  margin-bottom: 20px;
  height: 50px;
  @media (max-width: 768px) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @media (max-width: 419px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`
const FindToken = styled.button`
  font-size: 19px;
  font-weight: 400;
  color: #42b7a0;
  align-items: center;
  border: 1px solid #42b7a0;
  border-radius: 6px;
  height: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid #42b7a0;
  border-radius: 6px;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0px 0px 1px rgba(26, 32, 36, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32);
  background: linear-gradient(90.43deg, #dfe0eb 0%, #dfe0eb 100%);
  width: 100%;
  margin-left: 140px;
  margin-right: 140px;
  margin-bottom: 20px;
  height: 50px;
  @media (max-width: 768px) {
    margin-left: 80px;
    margin-right: 80px;
  }
  @media (max-width: 419px) {
    font-size: 15px;
    margin-left: 40px;
    margin-right: 40px;
  }
`

const TextNoLiquidity = styled.span`
  font-size: 36px;
  color: #5b6871;
  font-weight: 400;
  @media (max-width: 419px) {
    font-size: 25px;
  }
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const [t] = useTranslation()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  // show liquidity even if its deposited in rewards contract
  const stakingInfo = useStakingInfo()
  const stakingInfosWithBalance = stakingInfo?.filter(pool => JSBI.greaterThan(pool.stakedAmount.raw, BIG_INT_ZERO))
  const stakingPairs = usePairs(stakingInfosWithBalance?.map(stakingInfo => stakingInfo.tokens))

  // remove any pairs that also are included in pairs with stake in mining pool
  const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter(v2Pair => {
    return (
      stakingPairs
        ?.map(stakingPair => stakingPair[1])
        .filter(stakingPair => stakingPair?.liquidityToken.address === v2Pair.liquidityToken.address).length === 0
    )
  })

  return (
    <>
      <SwapLiquidity selected={SwapLiquidityTabs.LIQUIDITY} />
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />

        <AutoColumn gap="lg" justify="center">
          <AutoColumn gap="lg" style={{ width: '100%' }}>
            <TitleRow style={{ marginTop: '1rem', height: 100, borderBottom: '1px solid #DFE0EB' }} padding={'0'}>
              <HideSmall style={{ marginLeft: 30, display: 'block' }}>
                <TYPE.mediumHeader style={{ marginTop: '0.5rem' }}>
                  <Text
                    style={{
                      color: '#42B7A0',
                      fontWeight: 400,
                      fontSize: 19,
                      textTransform: 'uppercase'
                    }}
                  >
                    {t('title.yourLiquidity')}
                  </Text>
                  <Text style={{ color: '#9FA2B4', fontWeight: 400, fontSize: 12 }}>
                    {t('removeLiquidityToReviceTokens')}
                  </Text>
                </TYPE.mediumHeader>
              </HideSmall>
            </TitleRow>
            <BottomContent>
              {!account ? (
                <Card padding="40px">
                  <TYPE.body color={theme.text3} textAlign="center">
                    {t('connectWallet')}
                  </TYPE.body>
                </Card>
              ) : v2IsLoading ? (
                <EmptyProposals>
                  <TYPE.body textAlign="center" style={{ textTransform: 'capitalize' }}>
                    <TextNoLiquidity>{t('loading')}</TextNoLiquidity>
                  </TYPE.body>
                </EmptyProposals>
              ) : allV2PairsWithLiquidity?.length > 0 || stakingPairs?.length > 0 ? (
                <>
                  {v2PairsWithoutStakedAmount.map(v2Pair => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                  {stakingPairs.map(
                    (stakingPair, i) =>
                      stakingPair[1] && ( // skip pairs that arent loaded
                        <FullPositionCard
                          key={stakingInfosWithBalance[i].stakingRewardAddress}
                          pair={stakingPair[1]}
                          stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                        />
                      )
                  )}
                </>
              ) : (
                <EmptyProposals>
                  <TYPE.body textAlign="center" style={{ textTransform: 'capitalize' }}>
                    <TextNoLiquidity>{t('noLiquidityFound')}</TextNoLiquidity>
                  </TYPE.body>
                </EmptyProposals>
              )}
              <Text textAlign="center">
                <TextNoLiquidity>
                  {hasV1Liquidity ? t('message.uniswapV1Found') : t('message.dontSeeAPool')}{' '}
                </TextNoLiquidity>
              </Text>
              <StyledInternalLink
                id="import-pool-link"
                to={hasV1Liquidity ? '/migrate/v1' : '/find'}
                style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}
              >
                <FindToken>
                  {/* before title: Import it -> after: Find other LP tokens */}
                  {hasV1Liquidity ? t('message.migrateNow') : t('message.findOtherTokens')}
                </FindToken>
              </StyledInternalLink>
            </BottomContent>
            <AutoColumn justify={'center'} gap="md">
              <CustomDiv>
                <ResponsiveButtonPrimary
                  id="join-pool-button"
                  as={Link}
                  padding="6px 8px"
                  border-radius="12px"
                  to="/add/ETH"
                  style={{
                    background: 'linear-gradient(90.43deg, #42B7A0 0%, #69C7C7 100%)',
                    width: '100%',
                    borderRadius: 6,
                    cursor: 'pointer',
                    boxShadow: '0px 0px 1px rgba(26, 32, 36, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32)'
                  }}
                >
                  <Text
                    style={{ fontSize: 19, fontWeight: 400, color: '#ffff', padding: 10, textTransform: 'uppercase' }}
                  >
                    + {t('addLiquidity')}
                  </Text>
                </ResponsiveButtonPrimary>
              </CustomDiv>
            </AutoColumn>
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </>
  )
}
