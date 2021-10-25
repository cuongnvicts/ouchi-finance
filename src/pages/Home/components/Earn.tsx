import React from 'react'
import { Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { useTranslation } from 'react-i18next'
function Earn() {
  const classes = useStyles()
  const EarnUpTo = '398,61%'
  const { t } = useTranslation()
  return (
    <div className={classes.container}>
      <div className={classes.contentLeft}>
        <Typography className={classes.title}>{t('Earn up to')}</Typography>
        <Typography className={classes.valueEarn}>{EarnUpTo}</Typography>
        <Typography className={classes.content}>{t('APR in Farms')}</Typography>
        <div className={classes.button}>
          <ArrowForwardIcon className={classes.arrowRight} />
        </div>
      </div>
      <div className={classes.contentRight}>
        <Typography className={classes.title}>{t('Earn')}</Typography>
        <Typography className={classes.valueEarnRight}>CAKE, ADX, SUTER, BSCPAD</Typography>
        <Typography className={classes.content}>{t('in Pools')}</Typography>
        <div className={classes.buttonEarnRight}>
          <ArrowForwardIcon className={classes.arrowEarnRight} />
        </div>
      </div>
    </div>
  )
}

export default Earn
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: 15,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexDirection: 'row',
      [theme.breakpoints.down(479)]: {
        marginTop: 20,
        flexDirection: 'column',
        margin: '0 auto'
      }
    },
    contentLeft: {
      width: 300,
      height: 180,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius: 20,
      paddingLeft: 20,
      paddingTop: 20,
      backgroundColor: '#fff'
    },
    title: {
      fontWeight: 800,
      fontSize: 25
    },
    valueEarn: {
      fontWeight: 800,
      fontSize: 40,
      color: '#7645D9'
    },
    content: {
      fontWeight: 800,
      fontSize: 20
    },
    contentRight: {
      marginLeft: 10,
      width: 300,
      height: 220,
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
      borderRadius: 20,
      paddingLeft: 20,
      paddingTop: 20,
      backgroundImage: 'linear-gradient(#56D2E9,#7646D9)',
      [theme.breakpoints.down(479)]: {
        marginTop: 20,
        marginLeft: 0
      }
    },
    valueEarnRight: {
      color: '#ffff',
      fontWeight: 800,
      fontSize: 30,
      WebkitLineClamp: 2,
      wrap: 'wrap'
    },
    button: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    arrowRight: {
      color: '#3BCED9',
      fontSize: 20,
      cursor: 'pointer'
    },
    buttonEarnRight: {
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: 10
    },
    arrowEarnRight: {
      color: '#3BCED9',
      fontSize: 20,
      cursor: 'pointer'
    }
  })
)
