import {
  List, Map,
} from 'immutable';


export const setEntries = (state: Map<string, List<string>>, entries: List<string> | string[]) => state.set('entries', List(entries));

const getWinners = (vote?: Map<string, List<string>>) => {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes) return [a];
  if (aVotes < bVotes) return [b];
  return [a, b];
};

export const next = (state: Map<string, any>) => {
  const entries: List<string> = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  }
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2),
  });
};

export const vote = (voteState: Map<string, any>, entry: string) => voteState.updateIn(
  ['tally', entry],
  0,
  tally => tally + 1,
);

export const INITIAL_STATE = Map({});
