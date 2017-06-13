export default ({
  initialState = null,
  setActionTypes = [],
  valueGetter = action => action.payload,
  resetActionTypes = [],
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (setActionTypes.includes(type)) {
    return valueGetter(action);
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else {
    return state;
  }
};
