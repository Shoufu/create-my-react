import * as actionTypes from 'constants/actionTypes'

function test(state = {}, action) {
  switch (action.type) {
    case actionTypes.ACTION_TEST_PENGDING:
      return { ...state, loading: true }
    case actionTypes.ACTION_TEST_REMOVED:
    case actionTypes.ACTION_TEST_FULFILLED:
      return { data: action.data, loading: false }
    case actionTypes.ACTION_TEST_REJECTED:
      return { ...state, loading: false, error: action.error }
    default:
      return { ...state, loading: false }
  }
}

export { test }
