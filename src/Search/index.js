import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './styles.less'

const MINIMUM_CHARACTERS = 3

const Search = ({fetchId, fetchMatch}) => {
  const [search, setSearch] = useState('')
  
  const handleInput = event => {
    setSearch(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(search.match(/\d+/)) {
      fetchId(search)
      setSearch('')
    }
    if(search.split('').length > MINIMUM_CHARACTERS) {
      fetchMatch(search)
      setSearch('')
    }
  }

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input type='text' name='search' placeholder='¿Qué producto buscas hoy?' autoComplete='off' onChange={handleInput} value={search}/>
      </form>
    </div>
  )
}

Search.propTypes = {
  fetchId: PropTypes.func.isRequired,
  fetchMatch: PropTypes.func.isRequired
}

export default Search
