export default ({
  initialState = {},
  addActionTypes = [],
  removeActionTypes = [],
  keyGetter = action => action.payload.id,
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (addActionTypes.includes(type)) {
    return {...state, [keyGetter(action)]: true};
  } else if (removeActionTypes.includes(type)) {
    return remove(state, keyGetter(action));
  } else {
    return state;
  }
};

const remove = (obj, key) => {
  const x = {...obj};
  if (x[key]) {
    delete x[key];
  }
  return x;
};
