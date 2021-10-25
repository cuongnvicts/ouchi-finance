import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { TYPE } from '../../theme'
import { AutoColumn } from '../Column'
import { RowBetween, RowFixed } from '../Row'

enum SlippageError {
  InvalidInput = 'InvalidInput',
  RiskyLow = 'RiskyLow',
  RiskyHigh = 'RiskyHigh'
}

enum DeadlineError {
  InvalidInput = 'InvalidInput'
}

const FancyButton = styled.button`
  color: ${({ theme }) => theme.text1};
  align-items: center;
  height: 2rem;
  border-radius: 36px;
  font-size: 1rem;
  width: auto;
  min-width: 3.5rem;
  border: 1px solid ${({ theme }) => theme.bg3};
  outline: none;
  background: ${({ theme }) => theme.bg1};
  :hover {
    border: 1px solid ${({ theme }) => theme.bg4};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
`

const Option = styled(FancyButton)<{ active: boolean }>`
  // max-width: 174px;
  width: 10%;
  min-height: 44px;
  border-radius: 6px;
  margin-right: 5px;
  :hover {
    cursor: pointer;
  }
  background: linear-gradient(92.3deg, rgba(67, 184, 161, 0.3) 0%, rgba(104, 199, 198, 0.3) 99.15%);
  color: #42b7a0;
  font-size: 24px;
  font-weight: 400;
  @media (max-width: 419px) {
    max-width: 60px;
    margin-right: 5px;
    font-size: 11px;
  }
`
const CustomPercent = styled.span`
  padding-left: 3px;
  color: #42b7a0;
  font-size: 24px;
  font-weight: 400;
  @media (max-width: 419px) {
    max-width: 60px;
    font-size: 11px;
  }
`

// const Input = styled.input`
//   // background: ${({ theme }) => theme.bg1};
//   background: rgba(197, 199, 205, 0.3) ;
//   font-size: 16px;
//   width: auto;
//   height: 50px;
//   outline: none;
//   &::-webkit-outer-spin-button,
//   &::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//   }
//   color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
//   text-align:center;

//   @media (max-width: 419px) {
//     width: 50px;
//   }
// `
const InputResponsive = styled.input`
  background: rgba(197, 199, 205, 0.3) ;
  font-size: 24px;
  width: auto;
  height: 45px;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  color: '#42B7A0',
  font-weight: 400,
  background-color: '#EEEFF0',
  border: '2px solid #000000',
  color: ${({ theme, color }) => (color === 'red' ? theme.red1 : theme.text1)};
  text-align:center;

  @media (max-width: 419px) {
    font-size:11px;
    width: 50px;
  }
`
const InputCustom = styled.input`
  background: rgba(197, 199, 205, 0.3);
  font-size: 16px;
  width: auto;
  height: 45px;
  outline: none;
  color: #42b7a0;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  text-align: center;

  @media (max-width: 1508px) {
    margin-top: 20px;
    position: absolute;
    top: -22px;
    right: -7px;
  }
  @media (max-width: 768px) {
    position: absolute;
    top: -22px;
    right: 7px;
  }

  @media (max-width: 419px) {
    position: absolute;
    top: -27px;
    right: 7px;
    width: 50px;
  }
`

const OptionCustom = styled(FancyButton)<{ active?: boolean; warning?: boolean }>`
  position: relative;
  padding: 0 0.75rem;
  border-radius: 8px;
  flex: 1;
  input {
    width: 100%;
    border: none;
    border: 0px;
    border-radius: 8px;
    background-color: #c7eae3;
    @media (max-width: 768px) {
      max-width: 150px;
    }
    @media (max-width: 419px) {
      width: 50px;
    }
  }
`

const SlippageEmojiContainer = styled.span`
  color: #42b7a0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;  
  `}
`
const SubOption = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 419px) {
  }
`
export interface SlippageTabsProps {
  rawSlippage: number
  setRawSlippage: (rawSlippage: number) => void
  deadline: number
  setDeadline: (deadline: number) => void
}

