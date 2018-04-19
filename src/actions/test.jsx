import request from 'utils/requests'
import {
  ACTION_TEST_PENGDING,
  ACTION_TEST_FULFILLED,
  ACTION_TEST_REJECTED,
  ACTION_TEST_REMOVED
} from 'constants/actionTypes'

export function getTest() {
  return async dispatch => {
    dispatch({ type: ACTION_TEST_PENGDING, data: 'pending' })
    try {
      const response = await request.get('/test')
      dispatch({ type: ACTION_TEST_FULFILLED, data: response })
    } catch (error) {
      console.log(error)
      dispatch({ type: ACTION_TEST_REJECTED, error })
    }
  }
}

export function removeText() {
  return dispatch => dispatch({
    type: ACTION_TEST_REMOVED,
    data: ''
  })
}
