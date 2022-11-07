import styled from 'styled-components'

const StyledDisplayLinks = styled.ul`
  margin: 0;
  flex-direction: column;
  width: 120px;
  height: 80vh;
  padding: 10px;
  font-family: 'JetBrains Mono', monospace;

  li {
    display: flex;
    align-items: center;
    list-style: none;
    height: 50px;
    font-size: 20px;
    padding: 0;
  }
  .active {
    color: orange;
  }
`

export default function StocksDisplayNav (props) {

  

  return (
    <StyledDisplayLinks>
      <li className={props.display.general ? 'active' : ''} onClick={props.handleDisplay} data-id='general'>General</li>
      <li className={props.display.chart ? 'active' : ''} onClick={props.handleDisplay} data-id='chart'>Chart</li>
      <li className={props.display.financials ? 'active' : ''} onClick={props.handleDisplay} data-id='financials'>Financials</li>
      <li className={props.display.news ? 'active' : ''} onClick={props.handleDisplay} data-id='news'>News</li>
    </StyledDisplayLinks>
  )
}