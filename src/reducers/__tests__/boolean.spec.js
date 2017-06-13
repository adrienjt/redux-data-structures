import boolean from '../boolean';

import * as types from '../testActionTypes';

describe('boolean', () => {
  it('set to true', () => {
    expect(
      boolean({
        trueActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {type: types.ACTION_TYPE_1})
    ).toEqual(true);
  });

  it('set to false', () => {
    expect(
      boolean({
        falseActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {type: types.ACTION_TYPE_1})
    ).toEqual(false);
  });
});