import { createStore, combineReducers } from 'redux';
import { map, set, value } from 'redux-data-structures';

const todos = map({
  addActionTypes: ['ADD_TODO'],
  removeActionTypes: ['REMOVE_TODO'],
});

const completedTodos = set({
  toggleActionTypes: ['TOGGLE_TODO'],
  removeActionTypes: ['REMOVE_TODO'],
  keyGetter = action => action.payload.id,
});

const visibilityFilter = value({
  initialState: 'SHOW_ALL',
  setActionTypes: ['SET_VISIBILITY_FILTER'],
  valueGetter = action => action.payload.filter,
});

const rootReducer = combineReducers({
  todos,
  completedTodos,
  visibilityFilter,
});

const store = createStore(rootReducer);

store.subscribe(() => { console.log(store.getState()); });

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 0,
    text: 'Go fishing',
  },
});

store.dispatch({
  type: 'TOGGLE_TODO',
  payload: { id: 0 },
});

store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  payload: { filter: 'SHOW_COMPLETED' },
});

store.dispatch({
  type: 'REMOVE_TODO',
  payload: { id: 0 },
});
