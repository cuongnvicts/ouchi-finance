import React, { useCallback, useMemo } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import Popover from '@material-ui/core/Popover'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      // position: 'absolute',
      // bottom: 0,
      // right: 20,
      display: 'flex',
      fontFamily: 'Kanit, sans-serif',
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      marginBottom: 20,
      padding: 20,
      [theme.breakpoints.down('sm')]: {
        marginBottom: 8,
        padding: 10,
        right: 10
      }
    },
    button: {
      height: 40,
      boder: 'none',
      borderRadius: 6,
      backgroundColor: '#e5e5e5',
      color: '#42B7A0'
    },
    popoverContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: 8
    }
  })
)
type PropsLang = {
  key: string
  value: string
}
const supportedLanguages: PropsLang[] = [
  { key: 'en', value: 'English' },
  { key: 'ja', value: 'Japanese' }
]

export default function Footer() {
  const { i18n }: { t: any; i18n: any } = useTranslation()
  const classes = useStyles()
  const chooseLanguage = React.useMemo(() => {
    const currentLang = supportedLanguages.find(l => l.key === i18n.language)
    return currentLang ? currentLang.value : 'English'
  }, [i18n.language])

  const handleChangeLanguage = useCallback(
    (lan: string) => {
      i18n.changeLanguage(lan)
    },
    [i18n]
  )

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const open = useMemo(() => Boolean(anchorEl), [anchorEl])
  const id = useMemo(() => (open ? 'simple-popover' : undefined), [open])

  const onSelectLang = useCallback(
    (lang: PropsLang) => {
      handleClose()
      handleChangeLanguage(lang.key)
    },
    [handleClose, handleChangeLanguage]
  )

  return (
    <div className={classes.root}>
      <Button onClick={handleClick} className={classes.button}>
        <Typography>{chooseLanguage}</Typography>
        <KeyboardArrowDownIcon />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <div className={classes.popoverContent}>
          {supportedLanguages.map(lang => {
            return (
              <Button key={lang.key} onClick={() => onSelectLang(lang)}>
                {lang.value}
              </Button>
            )
          })}
        </div>
      </Popover>
    </div>
  )
}
