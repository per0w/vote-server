import { Map, fromJS } from 'immutable';

import makeStore from '../src/store';

describe('store', () => {
    it('storage is configured using the correct reducer', () => {
        const store = makeStore();
        expect(store.getState()).toEqual(Map());

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Bleach', 'Fairy Tail'],
        });

        expect(store.getState()).toEqual(
            fromJS({
                entries: ['Bleach', 'Fairy Tail'],
                initialEntries: ['Bleach', 'Fairy Tail'],
            }),
        );
    });
});
