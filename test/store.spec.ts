import { expect } from 'chai';
import {
  Map, fromJS,
} from 'immutable';

import makeStore from '../src/store';


describe('store', () => {
  it('хранилизе сконфигурировано с помощью правильного преобразователя', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Bleach', 'Fairy Tail'],
    });

    expect(store.getState()).to.equal(fromJS({
      entries: ['Bleach', 'Fairy Tail'],
      initialEntries: ['Bleach', 'Fairy Tail'],
    }));
  });
});
