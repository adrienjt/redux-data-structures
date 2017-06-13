import toggle from '../toggle';

import * as types from '../testActionTypes';

describe('toggle', () => {
  it('off to on', () => {
    expect(
      toggle({
        toggleActionTypes: [types.ACTION_TYPE_1],
      })(false, {
        type: types.ACTION_TYPE_1,
      })
    ).toEqual(true);
  });

  it('on to off', () => {
    expect(
      toggle({
        toggleActionTypes: [types.ACTION_TYPE_1],
      })(true, {
        type: types.ACTION_TYPE_1,
      })
    ).toEqual(false);
  });

  it('reset', () => {
    expect(
      toggle({
        initialState: true,
        resetActionTypes: [types.ACTION_TYPE_1],
      })(false, {type: types.ACTION_TYPE_1})
    ).toEqual(true);
  });
});