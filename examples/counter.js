import { createStore } from 'redux';
import { counter } from 'redux-data-structures';

const myCounter = counter({
  incrementActionTypes: ['INCREMENT'],
  decrementActionTypes: ['DECREMENT'],
});

const store = createStore(myCounter);

store.subscribe(() => { console.log(store.getState()); });

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
