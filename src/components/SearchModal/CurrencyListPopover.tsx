import React, { useCallback, useMemo, CSSProperties } from 'react'
import { Text } from 'rebass'
import Popover from '@material-ui/core/Popover'
import { Currency, currencyEquals, ETHER, Token } from '@uniswap/sdk'

import { useAllTokens } from 'hooks/Tokens'
import { useCombinedActiveList } from '../../state/lists/hooks'
import { TYPE } from '../../theme'
import { useIsUserAddedToken } from '../../hooks/Tokens'
import Column from '../Column'
import CurrencyLogo from '../CurrencyLogo'
import { MenuItem } from './styleds'
import { isTokenOnList } from '../../utils'

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

function CurrencyRow({
  currency,
  onSelect,
  isSelected,
  otherSelected,
  style
}: {
  currency: Currency
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
}) {
  const key = currencyKey(currency)
  const selectedTokenList = useCombinedActiveList()
  const isOnSelectedList = isTokenOnList(selectedTokenList, currency)
  const customAdded = useIsUserAddedToken(currency)

  return (
    <MenuItem
      style={style}
      className={`token-item-${key}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <CurrencyLogo currency={currency} size={'24px'} />
      <Column>
        <Text title={currency.name} fontWeight={500}>
          {currency.symbol}
        </Text>
        <TYPE.darkGray ml="0px" fontSize={'12px'} fontWeight={300}>
          {currency.name} {!isOnSelectedList && customAdded && '• Added by user'}
        </TYPE.darkGray>
      </Column>
    </MenuItem>
  )
}

interface CurrencySearchModalProps {
  anchorEl: null | Element | ((element: Element) => Element)
  onDismiss: () => void
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
}

export default function CurrencyListPopover({
  anchorEl,
  onDismiss,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency
}: CurrencySearchModalProps) {
  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
      onDismiss()
    },
    [onDismiss, onCurrencySelect]
  )
  // new
  const open = useMemo(() => Boolean(anchorEl), [anchorEl])

  const id = open ? 'simple-popover' : undefined

  const allTokens = useAllTokens()
  const tokens = useMemo(() => Object.values(allTokens), [allTokens])
  const showNETH = true

  const currencies: Currency[] = useMemo(() => {
    const formatted: Currency[] = showNETH ? [Currency.ETHER, ...tokens] : tokens
    return formatted
  }, [tokens, showNETH])

  const renderRow = useCallback(
    (currency: Currency | Token) => {
      const isSelected = Boolean(selectedCurrency && currencyEquals(selectedCurrency, currency))
      const otherSelected = Boolean(otherSelectedCurrency && currencyEquals(otherSelectedCurrency, currency))
      const handleSelect = () => handleCurrencySelect(currency)

      return (
        <CurrencyRow
          key={currencyKey(currency)}
          style={{}}
          currency={currency}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      )
    },
    [handleCurrencySelect, otherSelectedCurrency, selectedCurrency]
  )

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onDismiss}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
    >
      {currencies && currencies.map(renderRow)}
    </Popover>
  )
}
