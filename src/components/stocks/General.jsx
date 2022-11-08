import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { isPositive } from '../../utils'
import { request } from '../../requests'
import Loading from '../Loading'

const StyledGeneralDisplay = styled.div`
  margin-top: 20px;

  .generalHeader {
    font-size: 20px;
    padding-right: 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid orange;
  }
  .generalInfo {
    color: white;
    margin-bottom: 20px;
  }
  #name {
    display: flex;
    color: orange;
    height: 30px;
  }
  #ticker {
    font-weight: bold;
    font-size: 24px;
    padding-right: 20px;
  }
  #price {
    font-size: 24px;
  }
  #priceChange {
    margin-left: 20px;
  }
  .increase {
    color: rgb(17, 207, 99);
  }
  .decrease {
    color: red;
  }
  #portIcon {
    float: right;
  }
  .grid {
    max-width: 1000px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 10% 1fr 1fr;
    grid-gap: 5px;
  }
  .right {
    text-align: right;
  }
`

const hidden = {
  display: 'none'
}

export default function General ({stock, isActive}) {

  const [generalInfo, setGeneralInfo] = useState()
  const [stockRef, setStockRef] = useState()
  const [recommendation, setRecommendation] = useState()
  
  useEffect(() => {
    const getGeneralInfo = async () => {
      const response = await request('darqube', 'general', stock.ticker)
      setGeneralInfo(response.data)
    }
    getGeneralInfo()
  }, [stock.ticker])

  useEffect(() => {
    const getStockRef = async () => {
      const response = await request('darqube', 'reference', stock.symbol)
      setStockRef(response.data.data[0])
    }
    getStockRef()
  }, [stock.symbol])

  useEffect(() => {
    const getRecommendation = async () => {
      const response = await request('darqube', 'recommendation', stock.symbol)
      console.log(response.data)
      setRecommendation(response.data)
    }
    getRecommendation()
  }, [stock.symbol])
  
    return (generalInfo && stockRef && recommendation) ? (
      <StyledGeneralDisplay active={isActive}>
        <div className='generalHeader'>
          <div id='name'>{stockRef.name}</div>
          <span id='ticker'>{stock.symbol}</span><span id='price'>{stock.price}</span>
          <span id='priceChange' className={isPositive(stock.daily_percentage_change) ? 'increase' : 'decrease'}>({stock.daily_percentage_change.toFixed(2)}%)</span>
          <FontAwesomeIcon icon={faStar} id='portIcon'/>
        </div>
        <div style={isActive ? null : hidden } className='generalInfo'>
          <div className='grid'>
            <div>Previous Close: </div><div className='right'>{stock.previous_close}</div>
            <div></div>
            <div>Exchange: </div><div className='right'>{generalInfo.Exchange}</div>
            <div>Daily Change (%): </div><div className={isPositive(stock.daily_percentage_change) ? 'right increase' : 'right decrease'}>{stock.daily_percentage_change.toFixed(2)}</div>
            <div></div>
            <div>Currency: </div><div className='right'>{generalInfo.CurrencyCode}</div>
            <div>Daily Change ($): </div><div className={isPositive(stock.daily_price_change) ? 'right increase' : 'right decrease'}>{stock.daily_price_change.toFixed(2)}</div>
            <div></div>
            <div>Sector: </div><div className='right'>{generalInfo.Sector}</div>
            <div>Recommendation: </div><div className='right'>{recommendation.recommendation}</div>
            <div></div>
            <div>Industry: </div><div className='right'>{generalInfo.Industry}</div>
          </div>
        </div>
      </StyledGeneralDisplay>
    )
    : <Loading />
}