import * as actionTypes from 'constants/actionTypes'

function test(state = {}, action) {
  switch (action.type) {
    case actionTypes.ACTION_TEST_GET:
    case actionTypes.ACTION_TEST_POST:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

export { test }
