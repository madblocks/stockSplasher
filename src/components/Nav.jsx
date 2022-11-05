import { useNavigate } from 'react-router-dom'

export default function Nav (props) {

  const handleSubmit = (e) => {
    e.preventDefault()
    props.searchStocks()
  }

  let navigate = useNavigate()

  const search = props.search

  return (
    <div className='navbar'>
      <form className='search' onSubmit={handleSubmit}>
        <input type='text' value={search} onChange={props.handleChange} name='ticker' placeholder='ticker'/>
        <button>Search</button>
      </form>
    </div>
  )
}