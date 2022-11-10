import { useContext } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { isPositive } from '../utils'
import { PortfolioContext } from '../App'

const StyledPortfolio = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  width: 60%;

  .stock {
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid gray;
  }
  .symbol {
    font-weight: bold;
    font-size: 24px;
  }
  .decrease {
    color: red;
  }
  .increase {
    color: rgb(17, 207, 99);
  }
  .orange {
    color: orange;
  }
  .item: {
    width: 20%;
  }
`

export default function Portfolio () {

  const {portfolio, setPortfolio} = useContext(PortfolioContext)

  const handlePortfolio = (e) => {
    if (portfolio[e.target.dataset.id]) {
      setPortfolio(portfolio => {
        delete portfolio[e.target.dataset.id]
        return (
          {...portfolio}
        )
      })
    } else {
      console.log('didnt remove')
    }
  }

  const inPortfolio = (symbol) => {
    return portfolio[symbol]
  }

  return (
    <StyledPortfolio>
      {Object.values(portfolio).map(stock => (
        <div className='stock' key={stock.symbol}>
          <div className='item symbol'>{stock.symbol}</div>
          <div>{stock.price}</div>
          <div className={'item' + (isPositive(stock.daily_price_change) ? ' increase' : ' decrease')}>{stock.daily_price_change.toFixed(2)}</div>
          <div className={'item' + (isPositive(stock.daily_percentage_change) ? ' increase' : ' decrease')}>{stock.daily_percentage_change.toFixed(2)}</div>
          <FontAwesomeIcon icon={inPortfolio(stock.symbol) ? faStarSolid : faStar} data-id={stock.symbol} className={'portIcon item' + (inPortfolio(stock.symbol) ? ' orange' : '')} onClick={handlePortfolio}/>
        </div>
      ))
      }
    </StyledPortfolio>
  )
}