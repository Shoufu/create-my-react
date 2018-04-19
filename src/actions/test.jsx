import Immutable from 'immutable'
import { ACTION_TEST_GET, ACTION_TEST_POST } from 'constants/actionTypes'
import request from 'utils/requests'

export function getTest() {
  return async (dispatch) => {
    try {
      const response = await request.get('/test')
      const data = Immutable.Map(response)
      dispatch({
        type: ACTION_TEST_GET,
        data,
      })
    } catch (error) {
      console.log('Error from getTest: ')
      console.log(error)
    }
  }
}

export function postTest(text = 'text from postTest') {
  return async (dispatch) => {
    try {
      const response = await request.post('/test', text)
      const data = Immutable.Map(response)
      dispatch({
        type: ACTION_TEST_POST,
        data,
      })
    } catch (error) {
      console.log('Error from postTest: ')
      console.log(error)
    }
  }
}
