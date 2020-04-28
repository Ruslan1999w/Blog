import { combineReducers } from 'redux'
import userReducer from './userReducer'
import test_reducer from './test_reducer'

export const rootReducer = combineReducers({
  user: userReducer,
  test: test_reducer,
})
