export default ({
  initialState = {},
  addActionTypes = [],
  removeActionTypes = [],
  toggleActionTypes = [],
  keyGetter = action => action.payload,
  resetActionTypes = [],
  emptyActionTypes = [],
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (addActionTypes.includes(type)) {
    return add(state, keyGetter(action));
  } else if (removeActionTypes.includes(type)) {
    return remove(state, keyGetter(action));
  } else if (toggleActionTypes.includes(type)) {
    return toggle(state, keyGetter(action));
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else if (emptyActionTypes.includes(type)) {
    return {};
  } else {
    return state;
  }
};

const add = (obj, key) => ({...obj, [key]: true});

const remove = (obj, key) => {
  const x = {...obj};
  delete x[key];
  return x;
};

const toggle = (obj, key) => obj[key] ? remove(obj, key) : add(obj, key);
