import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Search from 'Search'
import Product from 'Product'
import ProductService from 'service/Products'
import './styles.less'

const App = ({fetchProductId, fetchProductMatch}) => {
  const [products, setProducts] = useState([])
  
  const fetchId = search => fetchProductId(search)
    .then(data => {
      setProducts([data])
    }).catch(() => {
      setProducts([])
    })

  const fetchMatch = search => fetchProductMatch(search)
    .then(data => {
      setProducts(data)
    }).catch(() => {
      setProducts([])
    })
  
  const productList = <ul>
    {products.map(product => (
      <Product key={product.id} {...product} /> 
    ))}
  </ul>

  return (
  <>
    <header>
      <i className='logo'></i>
      <Search {...{fetchId, fetchMatch}}/>
    </header>
    <main>
      <section className='filters'></section>
      <section className='list'>{productList}</section>
    </main>
    <footer></footer>
  </>
  )
}

App.propTypes = {
  fetchProductId: PropTypes.func.isRequired,
  fetchProductMatch: PropTypes.func.isRequired
}
const AppContainer = () => <App {...ProductService}/>
export default AppContainer
