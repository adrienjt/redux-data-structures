import map from '../map';

const ACTION_TYPE_1 = 'ACTION_TYPE_1';

const key = 'myId';
const key2 = 'myId2';
const name = 'myName';
const name2 = 'myName2';
const changedName = 'myChangedName';
const changedName2 = 'myChangedName2';

const item = {
  id: key,
  name: name,
};

const item2 = {
  id: key2,
  name: name2,
};

const changedItem = {
  id: key,
  name: changedName,
};

const changedItem2 = {
  id: key2,
  name: changedName2,
};

const map0 = {
  byId: {},
  allIds: [],
};

const map1 = {
  byId: {
    [key]: {...item},
  },
  allIds: [key],
};

const map1Changed = {
  byId: {
    [key]: {...changedItem},
  },
  allIds: [key],
};

const map2 = {
  byId: {
    [key]: {...item},
    [key2]: {...item2},
  },
  allIds: [key, key2],
};

const map2Changed = {
  byId: {
    [key]: {...changedItem},
    [key2]: {...changedItem2},
  },
  allIds: [key, key2],
};

describe('map', () => {
  it('add item', () => {
    expect(
      map({
        addActionTypes: [ACTION_TYPE_1],
      })(undefined, {
        type: ACTION_TYPE_1,
        payload: item,
      })
    ).toEqual(map1);
  });

  it('add many items', () => {
    expect(
      map({
        addManyActionTypes: [ACTION_TYPE_1],
      })(undefined, {
        type: ACTION_TYPE_1,
        payload: [item, item2],
      })
    ).toEqual(map2);
  });

  it('change item', () => {
    expect(
      map({
        changeActionTypes: [ACTION_TYPE_1],
      })(map1, {
        type: ACTION_TYPE_1,
        payload: changedItem,
      })
    ).toEqual(map1Changed);
  });

  it('change many items', () => {
    expect(
      map({
        changeManyActionTypes: [ACTION_TYPE_1],
      })(map2, {
        type: ACTION_TYPE_1,
        payload: [changedItem, changedItem2],
      })
    ).toEqual(map2Changed);
  });

  it('remove item', () => {
    expect(
      map({
        removeActionTypes: [ACTION_TYPE_1],
      })(map1, {
        type: ACTION_TYPE_1,
        payload: {id: key}
      })
    ).toEqual(map0);
  });

  it('remove many items', () => {
    expect(
      map({
        removeManyActionTypes: [ACTION_TYPE_1],
      })(map2, {
        type: ACTION_TYPE_1,
        payload: [key, key2],
      })
    ).toEqual(map0);
  });
});
