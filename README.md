# Redux Data Structures

## Introduction

Redux Data Structures is a library of _reducer makers_.

Reducer makers help create common reducers like counters, maps, lists (queues, stacks), sets, etc. Most application states can be built by combining a handful of these standardized building blocks.

Redux Data Structures was developed for Redux, but does not depend on it. It can actually be used with any reactive state container, even a custom one; Redux Data Structures doesn't have any dependency.

## Getting Started

```
npm install --save redux-data-structures
```

Here's an example from the [Redux README](https://github.com/reactjs/redux), rewritten with Redux Data Structures:

```javascript
import { createStore } from 'redux';
import { counter } from 'redux-data-structures';

const myCounter = counter({
  incrementActionTypes: ['INCREMENT'],
  decrementActionTypes: ['DECREMENT'],
});

const store = createStore(myCounter);

store.subscribe(() => { console.log(store.getState()); });

store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
```

## Configuring Data Structures

Here's a more advanced example--with the same reducer maker--of a counter from 10 to 0, decreasing as a function of the action payload, then reset, representing life points for example:

```javascript
import { createStore } from 'redux';
import { counter } from 'redux-data-structures';

const lifePoints = counter({
  initialState: 10,
  decrementActionTypes: ['PUNCH', 'KICK'],
  decrement: action => action.value,
  min: () => 0, // action => number
  resetActionTypes: ['INSERT_COIN'],
});

const store = createStore(lifePoints);

store.subscribe(() => { console.log(store.getState()); });

store.dispatch({ type: 'PUNCH', value: 5 });
// 5
store.dispatch({ type: 'KICK', value: 7 });
// 0
store.dispatch({ type: 'INSERT_COIN' });
// 10
```

## Combining Data Structures

Let's build a classic todo app with Redux Data Structures:

```javascript
import { createStore, combineReducers } from 'redux';
import { map, set, value } from 'redux-data-structures';

const todos = map({
  addActionTypes: ['ADD_TODO'],
  removeActionTypes: ['REMOVE_TODO'],
});

const completedTodos = set({
  toggleActionTypes: ['TOGGLE_TODO'],
  removeActionTypes: ['REMOVE_TODO'],
  keyGetter: action => action.payload.id,
});

const visibilityFilter = value({
  initialState: 'SHOW_ALL',
  setActionTypes: ['SET_VISIBILITY_FILTER'],
  valueGetter: action => action.payload.filter,
});

const rootReducer = combineReducers({
  todos,
  completedTodos,
  visibilityFilter,
});

const store = createStore(rootReducer);
```

