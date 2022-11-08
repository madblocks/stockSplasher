import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { request } from '../../requests'
import Loading from '../Loading'
import { findNextDate, todaysDate } from '../../utils'

const StyledFinancialsDisplay = styled.div`
  border-top: 2px solid orange;
  padding-top: 15px;
  
  ${({active}) => active ? null : 'display: none;'}

  .header {
    font-size: 20px;
    color: white;
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
  .date {
    font-size: 14px;
  }
`

export default function Financials ({stock, isActive}) {

  const [outstanding, setOutstanding] = useState()
  const [dividends, setDividends] = useState()
  const [epsHistorical, setEpsHistorical] = useState()
  const [epsEst, setEpsEst] = useState()
  const [balanceSheet, setBalanceSheet] = useState()
  const [income, setIncome] = useState()
  const [cashFlow, setCashFlow] = useState()

  useEffect(() => {
    const getOutstanding = async () => {
      const response = await request('darqube', 'outstanding', stock.symbol)
      setOutstanding(response.data)
    }
    getOutstanding()

    const getDividends = async () => {
      const response = await request('darqube', 'dividends', stock.symbol)
      setDividends(response.data)
    }
    getDividends()

    const getEpsHistorical = async () => {
      const response = await request('darqube', 'epsHistorical', stock.symbol)
      setEpsHistorical(response.data)
    }
    getEpsHistorical()
    todaysDate()

    const getEpsEst = async () => {
      const response = await request('darqube', 'epsEst', stock.symbol)
      setEpsEst(response.data)
    }
    getEpsEst()
    
    const getBalanceSheet = async () => {
      const response = await request('darqube', 'balance', stock.symbol)
      setBalanceSheet(response.data)
    }
    getBalanceSheet()

    const getIncome = async () => {
      const response = await request('darqube', 'income', stock.symbol)
      setIncome(response.data)
    }
    getIncome()

    const getCashFlow = async () => {
      const response = await request('darqube', 'cashFlow', stock.symbol)
      setCashFlow(response.data)
    }
    getCashFlow()
  },[stock.symbol])

  return (outstanding && dividends && epsHistorical && epsEst) ? (
    <StyledFinancialsDisplay active={isActive}>
      <div className='header'>Financials</div>
      <div className='grid'>
        <div>Outstanding Shares:</div><div className='right'>{outstanding[0].annual} (Million)</div>
        <div></div>
        <div>Dividend (Annual Rate): </div><div className='right'>{dividends[dividends.length-1].annual_dividend_rate}</div>
        <div>EPS: </div><div></div>
        <div></div>
        <div>Dividend <span className='date'>({
          dividends[dividends.length-1].quarterly[dividends[dividends.length-1].quarterly.length-1].date
        })</span>: </div><div className='right'>{
          dividends[dividends.length-1].quarterly[dividends[dividends.length-1].quarterly.length-1].rate
        }</div>
        <div>EPS (Estimate): </div><div>{
          epsEst.earnings_estimate[findNextDate(epsEst.earnings_estimate)].earningsEstimateAvg
        }</div>
        <div></div>
        <div></div><div></div>
      </div>
    </StyledFinancialsDisplay>
  ) : <Loading />
}