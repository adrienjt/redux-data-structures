export default ({
  initialState = false,
  trueActionTypes = [],
  additionalConditionToTrue = () => true,
  falseActionTypes = [],
  additionalConditionToFalse = () => true,
  toggleActionTypes = [],
  resetActionTypes = [],
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (trueActionTypes.includes(type) && additionalConditionToTrue(action)) {
    return true;
  } else if (falseActionTypes.includes(type) && additionalConditionToFalse(action)) {
    return false;
  } else if (toggleActionTypes.includes(type)) {
    return !state;
  } else if (resetActionTypes.includes(type)) {
    return initialState;
  } else {
    return state;
  }
};
