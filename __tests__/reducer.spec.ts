import { Map, fromJS } from 'immutable';

import reducer from 'reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initState = Map({});
        const action = {
            type: 'SET_ENTRIES',
            entries: ['Fairy Tail'],
        };
        const nextState = reducer(initState, action);

        expect(nextState).toEqual(
            fromJS({
                entries: ['Fairy Tail'],
                initialEntries: ['Fairy Tail'],
            }),
        );
    });
    it('handles NEXT', () => {
        const initState = fromJS({
            entries: ['Fairy Tail', 'One Piece'],
        });
        const action = { type: 'NEXT' };
        const nextState = reducer(initState, action);

        expect(nextState).toEqual(
            fromJS({
                vote: {
                    round: 1,
                    pair: ['Fairy Tail', 'One Piece'],
                },
                entries: [],
            }),
        );
    });
    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                round: 1,
                pair: ['Fairy Tail', 'One Piece'],
            },
            entries: [],
        });
        const action = {
            type: 'VOTE',
            entry: 'Fairy Tail',
        };
        const nextState = reducer(initialState, action);

        expect(nextState).toEqual(
            fromJS({
                vote: {
                    round: 1,
                    pair: ['Fairy Tail', 'One Piece'],
                    tally: { 'Fairy Tail': 1 },
                },
                entries: [],
            }),
        );
    });
    it('has an initial state', () => {
        const action = {
            type: 'SET_ENTRIES',
            entries: ['Bleach'],
        };
        const nextState = reducer(undefined, action);
        expect(nextState).toEqual(
            fromJS({
                entries: ['Bleach'],
                initialEntries: ['Bleach'],
            }),
        );
    });
    it('can be used with reduce', () => {
        const actions = [
            {
                type: 'SET_ENTRIES',
                entries: ['Fairy Tail', 'One Piece'],
            },
            { type: 'NEXT' },
            {
                type: 'VOTE',
                entry: 'Fairy Tail',
            },
            {
                type: 'VOTE',
                entry: 'One Piece',
            },
            {
                type: 'VOTE',
                entry: 'Fairy Tail',
            },
            { type: 'NEXT' },
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(finalState).toEqual(
            fromJS({
                winner: 'Fairy Tail',
                initialEntries: ['Fairy Tail', 'One Piece'],
            }),
        );
    });
});
