import React from 'react'
import { expect } from 'helpers/chaiSetup'
import { shallow } from 'helpers/enzymeSetup'
import Product from 'Product'

describe('Product Component', () => {
  let component, props

  beforeEach(() => {
    props = {
      brand: 'test-brand',
      description: 'test-description',
      price: 10000,
      discount: 100,
      discountPercent: 10,
      image: 'test-image-url'
    }
    component = shallow(<Product {...props}/>)
  })

  it('render image', () => {
    const image = component.find('img')
    expect(image).to.have.prop('src').equal('https://test-image-url')
    expect(image).to.have.prop('alt').equal('imagen de producto')
  })

  it('render paragraph', () => {
    const paragraph = component.find('p')
    expect(paragraph.find('strong')).to.have.text('test-brand')
    expect(paragraph).to.have.text('test-brand test-description')
  })

  it('render actual price', () => {
    const actualPrices = component.find('div')
    expect(actualPrices.find('span').first()).to.have.text('9,900')
    expect(actualPrices.find('span').last()).to.have.text('10%')
  })

  it('render original price', () => {
    expect(component.find('span').last()).to.have.text('10,000')
  })
})
