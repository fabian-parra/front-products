import sinon from 'sinon'
import { expect } from 'helpers/chaiSetup'
import ProductService from 'service/Products'

describe('Products Service', () => {
  let response
  const sandbox = sinon.createSandbox()
  beforeEach(() => {
    response = { json: sandbox.stub().resolves('data') }
    global['fetch'] = sandbox.stub().resolves(response)
  })

  afterEach(() => {
    sandbox.restore()
    delete global['fetch']
  })

  it('fetchProductId', () => ProductService.fetchProductId('123').then(data => {
    expect(global['fetch']).to.have.been.calledWith(`http://localhost:8882/bff/get-products?id=123`)
    expect(response.json).to.have.been.called
    expect(data).to.equal('data')
  }))

  it('fetchProductMatch', () => ProductService.fetchProductMatch('asdf').then(data => {
    expect(global['fetch']).to.have.been.calledWith(`http://localhost:8882/bff/get-products?match=asdf`)
    expect(response.json).to.have.been.called
    expect(data).to.equal('data')
  }))
})
