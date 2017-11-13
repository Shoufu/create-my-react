import Immutable from 'immutable'
import * as actionTypes from 'constants/actionTypes'

const defaultState = Immutable.Map({ test: {} })

function test(state = defaultState, action) {
  let data
  switch (action.type) {
    case actionTypes.ACTION_TEST_GET:
    case actionTypes.ACTION_TEST_POST:
      data = state.set('test', action.data)
      return data
    default:
      return state
  }
}

export { test }
