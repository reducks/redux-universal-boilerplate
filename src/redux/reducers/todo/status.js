import { createReducer } from 'redux-immutablejs';
import { Map } from 'immutable';
import * as constants from './constants';

const pending = () => Map({ pending: true, error: null });
const success = () => Map({ pending: false, error: null });
const failure = (state, action) => {
  return Map({ pending: false, error: action.payload });
};

export default createReducer(success(), {
  [constants.ADD_PENDING]: pending,
  [constants.REMOVE_PENDING]: pending,
  [constants.ADD_SUCCESS]: success,
  [constants.REMOVE_SUCCESS]: success,
  [constants.ADD_FAILURE]: failure,
  [constants.REMOVE_FAILURE]: failure,
});
