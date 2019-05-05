import { Map } from 'immutable';

import {
  setEntries, next, vote, INITIAL_STATE, restart,
} from './core';


export interface Action {
  type: string,
  entries?: string[],
  entry?: string,
}

export default (state: Map<string, any> = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'RESTART':
      return restart(state);
    case 'VOTE':
      return state.update('vote',
        voteState => vote(voteState, action.entry));
    default:
      return state;
  }
};
