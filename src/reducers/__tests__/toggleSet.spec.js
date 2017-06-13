import toggleSet from '../toggleSet';

import * as types from '../testActionTypes';

const key1 = 'key1';
const key2 = 'key2';

describe('toggleSet', () => {
  it('off to on with default getter', () => {
    expect(
      toggleSet({
        toggleActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {
        type: types.ACTION_TYPE_1,
        payload: {id: key1},
      })
    ).toEqual({[key1]: true});
  });

  it('on to off with default getter', () => {
    expect(
      toggleSet({
        toggleActionTypes: [types.ACTION_TYPE_1],
      })({[key1]: true}, {
        type: types.ACTION_TYPE_1,
        payload: {id: key1},
      })
    ).toEqual({});
  });

  it('reset', () => {
    expect(
      toggleSet({
        initialState: {[key1]: true},
        resetActionTypes: [types.ACTION_TYPE_1],
      })({[key2]: true}, {type: types.ACTION_TYPE_1})
    ).toEqual({[key1]: true});
  });
});