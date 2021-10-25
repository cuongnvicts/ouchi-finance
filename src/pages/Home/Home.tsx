import React, { useCallback, useMemo } from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import Card from './Card'
import globalGif from '../../assets/images/global.gif'

import { NETH_ADDRESSS, PROOF_OF_ACCESS_URL } from '../../constants'
import { useTotalValueLocked } from 'data/TotalSupply'
import validatorStaking from 'validator-staking.json'

function Home() {
  const classes = useStyles()
  const [t] = useTranslation()

  const totalSupply = useTotalValueLocked(NETH_ADDRESSS)
  const totalSupplyStr = useMemo(() => {
    const total = totalSupply ? totalSupply : 0
    return `${total} NETH`
  }, [totalSupply])

  const stakingData = useMemo(() => {
    const title = t('neth_validator_staking')
    const value = `${validatorStaking?.value || 0}${validatorStaking?.unit || ''}`
    return { title, value }
  }, [t])

  const onClickCard = useCallback(() => {
    const newWindow = window.open(PROOF_OF_ACCESS_URL, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }, [])

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>{t('ouchi_finance')}</Typography>
      <div className={classes.container}>
        <img src={globalGif} width={300} height={300} alt={'logo'} />
        <div className={classes.content}>
          <div className={classes.cartItem}>
            <Card title={t('proof_of_assets')} isSpecific={true} onClick={onClickCard} />
          </div>
          <div className={classes.cartItem}>
            <Card title={stakingData.title} value={stakingData.value} />
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.cartItem}>
            <Card title={t('total_value_locked')} value={totalSupplyStr} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      display: 'flex',
      flex: 1,
      width: 500,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      [theme.breakpoints.between('sm', 'md')]: {
        alignItems: 'center'
      },
      [theme.breakpoints.down('sm')]: {
        width: '90%',
        padding: theme.spacing(0, 2)
      },
      fontFamily: 'Kanit, sans-serif'
    },
    title: {
      marginBottom: 30,
      color: '#42B7A0',
      fontWeight: 400,
      fontSize: 36,
      textAlign: 'center'
    },
    cartItem: {
      display: 'flex',
      flex: 1,
      padding: theme.spacing(0, 2),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(0, 1)
      }
    },
    content: {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      marginTop: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(1)
      }
    }
  })
)
