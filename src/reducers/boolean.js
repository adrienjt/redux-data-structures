export default ({
  initialState = false,
  trueActionTypes = [],
  additionalConditionToTrue = () => true,
  falseActionTypes = [],
  additionalConditionToFalse = () => true,
}) => (
  state = initialState,
  action,
) => {
  const {type} = action;
  if (trueActionTypes.includes(type) && additionalConditionToTrue(action)) {
    return true;
  } else if (falseActionTypes.includes(type) && additionalConditionToFalse(action)) {
    return false;
  } else {
    return state;
  }
};
