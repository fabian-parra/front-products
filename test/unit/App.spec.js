import React from 'react'
import sinon from 'sinon'
import { expect } from 'helpers/chaiSetup'
import { shallow } from 'helpers/enzymeSetup'
import ProductService from 'service/Products'

describe('App Component', () => {
  let component
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    sandbox.stub(ProductService, 'fetchProductId').resolves(dataId)
    sandbox.stub(ProductService, 'fetchProductMatch').resolves(dataMatch)
    const App = require('App').default
    component = shallow(<App />).shallow()
  })

  afterEach(() => {
    sandbox.restore()
    delete require.cache[require.resolve('App')]
  })

  it('render header', () => {
    expect(component.find('header')).to.be.present()
  })

  it('render logo', () => {
    expect(component.find('.logo')).to.be.present()
  })

  it('render Search box', () => {
    expect(component.find('Search')).to.be.present()
  })

  it('trigger fetchId', () => component.find('Search').prop('fetchId')('').then(() => {
    return expect(component.find('Product')).to.have.lengthOf(1)
  }))

  it('trigger fetchMatch', () => component.find('Search').prop('fetchMatch')('').then(() => {
    return expect(component.find('Product')).to.have.lengthOf(2)
  }))

  describe('Products fail', () => {
    beforeEach(() => {
      sandbox.restore()
      sandbox.stub(ProductService, 'fetchProductId').rejects('error')
      sandbox.stub(ProductService, 'fetchProductMatch').rejects('error')
      const App = require('App').default
      component = shallow(<App />).shallow()
    })

    it('trigger fetchId', () => component.find('Search').prop('fetchId')('').then(() => {
      return expect(component.find('Product')).to.have.lengthOf(0)
    }))

    it('trigger fetchMatch', () => component.find('Search').prop('fetchMatch')('').then(() => {
      return expect(component.find('Product')).to.have.lengthOf(0)
    }))
  })
})

const dataId = {
  id: 'test-id',
  brand: 'test-brand',
  description: 'test-description',
  price: 1000,
  discount: 100,
  discountPercent: 10,
  image: 'test-image-url'
}

const dataMatch = [
  dataId,
  {
    ...dataId,
    id: 'test-id-2'
  }
]
