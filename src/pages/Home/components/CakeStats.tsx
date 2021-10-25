import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
function CakeStats() {
  const classes = useStyles()
  const ouChiName = 'OUCHI'
  const supplyValue = '188,521,828'
  const burnedValue = '188,521,828'
  const blockValue = '20'
  const totalValueLocked = '6,787,234,234'
  const { t } = useTranslation()
  return (
    <div className={classes.container}>
      <div className={classes.contentLeft}>
        <Typography className={classes.titleCake}>{t('Cake Stats')}</Typography>
        <div className={classes.infoContent}>
          <div className={classes.infoLeft}>
            <Typography className={classes.totalText}>
              {t('Total')} {ouChiName} {t('Supply')}
            </Typography>
            <Typography className={classes.totalText}>
              {t('Total')} {ouChiName} {t('Bruned')}
            </Typography>
            <Typography className={classes.totalText}>
              {t('New')} {ouChiName} / {t('block')}
            </Typography>
          </div>
          <div className={classes.infoRight}>
            <Typography className={classes.totalNumber}>{supplyValue}</Typography>
            <Typography className={classes.totalNumber}>{burnedValue}</Typography>
            <Typography className={classes.totalNumber}>{blockValue}</Typography>
          </div>
        </div>
      </div>
      <div className={classes.contentRight}>
        <Typography className={classes.titleRight}>{t('Total Value Locked (TVL)')}</Typography>
        <Typography className={classes.valueLocked}>${totalValueLocked}</Typography>
        <Typography className={classes.across}>{t('Across all LPs and Syrup Pools')}</Typography>
      </div>
    </div>
  )
}

export default CakeStats
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      paddingTop: 20,
      [theme.breakpoints.between('sm', 'md')]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      [theme.breakpoints.down(479)]: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    contentLeft: {
      backgroundColor: '#fff',
      width: 500,
      height: 200,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius: 20,
      padding: 10,
      [theme.breakpoints.down(479)]: {
        textAlign: 'center'
      }
    },
    titleCake: {
      fontSize: 40,
      fontWeight: 800,
      color: '#280D5F'
    },
    infoContent: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      [theme.breakpoints.down(479)]: {
        justifyContent: 'space-around'
      }
    },
    infoLeft: {},
    infoRight: {},
    totalText: {
      paddingTop: 10,
      fontSize: 15,
      fontWeight: 500,
      color: '#280D5F'
    },
    totalNumber: {
      paddingTop: 10,
      fontSize: 15,
      fontWeight: 800,
      color: '#280D5F',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    contentRight: {
      backgroundColor: '#fff',
      marginLeft: 30,
      width: 500,
      height: 200,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius: 20,
      paddingTop: 30,
      paddingLeft: 30,
      [theme.breakpoints.between('sm', 'md')]: {
        marginLeft: 0
      },
      [theme.breakpoints.down(479)]: {
        marginLeft: 0,
        paddingLeft: 0,
        textAlign: 'center'
      }
    },
    titleRight: {
      fontSize: 20,
      fontWeight: 800,
      color: '#280D5F'
    },
    valueLocked: {
      fontWeight: 800,
      color: '#280D5F',
      fontSize: 35
    },
    across: {
      color: '#7A6EAA'
    }
  })
)
