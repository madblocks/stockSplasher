import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

const StyledLinks = styled.div`
  
  width: 220px;
  display: flex;
  justify-content: space-between;

  .nav-link {
    text-decoration: none;
    color: white;
    font-size: 20px;
  }
  .currentLink {
    color: orange;
    border-bottom: 2px solid orange;
  }
`


export default function Nav (props) {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.searchStocks()
  }

  const search = props.search

  return (
    <div className='navbar'>
      <form className='search' onSubmit={handleSubmit}>
        <input className='searchInput' type='text' value={search} onChange={props.handleChange} name='ticker' placeholder='ticker'/>
        
        <button className='searchButton'><FontAwesomeIcon icon={faMagnifyingGlass} className='magIcon'/></button>
      </form>
      <div></div>
      <StyledLinks >
        <NavLink to='/' className={({isActive}) =>
            "nav-link" + (isActive ? " currentLink" : "")
          }>Markets </NavLink>
        <NavLink to='/portfolio' className={({isActive}) =>
            "nav-link" + (isActive ? " currentLink" : "")
          }>Portfolio</NavLink>
      </StyledLinks>
    </div>
  )
}