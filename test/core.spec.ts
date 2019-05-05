import {
  List, Map, fromJS,
} from 'immutable';
import { expect } from 'chai';

import {
  setEntries, next, vote,
} from '../src/core';


describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state: Map<string, List<string>> = Map();
      const entries = List.of('Bleach', 'Fairy Tail');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Bleach', 'Fairy Tail'),
      }));
    });

    it('converts to immutable', () => {
      const state: Map<string, List<string>> = Map();
      const entries = ['Bleach', 'Fairy Tail'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Bleach', 'Fairy Tail'),
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Bleach', 'Fairy Tail', 'One Piece'),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          round: 1,
          pair: List.of('Bleach', 'Fairy Tail'),
        }),
        entries: List.of('One Piece'),
      }));
    });
    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Bleach', 'Fairy Tail'),
          tally: Map({
            Bleach: 4,
            'Fairy Tail': 2,
          }),
        }),
        entries: List.of('Bleach', 'Fairy Tail', 'One Piece'),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('Bleach', 'Fairy Tail'),
        }),
        entries: List.of('One Piece', 'Bleach'),
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Bleach', 'Fairy Tail'),
          tally: Map({
            Bleach: 3,
            'Fairy Tail': 3,
          }),
        }),
        entries: List.of('Bleach', 'Fairy Tail', 'One Piece'),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('Bleach', 'Fairy Tail'),
        }),
        entries: List.of('One Piece', 'Bleach', 'Fairy Tail'),
      }));
    });
    it('marks winner when just one entry left', () => {
      expect(
        next(Map({
          vote: Map({
            round: 1,
            pair: List.of('Bleach', 'Fairy Tail'),
            tally: Map({
              Bleach: 4,
              'Fairy Tail': 2,
            }),
          }),
          entries: List(),
        })),
      ).to.equal(
        Map({
          winner: 'Bleach',
        }),
      );
    });
  });
  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        round: 1,
        pair: List.of('Bleach', 'Fairy Tail'),
      });
      const nextState = vote(state, 'Bleach');
      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Bleach', 'Fairy Tail'),
        tally: Map({
          Bleach: 1,
        }),
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        round: 1,
        pair: List.of('Bleach', 'Fairy Tail'),
        tally: Map({
          Bleach: 3,
          'Fairy Tail': 2,
        }),
      });
      const nextState = vote(state, 'Bleach');
      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Bleach', 'Fairy Tail'),
        tally: Map({
          Bleach: 4,
          'Fairy Tail': 2,
        }),
      }));
    });
    it('ignores the vote if for an invalid entry', () => {
      expect(
        vote(Map({
          pair: List.of('Bleach', 'Faity Tail'),
        }), 'One Piece'),
      ).to.equal(
        Map({
          pair: List.of('Bleach', 'Faity Tail'),
        }),
      );
    });
  });
});
