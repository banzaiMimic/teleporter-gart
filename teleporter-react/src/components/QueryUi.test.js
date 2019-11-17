import React from 'react'
import renderer from 'react-test-renderer'

import QueryUi from './QueryUi'

test('Load Default Input, Submit, Clear functionality snapshot tests', () => {
  const component = renderer.create(<QueryUi />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // trigger loadInput
  const e = { preventDefault: jest.fn() }
  const unformattedInput = 'unformatted input...'
  const btnloadInput = component.root.findAllByType('input')[2].props
  const btnSubmit = component.root.findAllByType('input')[0].props
  const btnClear = component.root.findAllByType('input')[1].props

  btnloadInput.onClick()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // trigger submit
  btnSubmit.onClick(e)
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // trigger clear
  btnClear.onClick()
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  // trigger error on input
  

})