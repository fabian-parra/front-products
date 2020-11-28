import React from 'react'
import sinon from 'sinon'
import { expect } from 'helpers/chaiSetup'
import { shallow } from 'helpers/enzymeSetup'
import Search from 'Search'

describe('Search Component', () => {
  let component, props;
  const sandbox = sinon.createSandbox()

  beforeEach(() => {
    props = {
      fetchId: sandbox.spy(),
      fetchMatch: sandbox.spy()
    }
    component = shallow(<Search {...props}/>)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('render input', () => {
    const input = component.find('input')
    expect(input).to.have.prop('type').equal('text')
    expect(input).to.have.prop('name').equal('search')
    expect(input).to.have.prop('placeholder').equal('¿Qué producto buscas hoy?')
    expect(input).to.have.prop('autoComplete').equal('off')
    expect(input).to.have.prop('value').equal('')
  })

  it('write input', () => {
    const fakeEvent = {
      target: {
        value: '1'
      }
    }
    component.find('input').simulate('change', fakeEvent)
    expect(component.find('input')).to.have.prop('value').equal('1')
  })

  describe('submit form', () => {
    let fakeEvent
    describe('when send id', () => {
      beforeEach(() => {
        fakeEvent = {
          target: {
            value: '1'
          },
          preventDefault: sandbox.spy()
        }
        component.find('input').simulate('change', fakeEvent)
        component.find('form').simulate('submit', fakeEvent)
      })

      it('call preventDefault', () => {
        expect(fakeEvent.preventDefault).to.have.been.called
      })

      it('call fetchId', () => {
        expect(props.fetchId).to.have.been.calledWith('1')
      })

      it('dont call fetchMatch', () => {
        expect(props.fetchMatch).to.not.have.been.called
      })

      it('restore search', () => {
        expect(component.find('input')).to.have.prop('value').equal('')
      })
    })

    describe('when send three characters or less', () => {
      beforeEach(() => {
        fakeEvent = {
          target: {
            value: 'asd'
          },
          preventDefault: sandbox.spy()
        }
        component.find('input').simulate('change', fakeEvent)
        component.find('form').simulate('submit', fakeEvent)
      })

      it('call preventDefault', () => {
        expect(fakeEvent.preventDefault).to.have.been.called
      })
        
      it('dont call fetchId', () => {
        expect(props.fetchId).to.not.have.been.called
      })

      it('dont call fetchMatch', () => {
        expect(props.fetchMatch).to.not.have.been.called
      })

      it('dont restore search', () => {
        expect(component.find('input')).to.have.prop('value').equal('asd')
      })
    })

    describe('when send more than three characters', () => {
      beforeEach(() => {
        fakeEvent = {
          target: {
            value: 'asdf'
          },
          preventDefault: sandbox.spy()
        }
        component.find('input').simulate('change', fakeEvent)
        component.find('form').simulate('submit', fakeEvent)
      })

      it('call preventDefault', () => {
        expect(fakeEvent.preventDefault).to.have.been.called
      })
        
      it('dont call fetchId', () => {
        expect(props.fetchId).to.not.have.been.called
      })

      it('dont call fetchMatch', () => {
        expect(props.fetchMatch).to.have.been.calledWith('asdf')
      })

      it('dont restore search', () => {
        expect(component.find('input')).to.have.prop('value').equal('')
      })
    })
  })
})
