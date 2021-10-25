import { ChainId } from '@uniswap/sdk'
import React, { useState, useCallback } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { TYPE } from '../../theme'
import { YellowCard } from '../Card'
import Web3Status from '../../components/Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'

import clsx from 'clsx'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'

import { RowFixed } from 'components/Row'
import MenuOpen from '@material-ui/icons/MenuOpen'
import MenuIcon from '@material-ui/icons/Menu'

const drawerWidth = 255

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: 'flex',
      fontFamily: 'Kanit, sans-serif'
    },
    appBar: {
      fontFamily: 'Kanit, sans-serif',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      [theme.breakpoints.down('sm')]: {
        transitionProperty: 'none'
      }
    },
    appBarShift: {
      fontFamily: 'Kanit, sans-serif',
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      [theme.breakpoints.down('sm')]: {
        transitionProperty: 'none',
        marginLeft: 0,
        width: '100%'
      }
    },
    menuButton: {
      marginRight: 36,
      color: '#7A6EAA',
      [theme.breakpoints.up('md')]: {
        display: 'none',
        backgroundColor: 'red'
      }
    },
    customTitle: {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'Kanit, sans-serif'
    },
    toolBar: {
      display: 'none',
      [theme.breakpoints.down('sm')]: {
        display: 'block'
      }
    }
  })
)

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
    align-items: center;
  `};
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme, active }) => (!active ? theme.bg1 : theme.bg3)};
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const HideSmall = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

// const Title = styled.a`
//   display: flex;
//   align-items: center;
//   pointer-events: auto;
//   justify-self: flex-start;
//   margin-right: 12px;
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     justify-self: center;
//   `};
//   :hover {
//     cursor: pointer;
//   }
// `

// const UniIcon = styled.div`
//   transition: transform 0.3s ease;
//   :hover {
//     transform: rotate(-5deg);
//   }
// `

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`
const View = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
  font-family: Kanit, sans-serif;
`

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  // [ChainId.ROPSTEN]: 'Ropsten',
  // [ChainId.GÖRLI]: 'Görli',
  [ChainId.NODOKA_TEST]: 'Nodoka Testnet'
}
interface ComponentProps {
  openDrawer: boolean
  toggleDrawer: () => void
}

export default function NewHeader(props: ComponentProps) {
  const classes = useStyles()
  const { openDrawer, toggleDrawer } = props
  const handleDrawerOpen = useCallback(() => {
    toggleDrawer()
  }, [toggleDrawer])

  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>

      <HeaderRow>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: openDrawer
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton)}
            >
              {openDrawer === true ? <MenuOpen /> : <MenuIcon />}
            </IconButton>

            <View>
              <HeaderControls>
                <HeaderElement>
                  <HideSmall>
                    {chainId && NETWORK_LABELS[chainId] && (
                      <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
                    )}
                  </HideSmall>
                  {availableClaim && !showClaimPopup && (
                    <UNIWrapper onClick={toggleClaimModal}>
                      <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                        <TYPE.white padding="0 2px">
                          {claimTxn && !claimTxn?.receipt ? <Dots>Claiming UNI</Dots> : 'Claim UNI'}
                        </TYPE.white>
                      </UNIAmount>
                      <CardNoise />
                    </UNIWrapper>
                  )}

                  <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
                    {account && userEthBalance ? (
                      <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                        {userEthBalance?.toSignificant(4)} ETH
                      </BalanceText>
                    ) : null}
                    <Web3Status />
                  </AccountElement>
                </HeaderElement>
              </HeaderControls>
            </View>
          </Toolbar>
        </AppBar>
      </HeaderRow>
    </HeaderFrame>
  )
}
