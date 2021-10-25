import React from 'react'
import styled from 'styled-components'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import { useMemo } from 'react'

const CardComponent = styled.div`
  width: 100%;
  height: 200px;
  background-color: #42b7a0;
  border-radius: 6px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(90.43deg, #42b7a0 0%, #69c7c7 100%);
  padding: 0px 8px;
`
const Text = styled.div`
  color: #ffffff;
  font-size: 19px;
  font-weight: 400;
  font-style: italic;
  padding: 8px;
  text-align: center;
`
const Value = styled.div`
  color: #ffffff;
  font-size: 24px;
  font-weight: 400;
  font-style: italic;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`
const Icon = styled.div`
  width: 24px;
  height: 24px;
  color: #ffffff;
  margin: 0px 10px;
`

const SpecificContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

export default function Card(props: { title: string; value?: string; isSpecific?: boolean; onClick?: () => void }) {
  const content = useMemo(() => {
    if (props.isSpecific) {
      return (
        <Content>
          <SpecificContent>
            <Value>ETH</Value>
            <Icon>
              <ArrowRightAltIcon />
            </Icon>
            <Value>NETH</Value>
          </SpecificContent>
        </Content>
      )
    }
    return (
      <Content>
        <Value>{props.value}</Value>
      </Content>
    )
  }, [props.isSpecific, props.value])
  return (
    <CardComponent onClick={props.onClick}>
      <Text>{props.title}</Text>
      {content}
    </CardComponent>
  )
}
