import value from '../value';

import * as types from '../testActionTypes';

const value1 = 'value1';
const value2 = 'value2';

describe('value', () => {
  it('set with default getter', () => {
    expect(
      value({
        setActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {
        type: types.ACTION_TYPE_1,
        payload: value1,
      })
    ).toEqual(value1);
  });

  it('reset', () => {
    expect(
      value({
        initialState: value1,
        resetActionTypes: [types.ACTION_TYPE_1],
      })(value2, {type: types.ACTION_TYPE_1})
    ).toEqual(value1);
  });
});