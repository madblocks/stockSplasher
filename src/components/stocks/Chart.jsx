import styled from 'styled-components'

const StyledChartDisplay = styled.div`
  border-top: 2px solid orange;
  
  ${({active}) => active ? null : 'display: none;'}

  .chart {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`

export default function Chart ({stock, isActive}) {
  return (
    <StyledChartDisplay active={isActive}>
      <div className='chart'>
        <iframe frameBorder='0' scrolling='no' width='800' height='420' title='chart'
          src={`http://api.stockdio.com/visualization/financial/charts/v1/HistoricalPrices?app-key=8961019C3F42432E927E3C9EECFCC103&symbol=${stock.symbol}&days=365&width=800&height=420`}>
        </iframe>
      </div>
    </StyledChartDisplay>
  )
}