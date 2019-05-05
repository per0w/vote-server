import {
  List, Map, fromJS,
} from 'immutable';
import { expect } from 'chai';

import {
  setEntries, next, vote,
} from '../src/core';


describe('application logic', () => {
  describe('setEntries', () => {
    it('Добавляет записи к состоянию', () => {
      const state: Map<string, List<string>> = Map();
      const entries = List.of('Bleach', 'Fairy Tail');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Bleach', 'Fairy Tail'),
      }));
    });

    it('Преобразует в immutable', () => {
      const state: Map<string, List<string>> = Map();
      const entries = ['Bleach', 'Fairy Tail'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Bleach', 'Fairy Tail'),
      }));
    });
  });

  describe('next', () => {
    it('Берёт для голосования следующие две записи', () => {
      const state = Map({
        entries: List.of('Bleach', 'Fairy Tail', 'One Piece'),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Bleach', 'Fairy Tail'),
        }),
        entries: List.of('One Piece'),
      }));
    });
    it('помещает победителя текущего голосования в конец списка записей', () => {
      const state = Map({
        vote: Map({
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
          pair: List.of('Bleach', 'Fairy Tail'),
        }),
        entries: List.of('One Piece', 'Bleach'),
      }));
    });

    it('в случае ничьей помещает обе записи в конец списка', () => {
      const state = Map({
        vote: Map({
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
          pair: List.of('Bleach', 'Fairy Tail'),
        }),
        entries: List.of('One Piece', 'Bleach', 'Fairy Tail'),
      }));
    });
  });
  describe('vote', () => {
    it('создаёт результат голосования для выбранной записи', () => {
      const state = Map({
        pair: List.of('Bleach', 'Fairy Tail'),
      });
      const nextState = vote(state, 'Bleach');
      expect(nextState).to.equal(Map({
        pair: List.of('Bleach', 'Fairy Tail'),
        tally: Map({
          Bleach: 1,
        }),
      }));
    });

    it('добавляет в уже имеющийся результат для выбранной записи', () => {
      const state = Map({
        pair: List.of('Bleach', 'Fairy Tail'),
        tally: Map({
          Bleach: 3,
          'Fairy Tail': 2,
        }),
      });
      const nextState = vote(state, 'Bleach');
      expect(nextState).to.equal(Map({
        pair: List.of('Bleach', 'Fairy Tail'),
        tally: Map({
          Bleach: 4,
          'Fairy Tail': 2,
        }),
      }));
    });
    it('когда остается лишь одна запись, помечает ее как победителя', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Bleach', 'Faity Tail'),
          tally: Map({
            Bleach: 4,
            'Fairy Tail': 2,
          }),
        }),
        entries: List(),
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        winner: 'Bleach',
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
