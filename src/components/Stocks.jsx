import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { request } from '../requests'
import StocksDisplayNav from './StocksDisplayNav'
import Error from './stocks/Error'
import General from './stocks/General'
import Chart from './stocks/Chart'
import Financials from './stocks/Financials'
import News from './stocks/News'




export default function Stocks () {

  let { ticker } = useParams()

  const [stock, setStock] = useState({error: false})
  const [display, setDisplay] = useState({
    general: true,
    chart: false,
    financials: false,
    news: false
  })

  const handleDisplay = (e) => {
    setDisplay({...display, [e.target.dataset.id]: !display[e.target.dataset.id]})
  }

useEffect(() => {
    const getStock = async () => {
      setStock({error: false})
      const response = await request('darqube', 'general', ticker)
        .catch(function (err){
          console.log(err.response)
          setStock({error: true})
        })
      if (response.data !== null) {
        console.log(response)
        setStock(response.data)
      }
      
    } 
    getStock(ticker)
  },[ticker])

  return (
    <div className="stocksContainer">
      <StocksDisplayNav display={display} handleDisplay={handleDisplay}/>
      {stock.error ? <Error /> : 
        <div className='stocksInfo'>
          <General stock={stock} isActive={display.general}/>
          <Chart stock={stock} isActive={display.chart}/>
          <Financials stock={stock} isActive={display.financials}/>
          <News stock={stock} isActive={display.news}/>
        </div>
      }
      
      
    </div>
  )
}