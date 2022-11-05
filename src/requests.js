import axios from 'axios'

export const request = (api, resource, ticker) => {

  let url = ''
  const useCorsAnywhere = true
  if (useCorsAnywhere) {
    url += process.env.REACT_APP_CORSANYWHERE
  }
  if (api === 'darqube') {
    url += 'https://api.darqube.com/data-api/'
    if (resource === 'stocks') {
      url += 'market_data/quote/'
      url += `${ticker}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    }
  }

  return (
    axios ({
      method: 'get',
      url: url
    })
  )
}

