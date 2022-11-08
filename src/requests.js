import axios from 'axios'

// https://api.darqube.com/data-api/fundamentals/stocks/general/TSLA?token=your_api_key

export const request = (api, resource, search) => {

  const darqube = {
    'api': 'https://api.darqube.com/data-api/',
    'quote': 'market_data/quote/',
    'general': 'fundamentals/stocks/general/',
    'searchValue' : `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
  }

  let url = ''
  const useCorsAnywhere = true
  if (useCorsAnywhere) {
    url += process.env.REACT_APP_CORSANYWHERE
  }
  if (api === 'darqube') {
    url += darqube.api + darqube[resource] + darqube.searchValue
    // url += 'https://api.darqube.com/data-api/'
    // if (resource === 'quote') {
    //   url += 'market_data/quote/'
    //   url += `${ticker}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    // }
  }

  return (
    axios ({
      method: 'get',
      url: url
    })
  )
}

