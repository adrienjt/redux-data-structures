# Redux Data Structures

## Introduction

Redux Data Structures is a library of higher-order functions with the following signature:
```
{ ...options } => (state, action) => state
```
We call them _reducer makers_.

Reducer makers help create common reducers like counters, maps, lists (queues, stacks), sets, etc. We found that most application states can be built by combining a handful of these standardized building blocks.

Redux Data Structures was developed for Redux, but does not depend on it. It can actually be used with any reactive state container, even a custom one; Redux Data Structures doesn't have any dependency.

## Getting Started

```
npm install --save redux-data-structures
```

Here's an example from the [Redux README](https://github.com/reactjs/redux), rewritten with Redux Data Structures:

```
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

```
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
// 5
store.dispatch({ type: 'KICK', value: 7 });
// 0
store.dispatch({ type: 'INSERT_COIN' });
// 10
```

## Combining Data Structures

Let's build a classic todo app with Redux Data Structures:

```
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
```

That's all for the store! We've relied heavily on the reducer makers' default options, which presume that:
1. actions adhere to the [Flux Action Standard](https://github.com/acdlite/flux-standard-action) (actions are plain Javascript object with whose format is `{type, payload}`),
1. and Todos are identified by an `id` property, used as a key in the `todos` map and the `completetedTodos` set.

Now let's subscribe to the store and dispatch a few actions:

```
store.subscribe(() => { console.log(store.getState()); });

store.dispatch({
  type: 'ADD_TODO',
  payload: {
    id: 0,
    text: 'Go fishing',
  },
});
// {
//   todos: {
//     byId: {
//       0: {
//         id: 0,
//         text: 'Go fishing',
//       },
//     },
//     allIds: [0],
//   },
//   completedTodos: {},
//   visibilityFilter: 'SHOW_ALL',
// }
```

Notice that `todos` is [normalized, for the reasons explained in the Redux documentation](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html).

```
store.dispatch({
  type: 'TOGGLE_TODO',
  payload: { id: 0 },
});
// {
//   todos: {
//     byId: {
//       0: {
//         id: 0,
//         text: 'Go fishing',
//       },
//     },
//     allIds: [0],
//   },
//   completedTodos: { 0 },
//   visibilityFilter: 'SHOW_ALL',
// }
```

Compared to the original Redux Todo example, we separate the Todo items (id, text) from their completion state. If needed, they could be combined with a [selector](http://redux.js.org/docs/recipes/ComputingDerivedData.html).

```
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  payload: { filter: 'SHOW_COMPLETED' },
});
// {
//   todos: {
//     byId: {
//       0: {
//         id: 0,
//         text: 'Go fishing',
//       },
//     },
//     allIds: [0],
//   },
//   completedTodos: { 0 },
//   visibilityFilter: 'SHOW_COMPLETED',
// }
store.dispatch({
  type: 'REMOVE_TODO',
  payload: { id: 0 },
});
// {
//   todos: {
//     byId: {},
//     allIds: [],
//   },
//   completedTodos: {},
//   visibilityFilter: 'SHOW_COMPLETED',
// }
```

The `REMOVE_TODO` action is reduced both by the `todos` map and the `completedTodos` set.

## Data Structures

So far, we've implemented the following data structures (corresponding action types are indicated in parentheses):

- Boolean (set to true, set to false, toggle)
- Counter (increment, decrement)
- List (queue or stack: enqueue, dequeue, push, pop)
- Map (add, remove, change)
- Set (add, remove, toggle)
- Value (set)

All data structures can be reset to their initial state, and, if applicable (for lists, maps, and sets), emptied.

## API

Each reducer maker is a higher-order function taking in a single `options` object argument, and returning a reducer (signature: `(state, action) => state`).

For each reducer maker, we describe below how the `options` object is destructured, its default property values, and how some specific properties are used.

Defaults can--and in a lot of cases __should__--be overridden.

Each category of actions, e.g., `decrementActionTypes`, is an array of action types (i.e., strings), meaning that several action types can have the same result (cf. life points example above).

### Boolean

```
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

```
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

```
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

```
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

A list can be used as a queue or stack. `enqueueActionTypes` and `pushActionTypes` add items to the list, using the `itemGetter`, whose default considers the [Flux Action Standard](https://github.com/acdlite/flux-standard-action) `payload` as the item to add.

### Map

```
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

`map` uses the [normalized state shape recommended by Redux](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html), as you can see from the `initialState`. The default `keyGetter` assumes that the action payload has an `id` property. The default `itemModifier` overwrites the item's properties (but does not delete the ones that have disappeared in the new action payload).

### Set

```
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

In Redux Data Structures, a set's state is a plain Javascript object. If and only if `key` is in the set, `key` is a property of `state` whose value is `true`. Example:
```
{
  [key]: true
}
```
When a key is removed from the set, the corresponding property is deleted from the state object:
```
{}
```

### Value

```
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

The code is written in modern Javascript, transpiled with Babel, and using Jest for tests. Pull requests are welcome.

## License

[MIT](LICENSE.md)

## Author

Adrien Trouillaud, [Codology.net](https://codology.net)
