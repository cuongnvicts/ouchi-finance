import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

export enum SwapLiquidityTabs {
  SWAP = 'Swap',
  LIQUIDITY = 'Liquidity'
}

interface Props {
  selected: SwapLiquidityTabs
}

export default function SwapLiquidity({ selected }: Props) {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div className={classes.root}>
      <Button href="/#/swap" className={selected === 'Swap' ? classes.active : classes.normal}>
        {t('swap')}
      </Button>
      <Button
        href="/#/pool"
        className={selected === 'Liquidity' ? classes.active : classes.normal}
        style={{ marginLeft: 28 }}
      >
        {t('liquidity')}
      </Button>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 30,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down(721)]: {
      marginBottom: 60
    }
  },
  active: {
    width: 240,
    height: 50,
    color: '#fff',
    fontSize: 19,
    fontWeight: 400,
    borderRadius: 6,
    textTransform: 'uppercase',
    marginTop: 0,
    padding: '15px 0px 15px 0px',
    background: 'linear-gradient(90.43deg, #42B7A0 0%, #69C7C7 100%)',
    [theme.breakpoints.down(419)]: {
      width: 100
    }
  },
  normal: {
    width: 240,
    height: 50,
    color: '#42B7A0',
    fontSize: 19,
    fontWeight: 400,
    borderRadius: 6,
    textTransform: 'uppercase',
    background: 'linear-gradient(90.43deg, #DFE0EB 0%, #DFE0EB 100%)',
    [theme.breakpoints.down(419)]: {
      width: 100
    }
  }
}))
