import counter from '../counter';

import * as types from '../testActionTypes';

describe('counter', () => {
  it('increment', () => {
    expect(
      counter({
        incrementActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {type: types.ACTION_TYPE_1})
    ).toEqual(1);
  });

  it('decrement', () => {
    expect(
      counter({
        decrementActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {type: types.ACTION_TYPE_1})
    ).toEqual(-1);
  });

  it('reset', () => {
    expect(
      counter({
        resetActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {type: types.ACTION_TYPE_1})
    ).toEqual(0);
  });
});