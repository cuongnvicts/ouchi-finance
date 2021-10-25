import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { useTranslation } from 'react-i18next'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 1026x;
  color: #452a7a;
`

export default function SwapHeader() {
  const { t } = useTranslation()
  return (
    <StyledSwapHeader>
      <RowBetween style={{ marginTop: 5 }}>
        <TYPE.black
          fontWeight={500}
          fontSize={20}
          style={{
            marginRight: '8px',
            color: '#42B7A0',
            fontWeight: 400,
            textTransform: 'uppercase'
          }}
        >
          {t('exchange')}
        </TYPE.black>

        <Settings />
        {/* </TuneIcon> */}
      </RowBetween>
      <TYPE.black
        fontWeight={400}
        fontSize={12}
        style={{
          marginTop: '10px',
          marginBottom: '29px',
          color: '#9FA2B4'
        }}
      >
        {t('trade_tokens_in_an_instant')}
      </TYPE.black>
    </StyledSwapHeader>
  )
}
