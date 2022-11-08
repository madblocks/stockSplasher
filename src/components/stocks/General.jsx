import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { request } from '../../requests'

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
    color: green;
  }
`

const hidden = {
  display: 'none'
}

export default function General ({stock, isActive}) {

  const [generalInfo, setGeneralInfo] = useState()
  
  useEffect(() => {
    const getGeneralInfo = async () => {
      const response = await request('darqube', 'general', stock.ticker)
      console.log(response)
      setGeneralInfo(response.data)
    }
    getGeneralInfo(stock.ticker)
    
  }, [stock.ticker])

  return (
    <StyledGeneralDisplay active={isActive}>
      <div className='generalHeader'>
        <span id='ticker'>{stock.ticker}</span><span id='price'>{stock.price}</span><div id='priceChange'>{stock.daily_price_change}</div>
      </div>
      <div style={isActive ? null : hidden } className='generalInfo'>Other General Info</div>
    </StyledGeneralDisplay>
  )
}