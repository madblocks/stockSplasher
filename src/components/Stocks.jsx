import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { request } from '../requests'
import StocksDisplayNav from './StocksDisplayNav'
import Error from './stocks/Error'




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
      const response = await request('darqube', 'stocks', ticker)
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
        <div className="stocksInfo">
          <span>{ticker}</span><span>{stock.price}</span>
          <div>{stock.daily_price_change}</div>
        </div>
      }
      
      
    </div>
  )
}