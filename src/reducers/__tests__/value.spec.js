import value from '../value';

const ACTION_TYPE_1 = 'ACTION_TYPE_1';

const value1 = 'value1';
const value2 = 'value2';

describe('value', () => {
  it('set with default getter', () => {
    expect(
      value({
        setActionTypes: [ACTION_TYPE_1],
      })(undefined, {
        type: ACTION_TYPE_1,
        payload: value1,
      })
    ).toEqual(value1);
  });

  it('reset', () => {
    expect(
      value({
        initialState: value1,
        resetActionTypes: [ACTION_TYPE_1],
      })(value2, {type: ACTION_TYPE_1})
    ).toEqual(value1);
  });
});