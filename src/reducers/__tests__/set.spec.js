import set from '../set';

import * as types from '../testActionTypes';

const key1 = 'key1';

describe('set', () => {
  it('add with default getter', () => {
    expect(
      set({
        addActionTypes: [types.ACTION_TYPE_1],
      })({}, {
        type: types.ACTION_TYPE_1,
        payload: {id: key1},
      })
    ).toEqual({[key1]: true});
  });

  it('remove with default getter', () => {
    expect(
      set({
        removeActionTypes: [types.ACTION_TYPE_1],
      })({[key1]: true}, {
        type: types.ACTION_TYPE_1,
        payload: {id: key1},
      })
    ).toEqual({});
  });
});