import boolean from '../boolean';

const ACTION_TYPE_1 = 'ACTION_TYPE_1';

describe('boolean', () => {
  it('set to true', () => {
    expect(
      boolean({
        trueActionTypes: [ACTION_TYPE_1],
      })(undefined, {type: ACTION_TYPE_1})
    ).toEqual(true);
  });

  it('set to false', () => {
    expect(
      boolean({
        falseActionTypes: [ACTION_TYPE_1],
      })(undefined, {type: ACTION_TYPE_1})
    ).toEqual(false);
  });

  it('toggle false to true', () => {
    expect(
      boolean({
        toggleActionTypes: [ACTION_TYPE_1],
      })(false, {
        type: ACTION_TYPE_1,
      })
    ).toEqual(true);
  });

  it('toggle true to false', () => {
    expect(
      boolean({
        toggleActionTypes: [ACTION_TYPE_1],
      })(true, {
        type: ACTION_TYPE_1,
      })
    ).toEqual(false);
  });

  it('reset', () => {
    expect(
      boolean({
        initialState: true,
        resetActionTypes: [ACTION_TYPE_1],
      })(false, {type: ACTION_TYPE_1})
    ).toEqual(true);
  });
});