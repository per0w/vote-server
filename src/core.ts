import {List, Map} from 'immutable';

export const setEntries = (state : Map<string, List<string>>, entries: List<string> | string[]) => state.set('entries', List(entries));

export const next = (state : Map<string, List<string>>) => {
    const entries = state.get('entries') || List();
    return state.merge({
        vote: Map({pair: entries.take(2)}),
        entries: entries.skip(2)
    });
};

export const vote = (state: Map<any, any>, entry: String) => state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
);
