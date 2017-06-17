import set from '../set';

const ACTION_TYPE_1 = 'ACTION_TYPE_1';

const key1 = 'key1';
const key2 = 'key2';

describe('set', () => {
  it('add with default getter', () => {
    expect(
      set({
        addActionTypes: [ACTION_TYPE_1],
      })({}, {
        type: ACTION_TYPE_1,
        payload: key1,
      })
    ).toEqual({[key1]: true});
  });

  it('remove with default getter', () => {
    expect(
      set({
        removeActionTypes: [ACTION_TYPE_1],
      })({[key1]: true}, {
        type: ACTION_TYPE_1,
        payload: key1,
      })
    ).toEqual({});
  });

  it('off to on with default getter', () => {
    expect(
      set({
        toggleActionTypes: [ACTION_TYPE_1],
      })(undefined, {
        type: ACTION_TYPE_1,
        payload: key1,
      })
    ).toEqual({[key1]: true});
  });

  it('on to off with default getter', () => {
    expect(
      set({
        toggleActionTypes: [ACTION_TYPE_1],
      })({[key1]: true}, {
        type: ACTION_TYPE_1,
        payload: key1,
      })
    ).toEqual({});
  });

  it('reset', () => {
    expect(
      set({
        initialState: {[key1]: true},
        resetActionTypes: [ACTION_TYPE_1],
      })({[key2]: true}, {type: ACTION_TYPE_1})
    ).toEqual({[key1]: true});
  });
});