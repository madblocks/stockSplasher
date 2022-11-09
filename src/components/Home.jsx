import { useState, useEffect } from 'react'
import { request } from '../requests'
import styled from 'styled-components'
import { isPositive } from '../utils'
import Loading from './Loading'

const StyledMarkets = styled.div`
  margin: 0 auto;
  display: flex;
  width: 80%;
  justify-content: space-around;
  height: 50px;

  .indexBox {
    margin-top: 40px;
    padding: 5px;
  }
  .title2 {
    color: orange;
    font-size: 21px;
    border-bottom: 1px solid gray;
  }
  .quote {
    font-size: 21px;
    font-weight: bold;
  }
  .change {
    font-size: 16px;
    font-weight: normal;
    padding-left: 10px;
  }
  .increase {
    color: green;
  }
  .decrease {
    color: red;
  }
`

export default function Home () {
  
  const [indexes, setIndexes] = useState({
    'DJI.INDX': {
      'name': 'DJI'
    },
    'NDX.INDX': {
      'name': 'Nasdaq 100'
    },
    'GSPC.INDX' : {
      'name': 'S&P 500'
    },
    'RUT.INDX': {
      'name': 'Russell 2000'
    },
    'DXY.INDX': {
      'name': 'US Dollar'
    }
  })
  
  useEffect(() => {
    const getIndexes = async (index) => {
      const response = await request('darqube', 'quote', index)
      setIndexes(indexes => {
        return (
          {...indexes, [response.data.ticker] : {...indexes[response.data.ticker], ...response.data}}
        )
      })
    }
    for (const ticker in indexes) {
      getIndexes(ticker)
    }

  }, [])

  return (indexes) ? (
    <StyledMarkets>
      {Object.values(indexes).map(index => (
        <div className='indexBox' key={index.ticker}>
          <div className='title2'>{index.name}</div>
          <div className='quote'>{parseFloat(index.price).toFixed(2)}
            <span className={'change' + (isPositive(parseInt(index.daily_price_change)) ? ' increase' : ' decrease')}>{parseFloat(index.daily_price_change).toFixed(2)} ({parseFloat(index.daily_percentage_change).toFixed(2)}%)</span>
          </div>
        </div>
      ))} 
    </StyledMarkets>
    
  ) : <Loading />
}