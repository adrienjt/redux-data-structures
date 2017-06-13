import queue from '../queue';

import * as types from '../testActionTypes';

const payload1 = 'payload1';
const payload2 = 'payload2';

describe('queue', () => {
  it('enqueue first', () => {
    expect(
      queue({
        enqueueActionTypes: [types.ACTION_TYPE_1],
      })(undefined, {
        type: types.ACTION_TYPE_1,
        payload: payload1,
      })
    ).toEqual([payload1]);
  });

  it('enqueue second', () => {
    expect(
      queue({
        enqueueActionTypes: [types.ACTION_TYPE_1],
      })([payload1], {
        type: types.ACTION_TYPE_1,
        payload: payload2,
      })
    ).toEqual([payload1, payload2]);
  });

  it('dequeue first', () => {
    expect(
      queue({
        dequeueActionTypes: [types.ACTION_TYPE_1],
      })([payload1, payload2], {
        type: types.ACTION_TYPE_1,
      })
    ).toEqual([payload2]);
  });

  it('dequeue second', () => {
    expect(
      queue({
        dequeueActionTypes: [types.ACTION_TYPE_1],
      })([payload2], {
        type: types.ACTION_TYPE_1,
      })
    ).toEqual([]);
  });

  it('dequeue empty', () => {
    expect(
      queue({
        dequeueActionTypes: [types.ACTION_TYPE_1],
      })([], {
        type: types.ACTION_TYPE_1,
      })
    ).toEqual([]);
  });

  it('ignore', () => {
    expect(
      queue({
      })([payload1], {
        type: types.ACTION_TYPE_1,
      })
    ).toEqual([payload1]);
  });
});