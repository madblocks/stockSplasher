import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { request } from '../requests'
import StocksDisplayNav from './StocksDisplayNav'
import Error from './stocks/Error'
import General from './stocks/General'
import Chart from './stocks/Chart'
import Financials from './stocks/Financials'
import News from './stocks/News'
import Loading from './Loading'




export default function Stocks () {

  let { ticker } = useParams()

  const [error, setError] = useState()
  const [stock, setStock] = useState()
  
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
      setError({error: false})
      const response = await request('darqube', 'quote', ticker)
        .catch(function (err){
          console.log(err.response)
          setError({error: true})
        })
      if (response.data !== null) {
        let symbol = response.data.ticker.split('.')[0]
        setStock({...response.data, symbol: symbol})
      }
    } 
    getStock()

  },[ticker])

  return (
    <div className="stocksContainer">
      <StocksDisplayNav display={display} handleDisplay={handleDisplay}/>
      { error === true ? <Error /> : 
        stock ?
          <div className='stocksInfo'>
            <General stock={stock} isActive={display.general}/>
            <Financials stock={stock} isActive={display.financials}/>
            <Chart stock={stock} isActive={display.chart}/>
            <News stock={stock} isActive={display.news}/>
          </div>
          : <Loading />
      }
      
      
        
      
      
      
    </div>
  )
}