export default ({
  initialState = false,
  toggleActionTypes = [],
  resetActionTypes = [],
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (toggleActionTypes.includes(type)) {
    return !state;
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else {
    return state;
  }
};
