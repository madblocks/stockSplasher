import styled from 'styled-components'

const StyledLoading = styled.div`
  display: flex;
  margin: auto auto;
  .loading {
    margin-right: 20px;
  }
  .background {
    height: 30px;
    width: 150px;
    background-color: darkgray;
  }
  .loadingBar {
    position: relative;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: lightgray;
    animation: load 1s steps(7, end) infinite;
  }
  .cover {
    height: 30px;
    width: 150px;
    background-color: #323428;
    z-index: 99;
  }
  @keyframes load {
    to {
      transform: translateX(150px);
    }
  }

`

export default function Loading () {
  return (
    <StyledLoading>
      <span className='loading'>Loading</span>
      <div className='background'>
        <div className='loadingBar'></div>
      </div>
      <div className='cover'></div>
    </StyledLoading>
  )
}