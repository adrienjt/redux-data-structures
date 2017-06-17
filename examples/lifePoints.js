import { createStore } from 'redux';
import { counter } from 'redux-data-structures';

const lifePoints = counter({
  initialState: 10,
  decrementActionTypes: ['PUNCH', 'KICK'],
  decrement: action => action.value,
  min: () => 10, // action => number
  resetActionTypes: ['INSERT_COIN'],
});

const store = createStore(lifePoints);

store.subscribe(() => { console.log(store.getState()); });

store.dispatch({ type: 'PUNCH', value: 5 });
store.dispatch({ type: 'KICK', value: 7 });
store.dispatch({ type: 'INSERT_COIN' });
