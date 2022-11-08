import styled from 'styled-components'

const StyledNewsDisplay = styled.div`
  height: 200px;

  ${({active}) => active ? null : 'display: none;'}

  .header {
    font-size: 20px;
    color: red;
  }

`

export default function News ({stock, isActive}) {
  return (
    <StyledNewsDisplay active={isActive}>
      <div className='header'>News!!!</div>
    </StyledNewsDisplay>
  )
}