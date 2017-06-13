export default ({
  initialState = {},
  toggleActionTypes = [],
  keyGetter = action => action.payload.id,
  resetActionTypes = [],
  postProcessor = x => x,
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (toggleActionTypes.includes(type)) {
    return postProcessor(toggle(state, keyGetter(action)));
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else {
    return state;
  }
};

const toggle = (obj, key) => {
  const x = {...obj};
  if (x[key]) {
    delete x[key];
  } else {
    x[key] = true;
  }
  return x;
};
