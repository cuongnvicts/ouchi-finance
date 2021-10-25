import React, { useCallback, useMemo, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Collapse, isWidthDown, withWidth } from '@material-ui/core'
// import HomeIcon from '@material-ui/icons/Home'
// import SyncAltIcon from '@material-ui/icons/SyncAlt'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'

import logoOuchi from '../../assets/images/pancake/ouchi-icon.png'
import iconHome from '../../assets/images/menu/Home.png'
import iconTrade from '../../assets/images/menu/Trade.png'
import iconDocs from '../../assets/images/menu/Docs.png'
import iconHomeActive from '../../assets/images/menu/HomeActive.png'
import iconRealty from '../../assets/images/menu/realty.png'
import iconBridge from '../../assets/images/menu/bridge.png'
import { OUCHI_DOC_URL, NODOKA_BRIDGE_URL, OUCHI_REALTY_URL } from '../../constants'

const drawerWidth = 255

const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

interface ListDrawerItem {
  name: string
  route?: string
  childs?: ListDrawerItem[]
  isRedirect?: boolean
  icon?: string
  iconActive?: string
  link?: string
}

const menuItems: ListDrawerItem[] = [
  {
    name: 'sidebar.home',
    route: '/home',
    icon: iconHome,
    iconActive: iconHomeActive
  },
  {
    name: 'sidebar.trade',
    icon: iconTrade,
    childs: [
      {
        name: 'sidebar.swap',
        route: '/swap'
      },
      {
        name: 'sidebar.liquidity',
        route: '/pool'
      }
    ]
  },
  {
    name: 'divider'
  },
  {
    name: 'sidebar.realty',
    icon: iconRealty,
    isRedirect: true,
    link: OUCHI_REALTY_URL
  },
  {
    name: 'divider'
  },
  {
    name: 'sidebar.bridge',
    icon: iconBridge,
    isRedirect: true,
    link: NODOKA_BRIDGE_URL
  },
  {
    name: 'divider'
  },
  {
    name: 'sidebar.docs',
    icon: iconDocs,
    isRedirect: true,
    link: OUCHI_DOC_URL
  }
]

interface ComponentProps {
  width: Breakpoint
  openDrawer: boolean
  toggleDrawer: () => void
}

