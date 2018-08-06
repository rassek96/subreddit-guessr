import * as React from 'react'
import styled from 'styled-components'
const logo = require('../assets/reddit-logo.svg')

const Panel = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  @media (max-width: 660px) {
    height: 80px;
  }
  @media (max-width: 400px) {
    height: 60px;
  }
`
const LogoContainer = styled.div`
  width: 320px;
  height: 100px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  cursor: default;
  @media (max-width: 660px) {
    height: 80px;
  }
  @media (max-width: 400px) {
    height: 60px;
  }
`
const LogoText = styled.span`
  margin: 10px;
  font-size: 40px;
  font-weight: 600;
  @media (max-width: 660px) {
    font-size: 36px;
  }
  @media (max-width: 400px) {
    font-size: 26px;
  }
`
const Logo = styled.img`
  width: 80px;
  height: 80px;
  @media (max-width: 660px) {
    height: 60px;
    width: 60px;
  }
  @media (max-width: 400px) {
    height: 40px;
    width: 40px;
  }
`

export const TopBar = () => (
  <div>
    <Panel>
      <LogoContainer>
        <LogoText>Subreddit</LogoText>
        <Logo src={logo} />
        <LogoText>Guessr</LogoText>
      </LogoContainer>
    </Panel>
  </div>
)

// Put in footer <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>