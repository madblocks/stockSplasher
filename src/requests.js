import axios from 'axios'

export const request = (api, resource, search) => {

  const darqubeKey = `token=${process.env.REACT_APP_DARQUBE_KEY}`

  const darqube = {
    'api': 'https://api.darqube.com/data-api/',
    'quote': {
      'resource': 'market_data/quote/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'general': {
      'resource': 'fundamentals/stocks/general/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'reference': {
      'resource': 'reference/stocks',
      'searchValue': `?token=${process.env.REACT_APP_DARQUBE_KEY}&skip=0&limit=1000&symbol=${search}&country=United States&type=Common Stock`
    },
    'recommendation': {
      'resource': 'fundamentals/stocks/analysts_recommendations/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'outstanding': {
      'resource': 'fundamentals/stocks/outstanding_shares/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'dividends': {
      'resource': 'fundamentals/stocks/dividends/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'epsHistorical': {
      'resource': 'fundamentals/stocks/eps_historical/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'epsEst': {
      'resource': 'fundamentals/stocks/eps_trends/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'balance': {
      'resource': 'fundamentals/stocks/balance_sheet/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'income': {
      'resource': 'fundamentals/stocks/income_statement/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
    },
    'cashFlow': {
      'resource': 'fundamentals/stocks/cash_flow/',
      'searchValue': `${search}?token=${process.env.REACT_APP_DARQUBE_KEY}`
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

