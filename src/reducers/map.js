const empty = {
  byId: {},
  allIds: [],
};

export default ({
  initialState = empty,
  addActionTypes = [],
  changeActionTypes = [],
  removeActionTypes = [],
  keyGetter = action => action.payload.id,
  itemGetter = action => ({...action.payload}),
  itemModifier = (item, action) => ({...item, ...action.payload}),
  resetActionTypes = [],
  emptyActionTypes = [],
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (addActionTypes.includes(type)) {
    return add(state, action, keyGetter, itemGetter);
  } else if (changeActionTypes.includes(type)) {
    return change(state, action, keyGetter, itemModifier);
  } else if (removeActionTypes.includes(type)) {
    return remove(state, action, keyGetter);
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else if (emptyActionTypes.includes(type)) {
    return empty;
  } else {
    return state;
  }
};

const add = (state, action, keyGetter, itemGetter) => {
  const key = keyGetter(action);
  return {
    byId: {...state.byId, [key]: itemGetter(action)},
    allIds: state.allIds.includes(key) ? state.allIds : state.allIds.concat(key),
  };
};

const change = (state, action, keyGetter, itemModifier) => {
  const key = keyGetter(action);
  const item = state.byId[key];
  return item === undefined ? state : {
    byId: {...state.byId, [key]: itemModifier(item, action)},
    allIds: state.allIds,
  };
};

const remove = (state, action, keyGetter) => {
  const key = keyGetter(action);
  const item = state.byId[key];
  if (item === undefined) return state;
  const byId = {...state.byId};
  delete byId[key];
  return {
    byId,
    allIds: state.allIds.filter(x => x !== key),
  };
};
