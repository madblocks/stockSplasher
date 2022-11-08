import axios from 'axios'

export const request = (api, resource, search) => {

  const darqube = {
    'api': 'https://api.darqube.com/data-api/',
    'quote': {
      'resource': 'market_data/quote/',
      'searchValue' : `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'general': {
      'resource': 'fundamentals/stocks/general/',
      'searchValue' : `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'reference': {
      'resource': 'reference/stocks',
      'searchValue': `?token=${process.env.REACT_APP_DARQUBE_KEY}&skip=0&limit=1000&symbol=${search}&country=United States&type=Common Stock`
    },
    'recommendation': {
      'resource': 'fundamentals/stocks/analysts_recommendations/',
      'searchValue' : `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'outstanding': {
      'resource': 'fundamentals/stocks/outstanding_shares/',
      'searchValue' : `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    }
  }

  let url = ''
  const useCorsAnywhere = true
  if (useCorsAnywhere) {
    url += process.env.REACT_APP_CORSANYWHERE
  }
  if (api === 'darqube') {
    url += darqube.api + darqube[resource].resource + darqube[resource].searchValue
  }
  if (api === 'polygon') {

  }

  return (
    axios ({
      method: 'get',
      url: url
    })
  )
}

