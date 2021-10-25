import { Currency, Pair } from '@uniswap/sdk'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'react-feather'

import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencyListPopover from '../SearchModal/CurrencyListPopover'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import { useActiveWeb3React } from '../../hooks'

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  background: linear-gradient(92.3deg, rgba(67, 184, 161, 0.3) 0%, rgba(104, 199, 198, 0.3) 99.15%);
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 2rem;
  font-size: 14px;
  font-weight: bold;
  color: #42b7a0;
  background: transparent;
  box-shadow: none;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDropDown = styled(ChevronDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  border: 1px solid #42b7a0;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background-color: #4cbcaa;
  color: #ffffff;
  path {
    font-size: 5px;
    stroke: #42b7a0;
    stroke-width: 1px;
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '6px' : '6px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '20px')};
  font-weight:500;

`

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: #eeeaf4;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: #30c7d4;
  border: none;
  font-weight: bold;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  customBalanceText?: string
}

export default function CurrencyInputPanelPopover({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  customBalanceText
}: CurrencyInputPanelProps) {
  const { t } = useTranslation()

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!disableCurrencySelect) {
        setAnchorEl(event.currentTarget)
      }
    },
    [disableCurrencySelect]
  )

  const handleDismissSearch = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow
            style={{
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6,
              background: 'linear-gradient(92.3deg, rgba(67, 184, 161, 0.3) 0%, rgba(104, 199, 198, 0.3) 99.15%)'
            }}
          >
            <RowBetween>
              <TYPE.body style={{ color: '#5B6871', fontWeight: 400, fontSize: 14 }}>{t(label)}</TYPE.body>
              {account && (
                <TYPE.body
                  onClick={onMax}
                  color={'#5B6871'}
                  fontWeight={400}
                  fontSize={14}
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? (customBalanceText ?? t('balance_title')) + selectedCurrencyBalance?.toSignificant(6)
                    : ' -'}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow
          style={
            hideInput
              ? {
                  color: '#42B7A0',
                  padding: '0',
                  borderRadius: '6px'
                }
              : { borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }
          }
          selected={disableCurrencySelect}
        >
          {!hideInput && (
            <>
              <NumericalInput
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
                style={{
                  background: 'transparent',
                  color: '#42B7A0',
                  fontSize: 14,
                  fontWeight: 800
                }}
              />
              {account && currency && showMaxButton && label !== t('to') && (
                <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>
              )}
            </>
          )}
          {/* token */}
          <CurrencySelect selected={!!currency} className="open-currency-select-button" onClick={handleClick}>
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
              ) : currency ? (
                <CurrencyLogo currency={currency} size={'30px'} />
              ) : null}
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </StyledTokenName>
              ) : (
                <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? currency.symbol.slice(0, 4) +
                      '...' +
                      currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                    : currency?.symbol) || t('selectToken')}
                </StyledTokenName>
              )}
              {!disableCurrencySelect && <StyledDropDown selected={!!currency} />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencyListPopover
          anchorEl={anchorEl}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
