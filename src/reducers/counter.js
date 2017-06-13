export default ({
  initialState = 0,
  incrementActionTypes = [],
  increment = () => 1,
  max,
  decrementActionTypes = [],
  decrement = () => 1,
  min,
  resetActionTypes = [],
}) =>  (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (incrementActionTypes.includes(type)) {
    const m = max && max(action);
    const x = state + increment(action);
    return (m || m === 0) ? Math.min(x, m) : x;
  } else if (decrementActionTypes.includes(type)) {
    const n = min && min(action);
    const y = state - decrement(action);
    return (n || n === 0) ? Math.max(y, n) : y;
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else {
    return state;
  }
};
