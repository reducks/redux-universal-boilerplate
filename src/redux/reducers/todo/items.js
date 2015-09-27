import { createReducer } from 'redux-immutablejs';
import { List } from 'immutable';
import * as constants from './constants';

const ADD = 'todo/items/add';
const REMOVE = 'todo/items/remove';

export const addTodo = (text) => ({
  type: ADD,
  payload: {
    text: new Promise((resolve) => setTimeout(() => resolve(text), parseInt(Math.random() * 1000, 10))),
  },
});

export const removeTodo = (id) => ({
  type: REMOVE,
  payload: {
    id: new Promise((resolve) => setTimeout(() => resolve(id), parseInt(Math.random() * 1000, 10))),
  },
});

export default createReducer(List(), {
  [constants.ADD_SUCCESS]: (state, action) => state.push(action.payload.text),
  [constants.REMOVE_SUCCESS]: (state, action) => state.filter((value, key) => key !== action.payload.id),
});
