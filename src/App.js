import './App.css';
import { Routes, Route } from 'react-router-dom'
import { useState, createContext } from 'react'
import Home from './components/Home'
import Header from './components/Header'
import Nav from './components/Nav'
import Stocks from './components/Stocks'
import Portfolio from './components/Portfolio'
import { useNavigate } from 'react-router-dom'

export const PortfolioContext = createContext()

function App() {

  const [hideTitle, setHideTitle] = useState(false)
  const [search, setSearch] = useState('')
  const [portfolio, setPortfolio] = useState([])

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  let navigate = useNavigate()
  
  const searchStocks = () => {
    navigate(`/stocks/${search.toUpperCase()}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header hideTitle={hideTitle}/>
        <Nav search={search} searchStocks={searchStocks} handleChange={handleSearchChange}/>
      </header>
      <main>
        <PortfolioContext.Provider value={{portfolio, setPortfolio}}>
          <Routes>
            <Route path='/' element={<Home setHideTitle={setHideTitle}/>}/>
            <Route path='/portfolio' element={<Portfolio />}/>
            <Route path='/stocks/:ticker' element={<Stocks />}/>
          </Routes>
        </PortfolioContext.Provider>
      </main>
    </div>
  );
}

export default App;
