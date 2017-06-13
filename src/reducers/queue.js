export default ({
  initialState = [],
  enqueueActionTypes = [],
  dequeueActionTypes = [],
  itemGetter = action => action.payload,
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (enqueueActionTypes.includes(type)) {
    return state.concat(itemGetter(action));
  } else if (dequeueActionTypes.includes(type)) {
    return state.slice(1);
  } else {
    return state;
  }
};
