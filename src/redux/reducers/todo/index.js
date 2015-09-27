import { combineReducers } from 'redux-immutablejs';
import { multiplexReducer, multiplexEnsureState } from 'redux-multiplex';
import status from './status';
import items from './items';
import constants from './constants';

export const reducer = combineReducers({
  status,
  items,
});

export const ensureTodoItemState = multiplexEnsureState(reducer,
  (state) => state.get('todo')
);

export default multiplexReducer(constants)(reducer);
