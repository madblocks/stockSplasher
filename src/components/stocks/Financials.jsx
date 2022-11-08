import styled from 'styled-components'

const StyledFinancialsDisplay = styled.div`
  height: 200px;
  border-top: 2px solid white;
  
  ${({active}) => active ? null : 'display: none;'}

  .header {
    font-size: 20px;
    color: lightblue;
  }
`

export default function Financials ({stock, isActive}) {
  return (
    <StyledFinancialsDisplay active={isActive}>
      <div className='header'>Financials</div>
    </StyledFinancialsDisplay>
  )
}