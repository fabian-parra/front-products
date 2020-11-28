import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiEnzyme from 'chai-enzyme'
import dirtyChai from 'dirty-chai'

chai.use(dirtyChai)
chai.use(sinonChai)
chai.use(chaiEnzyme())

const expect = chai.expect
export {
  expect,
  chai as default
}