export default function SlippageTabs({ rawSlippage, setRawSlippage, deadline, setDeadline }: SlippageTabsProps) {
  const inputRef = useRef<HTMLInputElement>()
  const [t] = useTranslation()

  const [slippageInput, setSlippageInput] = useState('')
  const [deadlineInput, setDeadlineInput] = useState('')

  const slippageInputIsValid =
    slippageInput === '' || (rawSlippage / 100).toFixed(2) === Number.parseFloat(slippageInput).toFixed(2)
  const deadlineInputIsValid = deadlineInput === '' || (deadline / 60).toString() === deadlineInput

  let slippageError: SlippageError | undefined
  if (slippageInput !== '' && !slippageInputIsValid) {
    slippageError = SlippageError.InvalidInput
  } else if (slippageInputIsValid && rawSlippage < 50) {
    slippageError = SlippageError.RiskyLow
  } else if (slippageInputIsValid && rawSlippage > 500) {
    slippageError = SlippageError.RiskyHigh
  } else {
    slippageError = undefined
  }

  let deadlineError: DeadlineError | undefined
  if (deadlineInput !== '' && !deadlineInputIsValid) {
    deadlineError = DeadlineError.InvalidInput
  } else {
    deadlineError = undefined
  }

  function parseCustomSlippage(value: string) {
    setSlippageInput(value)

    try {
      const valueAsIntFromRoundedFloat = Number.parseInt((Number.parseFloat(value) * 100).toString())
      if (!Number.isNaN(valueAsIntFromRoundedFloat) && valueAsIntFromRoundedFloat < 5000) {
        setRawSlippage(valueAsIntFromRoundedFloat)
      }
    } catch {}
  }

  function parseCustomDeadline(value: string) {
    setDeadlineInput(value)

    try {
      const valueAsInt: number = Number.parseInt(value) * 60
      if (!Number.isNaN(valueAsInt) && valueAsInt > 0) {
        setDeadline(valueAsInt)
      }
    } catch {}
  }

  return (
    <AutoColumn gap="md">
      <AutoColumn gap="sm">
        <RowFixed>
          <TYPE.black fontWeight={400} fontSize={14} color={'#5B6871'}>
            {t('slippageTolerance')}
          </TYPE.black>
        </RowFixed>
        <RowBetween>
          <SubOption>
            <Option
              onClick={() => {
                setSlippageInput('')
                setRawSlippage(10)
              }}
              active={rawSlippage === 10}
            >
              0.1%
            </Option>
            <Option
              onClick={() => {
                setSlippageInput('')
                setRawSlippage(50)
              }}
              active={rawSlippage === 50}
            >
              0.5%
            </Option>
            <Option
              onClick={() => {
                setSlippageInput('')
                setRawSlippage(100)
              }}
              active={rawSlippage === 100}
            >
              1%
            </Option>

            <OptionCustom
              active={![10, 50, 100].includes(rawSlippage)}
              warning={!slippageInputIsValid}
              tabIndex={-1}
              style={{
                borderRadius: 6,
                textAlign: 'center',
                border: 'none',
                height: 'fit-content'
              }}
            >
              <RowBetween style={{ color: '#42B7A0', height: 72, maxWidth: 390, justifyContent: 'flex-start' }}>
                {!!slippageInput &&
                (slippageError === SlippageError.RiskyLow || slippageError === SlippageError.RiskyHigh) ? (
                  <SlippageEmojiContainer>
                    <span role="img" aria-label="warning">
                      ⚠️
                    </span>
                  </SlippageEmojiContainer>
                ) : null}
                {/* https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451 */}
                <InputResponsive
                  style={{
                    border: '2px solid #000000'
                  }}
                  ref={inputRef as any}
                  placeholder={(rawSlippage / 100).toFixed(2)}
                  value={slippageInput}
                  onBlur={() => {
                    parseCustomSlippage((rawSlippage / 100).toFixed(2))
                  }}
                  onChange={e => parseCustomSlippage(e.target.value)}
                  color={!slippageInputIsValid ? 'red' : ''}
                />
                <CustomPercent> % </CustomPercent>
              </RowBetween>
            </OptionCustom>
          </SubOption>
        </RowBetween>
        {!!slippageError && (
          <RowBetween
            style={{
              fontSize: '14px',
              paddingTop: '7px',
              color: slippageError === SlippageError.InvalidInput ? 'red' : '#F3841E'
            }}
          >
            {slippageError === SlippageError.InvalidInput
              ? t('message.enterValidSlippage')
              : slippageError === SlippageError.RiskyLow
              ? t('message.yourTransactionFail')
              : t('message.yourTransactionFrontun')}
          </RowBetween>
        )}
      </AutoColumn>

      <AutoColumn gap="sm">
        <RowFixed>
          <TYPE.black fontSize={18} fontWeight={500} color={'#42B7A0'} style={{ marginBottom: 20 }}>
            {t('transactionDeadline')}
          </TYPE.black>
        </RowFixed>
        <RowFixed>
          <OptionCustom tabIndex={-1} style={{ border: 'none' }}>
            <InputCustom
              color={!!deadlineError ? 'red' : undefined}
              onBlur={() => {
                parseCustomDeadline((deadline / 60).toString())
              }}
              placeholder={(deadline / 60).toString()}
              value={deadlineInput}
              onChange={e => parseCustomDeadline(e.target.value)}
            />
          </OptionCustom>
          <TYPE.body style={{ paddingLeft: '20px', fontWeight: 500 }} fontSize={18} color={'#42B7A0'}>
            {t('minutes')}
          </TYPE.body>
        </RowFixed>
      </AutoColumn>
    </AutoColumn>
  )
}
