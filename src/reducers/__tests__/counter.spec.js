import counter from '../counter';

const ACTION_TYPE_1 = 'ACTION_TYPE_1';

describe('counter', () => {
  it('increment', () => {
    expect(
      counter({
        incrementActionTypes: [ACTION_TYPE_1],
      })(undefined, {type: ACTION_TYPE_1})
    ).toEqual(1);
  });

  it('decrement', () => {
    expect(
      counter({
        decrementActionTypes: [ACTION_TYPE_1],
      })(undefined, {type: ACTION_TYPE_1})
    ).toEqual(-1);
  });

  it('reset', () => {
    expect(
      counter({
        resetActionTypes: [ACTION_TYPE_1],
      })(undefined, {type: ACTION_TYPE_1})
    ).toEqual(0);
  });
});