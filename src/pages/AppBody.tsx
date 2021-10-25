import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 1026px;
  max-height: 750px;
  width: 100%;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 8px;
  border: 1px solid #dfe0eb;
  background-color: #ffffff;
  // @media (max-width: 1294px) {
  //   width: 900px;
  // }
  // @media (max-width: 1024px) {
  //   width: 760px;
  // }
  // @media (max-width: 768px) {
  //   width: 500px;
  // }
  // @media (max-width: 419px) {
  //   width: 360px;
  // }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
