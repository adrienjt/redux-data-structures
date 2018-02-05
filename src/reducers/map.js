const empty = {
  byId: {},
  allIds: [],
};

export default ({
  initialState = empty,
  addActionTypes = [],
  addManyActionTypes = [],
  changeActionTypes = [],
  changeManyActionTypes = [],
  removeActionTypes = [],
  removeManyActionTypes = [],
  keyGetter = action => action.payload.id,
  itemGetter = action => ({...action.payload}),
  itemModifier = (item, action) => ({...item, ...action.payload}),
  addChangeItemsGetter = action => action.payload.reduce((result, item) => ({
    ...result,
    [item.id]: item
  }), {}),
  itemsModifier = (item, newItem) => ({...item, ...newItem}),
  removeKeysGetter = action => action.payload,
  resetActionTypes = [],
  emptyActionTypes = [],
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (addActionTypes.includes(type)) {
    return add(state, action, keyGetter, itemGetter);
  } else if (addManyActionTypes.includes(type)) {
    return addMany(state, action, addChangeItemsGetter);
  } else if (changeActionTypes.includes(type)) {
    return change(state, action, keyGetter, itemModifier);
  } else if (changeManyActionTypes.includes(type)) {
    return changeMany(state, action, addChangeItemsGetter, itemsModifier);
  } else if (removeActionTypes.includes(type)) {
    return remove(state, action, keyGetter);
  } else if (removeManyActionTypes.includes(type)) {
    return removeMany(state, action, removeKeysGetter);
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else if (emptyActionTypes.includes(type)) {
    return empty;
  } else {
    return state;
  }
};

const addItem = (state, key, item) => {
  return {
    byId: {...state.byId, [key]: item},
    allIds: state.allIds.includes(key) ? state.allIds : state.allIds.concat(key),
  };
};

const add = (state, action, keyGetter, itemGetter) => {
  return addItem(state, keyGetter(action), itemGetter(action));
};

const addMany = (state, action, addChangeItemsGetter) => {
  const items = addChangeItemsGetter(action)
  return Object.keys(items).reduce((result, key) => {
    return addItem(result, key, items[key]);
  }, state);
};

const change = (state, action, keyGetter, itemModifier) => {
  const key = keyGetter(action);
  const item = state.byId[key];
  return item === undefined ? state : {
    byId: {...state.byId, [key]: itemModifier(item, action)},
    allIds: state.allIds,
  };
};

const changeMany = (state, action, addChangeItemsGetter, itemsModifier) => {
  const items = addChangeItemsGetter(action);
  return Object.keys(items).reduce((result, key) => {
    const item = result.byId[key];
    return item === undefined ? result : {
      byId: {...result.byId, [key]: itemsModifier(item, items[key])},
      allIds: result.allIds,
    };
  }, state);
};

const removeItem = (state, key) => {
  const item = state.byId[key];
  if (item === undefined) return state;
  const byId = {...state.byId};
  delete byId[key];
  return {
    byId,
    allIds: state.allIds.filter(x => x !== key),
  };
};

const remove = (state, action, keyGetter) => {
  return removeItem(state, keyGetter(action));
};

const removeMany = (state, action, removeKeysGetter) => {
  return removeKeysGetter(action).reduce(removeItem, state);
};
