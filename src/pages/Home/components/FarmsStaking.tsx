import React from 'react'
import { Typography, makeStyles, createStyles, Theme, Button } from '@material-ui/core'
import cake from '../../../assets/images/pancake/cake.svg'
import { useTranslation } from 'react-i18next'
function FarmsStaking() {
  const classes = useStyles()
  const valueState = '0.000'
  const valueWallet = '0.0000'
  const ouChiName = 'OUCHI'
  const { t } = useTranslation()
  return (
    <div className={classes.container}>
      <div className={classes.contentLeft}>
        <Typography className={classes.title}> {t('Farms & Staking')}</Typography>
        <img src={cake} className={classes.imageCake} alt="" />
        <div className={classes.childContent}>
          <Typography className={classes.titleCaketoHarvest}>
            {ouChiName}
            {t('  to Harvest')}:{' '}
          </Typography>
          <Typography className={classes.firstValue}>{valueState}</Typography>
          <Typography className={classes.firstValueDetail}>~${valueState}</Typography>
        </div>
        <div className={classes.childContent}>
          <Typography className={classes.titleCaketoHarvest}>
            {ouChiName} {t('in Wallet')}:{' '}
          </Typography>
          <Typography className={classes.secondValue}>{valueWallet}</Typography>
          <Typography className={classes.firstValueDetail}>~${valueWallet}</Typography>
        </div>
        <Button className={classes.btnHarvest}>{t('Harvest all(0)')}</Button>
      </div>
    </div>
  )
}

export default FarmsStaking
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      fontFamily: 'Kanit, sans-serif',
      width: 500,
      height: 450,
      borderRadius: 25,
      backgroundColor: '#fff',
      backgroundImage: 'url(images/pancake/cake-bg.svg)',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      [theme.breakpoints.down(479)]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },

    contentLeft: {
      backgroundColor: '#fff',
      borderRadius: 20,
      padding: 30,
      [theme.breakpoints.down(479)]: {
        padding: 0
      },
      fontFamily: 'Kanit, sans-serif'
    },
    title: {
      color: '#280D5F',
      fontSize: 35,
      fontWeight: 'bold',
      fontFamily: 'Kanit, sans-serif'
    },
    imageCake: {
      marginTop: 15
    },
    childContent: {
      paddingTop: 5
    },
    titleCaketoHarvest: {
      fontSize: 15,
      color: '#7A6EAA'
    },
    firstValue: {
      fontSize: 40,
      fontWeight: 800,
      color: '#280D5F'
    },
    firstValueDetail: {
      color: '#7A6EAA'
    },
    secondValue: {
      color: '#280D5F',
      fontSize: 30,
      fontWeight: 800
    },
    btnHarvest: {
      borderRadius: 10,
      marginTop: 10,
      width: '100%',
      height: 45,
      backgroundColor: '#E9EAEB',
      color: '#aaa',
      fontWeight: 800,
      textTransform: 'capitalize',
      [theme.breakpoints.down(479)]: {
        alginItems: 'center'
      }
    }
  })
)
