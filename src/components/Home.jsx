import { useState, useEffect } from 'react'
import { request } from '../requests'
import styled from 'styled-components'
import { isPositive } from '../utils'
import Loading from './Loading'

const StyledMarkets = styled.div`
  margin: 0 auto;
  width: 80%;
  

  .indexesContainer {
    display: flex;
    justify-content: space-around;
  }
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
  .topMoversTitle {
    font-size: 30px;
  }
  .moversBox {
    margin-top: 100px;
  }
  .moversTitle {
    margin-top: 35px;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 1px solid gray;
  }
  .moversList {
    overflow: hidden;
    display: flex;
  }
  .mover {
    flex-shrink: 0;
    width: 22%;
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
  }
  .moverSymbol {
    color: orange;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  }
  .moverPrice {
    margin-right: 10px;
    font-size: 20px;
  }
  .moverChange {
    font-size: 16px;
    margin-right: 30px;
  }
  @keyframes tickerh {
  0% { transform: translate3d(30%, 0, 0); }
  100% { transform: translate3d(-600%, 0, 0); }
  }
  .mover { animation: tickerh linear 15s infinite; }
  .mover:hover { animation-play-state: paused; }

  .center {
    margin: 0 auto;
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
  const [topMoversNYSE, setTopMoversNYSE] = useState()
  const [topMoversNASDAQ, setTopMoversNASDAQ] = useState()
  const [topMoversSNP, setTopMoversSNP] = useState()
  const [topMoversRussel, setTopMoversRussel] = useState()

  useEffect(() => {

    const tickers = ['DJI.INDX','NDX.INDX', 'GSPC.INDX', 'RUT.INDX', 'DXY.INDX']

    const getIndexes = async (index) => {
      const response = await request('darqube', 'quote', index)
      setIndexes(indexes => {
        return (
          {...indexes, [response.data.ticker] : {...indexes[response.data.ticker], ...response.data}}
        )
      })
    }
    for (const ticker of tickers) {
      getIndexes(ticker)
    }

  }, [])

  useEffect(() => {
    const getTopMoversNYSE = async () => {
      const response = await request('darqube', 'topMovers', 'DJI.INDX')
      setTopMoversNYSE(response.data)
    }
    getTopMoversNYSE()

    const getTopMoversNASDAQ = async () => {
      const response = await request('darqube', 'topMovers', 'NDX.INDX')
      setTopMoversNASDAQ(response.data)
    }
    getTopMoversNASDAQ()

    const getTopMoversSNP = async () => {
      const response = await request('darqube', 'topMovers', 'GSPC.INDX')
      setTopMoversSNP(response.data)
    }
    getTopMoversSNP()
    
    const getTopMoversRussel = async () => {
      const response = await request('darqube', 'topMovers', 'RUT.INDX')
      setTopMoversRussel(response.data)
    }
    getTopMoversRussel()
  }, [])

  return (indexes && topMoversNASDAQ && topMoversNYSE && topMoversRussel && topMoversSNP) ? (
    <StyledMarkets>
      <div className='indexesContainer'>
        {Object.values(indexes).map(index => (
          <div className='indexBox' key={index.name}>
            <div className='title2'>{index.name}</div>
            <div className='quote'>{parseFloat(index.price).toFixed(2)}
              <span className={'change' + (isPositive(parseInt(index.daily_price_change)) ? ' increase' : ' decrease')}>{parseFloat(index.daily_price_change).toFixed(2)} ({parseFloat(index.daily_percentage_change).toFixed(2)}%)</span>
            </div>
          </div>
        ))} 
      </div>
      <div className='moversBox'>
        <div className='topMoversTitle'>Top Daily Movers</div>
        <div className='moversTitle'>DJI</div>
        <div className='moversList'>
          {topMoversNYSE.map(mover => (
            <span className='mover' key={mover.symbol}><span className='moverSymbol'>{mover.symbol}</span><span className='moverPrice'>{mover.price}</span>
            <span className={'moverChange' + (isPositive(mover.change_1d) ? ' increase' : ' decrease')}>({mover.change_1d.toFixed(2)})</span></span>
          ))}
        </div>
        <div className='moversTitle'>Nasdaq 100</div>
        <div className='moversList'>
          {topMoversNASDAQ.map(mover => (
            <span className='mover' key={mover.symbol}><span className='moverSymbol'>{mover.symbol}</span><span className='moverPrice'>{mover.price}</span>
            <span className={'moverChange' + (isPositive(mover.change_1d) ? ' increase' : ' decrease')}>({mover.change_1d.toFixed(2)})</span></span>
          ))}
        </div>
        <div className='moversTitle'>S&P 500</div>
        <div className='moversList'>
          {topMoversSNP.map(mover => (
            <span className='mover' key={mover.symbol}><span className='moverSymbol'>{mover.symbol}</span><span className='moverPrice'>{mover.price}</span>
            <span className={'moverChange' + (isPositive(mover.change_1d) ? ' increase' : ' decrease')}>({mover.change_1d.toFixed(2)})</span></span>
          ))}
        </div>
        <div className='moversTitle'>Russel 2000</div>
        <div className='moversList'>
          {topMoversRussel.map(mover => (
            <span className='mover' key={mover.symbol}><span className='moverSymbol'>{mover.symbol}</span><span className='moverPrice'>{mover.price}</span>
            <span className={'moverChange' + (isPositive(mover.change_1d) ? ' increase' : ' decrease')}>({mover.change_1d.toFixed(2)})</span></span>
          ))}
        </div>
      </div>
    </StyledMarkets>
    
  ) : <div className='center'><Loading /></div>
}