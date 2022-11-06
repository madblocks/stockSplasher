import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { request } from '../requests'
import DisplayNav from './DisplayNav'



export default function Stocks () {

  let { ticker } = useParams()

  const [stock, setStock] = useState([])

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_DARQUBE_KEY)
  //   const getStock = async () => {
  //     let requestURL = `https://api.darqube.com/data-api/market_data/quote/TSLA?token=b68bf55a72e345fe868a01e8a6007aa9`
  //     if (useCorsAnywhere) {
  //       requestURL = corsAnywhere + requestURL
  //     }
  //     const response = await axios({
  //       method: 'get',
  //       url: requestURL 
  //     })
  //     console.log(response.data)
  //     setStock(response.data)
  //   } 
  //   getStock(ticker)
    
  // },[useCorsAnywhere, ticker])

useEffect(() => {
    const getStock = async () => {
      const response = await request('darqube', 'stocks', ticker)
      console.log(response.data)
      setStock(response.data)
    } 
    getStock(ticker)
  },[ticker])

  return (
    <div className="stocksContainer">
      <DisplayNav />
      <div className="stocksInfo">
        <span>{ticker}</span><span>{stock.price}</span>
        <div>{stock.daily_price_change}</div>
      </div>
    </div>
  )
}