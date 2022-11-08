import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { request } from '../../requests'

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
    }
    getOutstanding()
  },[stock.symbol])

  return (
    <StyledFinancialsDisplay active={isActive}>
      <div className='header'>Financials</div>
      <div className='grid'></div>
    </StyledFinancialsDisplay>
  )
}