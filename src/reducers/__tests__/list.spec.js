import list from '../list';

const ACTION_TYPE_1 = 'ACTION_TYPE_1';

const payload1 = 'payload1';
const payload2 = 'payload2';

describe('list', () => {
  it('enqueue first', () => {
    expect(
      list({
        enqueueActionTypes: [ACTION_TYPE_1],
      })(undefined, {
        type: ACTION_TYPE_1,
        payload: payload1,
      })
    ).toEqual([payload1]);
  });

  it('enqueue second', () => {
    expect(
      list({
        enqueueActionTypes: [ACTION_TYPE_1],
      })([payload1], {
        type: ACTION_TYPE_1,
        payload: payload2,
      })
    ).toEqual([payload1, payload2]);
  });

  it('dequeue first', () => {
    expect(
      list({
        dequeueActionTypes: [ACTION_TYPE_1],
      })([payload1, payload2], {
        type: ACTION_TYPE_1,
      })
    ).toEqual([payload2]);
  });

  it('dequeue second', () => {
    expect(
      list({
        dequeueActionTypes: [ACTION_TYPE_1],
      })([payload2], {
        type: ACTION_TYPE_1,
      })
    ).toEqual([]);
  });

  it('dequeue empty', () => {
    expect(
      list({
        dequeueActionTypes: [ACTION_TYPE_1],
      })([], {
        type: ACTION_TYPE_1,
      })
    ).toEqual([]);
  });

  it('ignore', () => {
    expect(
      list({
      })([payload1], {
        type: ACTION_TYPE_1,
      })
    ).toEqual([payload1]);
  });
});