function CustomDrawer(props: ComponentProps) {
  const classes = useStyles()

  const location = useLocation()
  const history = useHistory()
  const [t] = useTranslation()

  const { openDrawer, toggleDrawer } = props
  const [tradeExpand, setTradeExpand] = React.useState(false)

  const toggleDrawerOpen = useCallback(() => {
    if (openDrawer) {
      setTradeExpand(false)
    }
    toggleDrawer()
  }, [openDrawer, toggleDrawer])

  useEffect(() => {
    if (!openDrawer) {
      setTradeExpand(false)
    }
  }, [openDrawer, setTradeExpand])

  const onSelectDrawerItem = useCallback(
    (item: ListDrawerItem) => {
      if (!openDrawer) {
        toggleDrawer()
      }
      if (item.route) {
        history.push(item.route)
      } else if (item?.isRedirect) {
        window.open(item.link)
      } else {
        setTradeExpand(!tradeExpand)
      }
    },
    [history, openDrawer, toggleDrawer, tradeExpand]
  )

  const isActiveTrade = useMemo(() => {
    return location.pathname === '/swap' || location.pathname === '/pool'
  }, [location.pathname])

  const renderDrawerConter = useMemo(() => {
    return (
      <div className={classes.drawerContent}>
        <div>
          <div className={classes.toolbar}>
            <UniIcon onClick={toggleDrawerOpen}>
              <img width={'25px'} src={logoOuchi} alt="logo" />
            </UniIcon>
            {openDrawer && <Typography className={classes.title}>{t('ouchi_finance')}</Typography>}
          </div>
          <Divider />

          <List>
            {menuItems.map((item, menuItemIndex) => {
              const isActive = location.pathname === item.route
              const itemStyles = clsx(
                isActive ? classes.active : null,
                !!item.childs && isActiveTrade ? classes.active : null
              )

              const isDivider = item.name === 'divider'
              if (isDivider) {
                return <Divider key={`${item.name}-${menuItemIndex}`} />
              }
              return (
                <div className={classes.listItemsMenu} key={`${item.name}-${menuItemIndex}`}>
                  <ListItem button onClick={() => onSelectDrawerItem(item)} className={itemStyles}>
                    <ListItemIcon className={classes.listIcon}>
                      <img
                        src={clsx(isActive ? item.iconActive : item.icon)}
                        alt="icon menu"
                        className={clsx(classes.icon, isActive ? classes.activeIcon : null)}
                      />
                    </ListItemIcon>
                    <ListItemText className={clsx(classes.listText, isActive ? classes.activeText : null)}>
                      {t(item.name)}
                    </ListItemText>
                    {item.childs && openDrawer && (tradeExpand ? <ExpandLess /> : <ExpandMore />)}
                  </ListItem>
                  {item.childs && item.childs.length > 0 && (
                    <Collapse in={tradeExpand} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.childs.map((childItem, menuChildIndex) => {
                          const isActive = location.pathname === childItem.route
                          return (
                            <ListItem
                              button
                              className={clsx(classes.nested, isActive ? classes.active : null)}
                              key={`${childItem.name}-${menuChildIndex}`}
                              onClick={() => onSelectDrawerItem(childItem)}
                            >
                              <ListItemText className={clsx(classes.listText, isActive ? classes.activeText : null)}>
                                {t(childItem.name)}
                              </ListItemText>
                            </ListItem>
                          )
                        })}
                      </List>
                    </Collapse>
                  )}
                </div>
              )
            })}
          </List>
        </div>
        {/* <Button className={classes.drawerContetBottom}>
          <img src={settingIcon} alt="" width={30} height={30} />
        </Button> */}
      </div>
    )
  }, [
    classes.active,
    classes.activeIcon,
    classes.activeText,
    classes.drawerContent,
    classes.icon,
    classes.listIcon,
    classes.listItemsMenu,
    classes.listText,
    classes.nested,
    classes.title,
    classes.toolbar,
    isActiveTrade,
    location.pathname,
    onSelectDrawerItem,
    openDrawer,
    t,
    toggleDrawerOpen,
    tradeExpand
  ])

  if (isWidthDown('xs', props.width)) {
    return (
      <div className={classes.root}>
        <Drawer open={openDrawer} anchor={'left'} onClose={toggleDrawer}>
          {renderDrawerConter}
        </Drawer>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      <Drawer
        variant={'permanent'}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer
          })
        }}
      >
        {renderDrawerConter}
      </Drawer>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      border: 'none'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      border: 'none',
      [theme.breakpoints.down('sm')]: {
        transitionProperty: 'none'
      }
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      },
      border: 'none',
      [theme.breakpoints.down('sm')]: {
        transitionProperty: 'none'
      }
    },
    noDrawer: {
      display: 'none'
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    listItemsMenu: {
      width: drawerWidth,
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'column',
      flex: 1
    },
    listText: {
      color: '#9FA2B4',
      fontWeight: 800,
      fontFamily: 'Kanit,sans-serif'
    },
    activeText: {
      color: '#42B7A0'
    },
    nested: {
      paddingLeft: theme.spacing(4)
    },
    active: {
      backgroundColor: 'rgba(159, 162, 180, 0.08)',
      borderLeft: 4,
      borderLeftColor: '#42B7A0',
      borderLeftStyle: 'solid'
    },
    listIcon: {
      color: '#9FA2B4',
      fontWeight: 800
      // backgroundColor: 'yellow'
    },
    activeIcon: {
      color: '#42B7A0'
    },
    icon: {
      width: 'auto',
      maxWidth: 30
    },
    title: {
      fontSize: 19,
      color: '#42B7A0',
      marginLeft: 8
    },
    drawerContent: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    drawerContetTop: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    drawerContetBottom: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2)
      }
    }
  })
)
export default withWidth()(CustomDrawer)