That's all for the store! We've relied heavily on the reducer makers' default options, which presume that:
1. actions adhere to the [Flux Action Standard](https://github.com/acdlite/flux-standard-action) (actions are plain Javascript object with a `type` and `payload` properties),
1. and Todos are identified by an `id` property, used as a key in the `todos` map (and the `completetedTodos` set).

Now let's subscribe to the store and dispatch a few actions:

```javascript
store.subscribe(() => { console.log(JSON.stringify(store.getState(), null, 2)); });

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 0,
    text: 'Go fishing',
  },
});
// {
//   "todos": {
//     "byId": {
//       "0": {
//         "id": 0,
//         "text": "Go fishing"
//       }
//     },
//     "allIds": [
//       0
//     ]
//   },
//   "completedTodos": {},
//   "visibilityFilter": "SHOW_ALL"
// }
```

Notice that `todos` is [normalized, for the reasons explained in the Redux documentation](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html).

```javascript
store.dispatch({
  type: 'TOGGLE_TODO',
  payload: { id: 0 },
});
// {
//   "todos": {
//     "byId": {
//       "0": {
//         "id": 0,
//         "text": "Go fishing"
//       }
//     },
//     "allIds": [
//       0
//     ]
//   },
//   "completedTodos": {
//     "0": true
//   },
//   "visibilityFilter": "SHOW_ALL"
// }
```

Compared to the original Redux Todo example, we've separated the Todo items (id, text) from their completion state. If needed, they could be combined with a [selector](http://redux.js.org/docs/recipes/ComputingDerivedData.html).

```javascript
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  payload: { filter: 'SHOW_COMPLETED' },
});
// {
//   "todos": {
//     "byId": {
//       "0": {
//         "id": 0,
//         "text": "Go fishing"
//       }
//     },
//     "allIds": [
//       0
//     ]
//   },
//   "completedTodos": {
//     "0": true
//   },
//   "visibilityFilter": "SHOW_COMPLETED"
// }
store.dispatch({
  type: 'REMOVE_TODO',
  payload: { id: 0 },
});
// {
//   "todos": {
//     "byId": {},
//     "allIds": []
//   },
//   "completedTodos": {},
//   "visibilityFilter": "SHOW_COMPLETED"
// }
```

The `REMOVE_TODO` action is reduced both by the `todos` map and the `completedTodos` set.

## Data Structures

So far, the following data structures have been implemented (corresponding action types are indicated in parentheses):

- Boolean (set to true, set to false, toggle)
- Counter (increment, decrement)
- List (queue or stack: enqueue, dequeue, push, pop)
- Map (add, remove, change)
- Set (add, remove, toggle)
- Value (set)

All data structures can be reset to their initial state, and, if applicable (for lists, maps, and sets), emptied.

## API

Each reducer maker is a higher-order function of a single `options` object and returns a reducer:
```javascript
{ ...options } => (state, action) => state
```

For each reducer maker, we describe below how the `options` object is destructured, its default property values, and how some specific properties are used.

Defaults can--and in a lot of cases __should__--be overridden.

Each category of actions, e.g., `decrementActionTypes`, is an array of action types (i.e., strings), so that several action types can have the same result (cf. [Configuring Data Structures, above](#configuring-data-structures), where both `PUNCH` and `KICK` decrement `lifePoints`).

### Boolean

```javascript
{
  initialState = false,
  trueActionTypes = [],
  additionalConditionToTrue = () => true,
  falseActionTypes = [],
  additionalConditionToFalse = () => true,
  toggleActionTypes = [],
  resetActionTypes = [],
}
```

`additionalConditionToTrue` and `additionalConditionToFalse` are functions of `action` and are used as such:

```javascript
// ...
if (trueActionTypes.includes(action.type) && additionalConditionToTrue(action)) {
  return true;
} else if (falseActionTypes.includes(action.type) && additionalConditionToFalse(action)) {
  return false;
}
// ...
```

The default `() => true` is equivalent to no additional condition.

### Counter

```javascript
{
  initialState = 0,
  incrementActionTypes = [],
  increment = () => 1,
  max,
  decrementActionTypes = [],
  decrement = () => 1,
  min,
  resetActionTypes = [],
}
```

`increment`, `decrement`, `max`, and `min` are functions of `action`. If `max` is `undefined`, it is not enforced. Same for `min`.

### List

```javascript
{
  initialState = [],
  enqueueActionTypes = [],
  dequeueActionTypes = [],
  pushActionTypes = [],
  popActionTypes = [],
  itemGetter = action => action.payload,
  resetActionTypes = [],
  emptyActionTypes = [],
}
```

A list can be used as a queue or stack. `enqueueActionTypes` and `pushActionTypes` add items to the list, using the `itemGetter`. The default `itemGetter` adds the [Flux Action Standard](https://github.com/acdlite/flux-standard-action) `payload` to the list.

### Map

```javascript
{
  initialState = {
    byId: {},
    allIds: [],
  },
  addActionTypes = [],
  changeActionTypes = [],
  removeActionTypes = [],
  keyGetter = action => action.payload.id,
  itemGetter = action => ({...action.payload}),
  itemModifier = (item, action) => ({...item, ...action.payload}),
  resetActionTypes = [],
  emptyActionTypes = [],
}
```

`map` uses the [normalized state shape recommended by Redux](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html), as can be seen from the default `initialState`. Warning: if you overwrite `initialState`, use the same format!

The default `keyGetter` assumes that the action payload has an `id` property. The default `itemModifier` overwrites the item's properties (but does not delete the ones that have disappeared in the new action payload).

### Set

```javascript
{
  initialState = {},
  addActionTypes = [],
  removeActionTypes = [],
  toggleActionTypes = [],
  keyGetter = action => action.payload,
  resetActionTypes = [],
  emptyActionTypes = [],
}
```

In Redux Data Structures, a set's state is a plain Javascript object with boolean properties, i.e. if and only if `key` is in the set, `key` is a property of `state` whose value is `true`. Example:
```javascript
{ key: true }
```
When a key is removed from the set, the corresponding property is deleted from the state object:
```javascript
{}
```

### Value

```javascript
{
  initialState = null,
  setActionTypes = [],
  valueGetter = action => action.payload,
  resetActionTypes = [],
}
```

`value` is the simplest data structure (to the extent that calling it a data structure is arguable).

## Performance

Redux Data Structures doesn't focus on performance, but on developer productivity. In most cases, performance won't be an issue. If it is, please write an issue or submit a pull request.

## Contributing

The code is written in modern Javascript, transpiled with Babel, using Jest for tests. Pull requests are welcome.

## License

[MIT](LICENSE.md)

## Author

Adrien Trouillaud, [Codology.net](https://codology.net)
