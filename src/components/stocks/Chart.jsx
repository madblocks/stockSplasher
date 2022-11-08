import styled from 'styled-components'

const StyledChartDisplay = styled.div`
  height: 200px;
  border-top: 2px solid white;
  
  ${({active}) => active ? null : 'display: none;'}

  .header {
    font-size: 20px;
    color: purple;
  }
  .something {
    color: yellow;
  }

`

export default function Chart ({stock, isActive}) {
  return (
    <StyledChartDisplay active={isActive}>
      <div className='header'>Chart</div>
    </StyledChartDisplay>
  )
}