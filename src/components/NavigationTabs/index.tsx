import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'
import Settings from '../Settings'
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'state'
import { resetMintState } from 'state/mint/actions'
import { Typography } from '@material-ui/core'
// import { HelpCircle } from 'react-feather'
import UpdateIcon from '@material-ui/icons/Update'

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 20px;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ActiveText = styled.div`
  font-weight: 400px
  font-size: 20px;
  color: #42b7a0;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;
  margin-top: 10px;
  
`

const StyledArrowLeft = styled(ArrowLeft)`
  // color: ${({ theme }) => theme.text1};
  color:#42B7A0;
  font-weight:600px;
  
`

const HeaderDescription = styled.div`
  color: #7a6eaa;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 20px;
`

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' }) {
  const { t } = useTranslation()

  return (
    <Tabs style={{ marginBottom: '20px', display: 'none' }}>
      <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
        {t('swap')}
      </StyledNavLink>
      <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
        {t('pool')}
      </StyledNavLink>
    </Tabs>
  )
}

export function FindPoolTabs() {
  const { t } = useTranslation()

  return (
    <Tabs>
      <RowBetween style={{ padding: '1rem 1rem 0 1rem' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText style={{ textTransform: 'uppercase' }}>
          {t('title.importV2Pool')}
          <HeaderDescription>
            <Typography style={{ fontSize: 12, fontWeight: 400, color: '#9FA2B4', textTransform: 'capitalize' }}>
              {t('importExistingPool')}
            </Typography>
          </HeaderDescription>
        </ActiveText>
        <Settings />
        <UpdateIcon style={{ color: '#42B7A0', width: 30, height: 30, fontWeight: 600, marginLeft: 10 }} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding, creating }: { adding: boolean; creating: boolean }) {
  const [t] = useTranslation()
  // reset states on back
  const dispatch = useDispatch<AppDispatch>()

  return (
    <Tabs>
      <RowBetween
        style={{
          padding: '1rem 1rem 0 1rem',
          borderBottom: '1px solid #DFE0EB'
        }}
      >
        <>
          <HistoryLink
            to="/pool"
            onClick={() => {
              adding && dispatch(resetMintState())
            }}
          >
            <StyledArrowLeft style={{ color: '#42B7A0', fontWeight: 600, fontSize: 40 }} />
          </HistoryLink>
          <ActiveText style={{ textTransform: 'uppercase' }}>
            {creating ? t('createAPair') : adding ? t('addLiquidity') : t('removeLiquidity')}
            <HeaderDescription>
              {/* <HelpCircle style={{ width: 15, height: 15 }} /> */}
              <Typography style={{ fontSize: 12, fontWeight: 400, color: '#9FA2B4', textTransform: 'capitalize' }}>
                {t('message.addLiquidityToRecevice')}
              </Typography>
            </HeaderDescription>
          </ActiveText>
        </>
        <Settings />
        <UpdateIcon style={{ color: '#42B7A0', width: 30, height: 30, fontWeight: 600, marginLeft: 10 }} />
      </RowBetween>
    </Tabs>
  )
}
