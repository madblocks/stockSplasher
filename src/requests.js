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
      'searchValue': `${search}?${darqubeKey}`
    },
    'reference': {
      'resource': 'reference/stocks',
      'searchValue': `?${darqubeKey}&skip=0&limit=1000&symbol=${search}&country=United States&type=Common Stock`
    },
    'recommendation': {
      'resource': 'fundamentals/stocks/analysts_recommendations/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'outstanding': {
      'resource': 'fundamentals/stocks/outstanding_shares/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'dividends': {
      'resource': 'fundamentals/stocks/dividends/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'epsHistorical': {
      'resource': 'fundamentals/stocks/eps_historical/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'epsEst': {
      'resource': 'fundamentals/stocks/eps_trends/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'balance': {
      'resource': 'fundamentals/stocks/balance_sheet/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'income': {
      'resource': 'fundamentals/stocks/income_statement/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'cashFlow': {
      'resource': 'fundamentals/stocks/cash_flow/',
      'searchValue': `${search}?${darqubeKey}`
    },
    'news': {
      'resource': 'fundamentals/media/news',
      'searchValue': `?${darqubeKey}&symbol=${search}&skip=0&limit=20&sort=desc`
    },
    'tweets': {
      'resource': 'fundamentals/media/tweets',
      'searchValue': `?${darqubeKey}&symbol=${search}&skip=0&limit=20&sort=desc`
    },
    'topMovers': {
      'resource': 'fundamentals/indexes/top_movers/',
      'searchValue': `${search}?${darqubeKey}`
    }
  }

  let url = ''
  
  if (process.env.REACT_APP_USE_CORS) {
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

