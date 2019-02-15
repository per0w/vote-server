import {
  List, Map,
} from 'immutable';


export const setEntries = (state: Map<string, List<string>>, entries: List<string> | string[]) => state.set('entries', List(entries));

const getWinners = (vote: { get: (arg0: string) => [any, any], getIn: { (arg0: any[], arg1: number): void, (arg0: any[], arg1: number): void } }) => {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) return [a];
  if (aVotes < bVotes) return [b];
  return [a, b];
};

export const next = (state: Map<any, any>) => {
  const entries = state.get('entries').concat(getWinners(state.get('vote'))) || List();
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2),
  });
};

export const vote = (state: Map<any, any>, entry: string) => state.updateIn(
  ['vote', 'tally', entry],
  0,
  tally => tally + 1,
);
