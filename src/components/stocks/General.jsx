import { faBorderNone } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledGeneralDisplay = styled.div`
  height: 200px;
  margin-top: 20px;
  width: 100%;
  .generalHeader {
    font-size: 20px;
    padding-right: 10px;
    border-bottom: 2px solid white;
  }
  .generalInfo {
    ${'' /* ${({active}) => active ? null : 'display: none;'} */}
    color: green;
  }
`

const hidden = {
  display: 'none'
}

// style={isActive ? block : hidden}

export default function General ({stock, isActive}) {
  return (
    <StyledGeneralDisplay active={isActive}>
      <div className='generalHeader'>
        <span id='ticker'>{stock.ticker}</span><span id='price'>{stock.price}</span><div id='priceChange'>{stock.daily_price_change}</div>
      </div>
      <div style={isActive ? null : hidden } className='generalInfo'>Other General Info</div>
    </StyledGeneralDisplay>
  )
}