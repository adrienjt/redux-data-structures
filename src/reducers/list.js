export default ({
  initialState = [],
  enqueueActionTypes = [],
  dequeueActionTypes = [],
  pushActionTypes = [],
  popActionTypes = [],
  itemGetter = action => action.payload,
  resetActionTypes = [],
  emptyActionTypes = [],
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (enqueueActionTypes.includes(type) || pushActionTypes.includes(type)) {
    return state.concat(itemGetter(action));
  } else if (dequeueActionTypes.includes(type)) {
    return state.slice(1);
  } else if (popActionTypes.includes(type)) {
    return state.slice(0, -1);
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else if (emptyActionTypes.includes(type)) {
    return [];
  } else {
    return state;
  }
};
