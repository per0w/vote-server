import { expect } from 'chai';
import {
  List, Map,
} from 'immutable';


describe('immutability', () => {
  describe('a number', () => {
    const increment = (currentState: number) => currentState + 1;

    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });
  describe('A List', () => {
    const addMovie = (currentState: string[] | List<string>, movie: string) => currentState.push(movie);

    it('is immutable', () => {
      const state = List.of('Bleach', 'Fairy Tail');
      const nextState = addMovie(state, 'One Piece');

      expect(nextState).to.equal(List.of(
        'Bleach',
        'Fairy Tail',
        'One Piece',
      ));
      expect(state).to.equal(List.of(
        'Bleach',
        'Fairy Tail',
      ));
    });
  });

  describe('a tree', () => {
    const addMovie = (currentState: Map<string, List<string>>, movie: string) => currentState.update(
      'movies',
      movies => movies.push(movie),
    );

    it('is immutable', () => {
      const state = Map({
        movies: List.of('Bleach', 'Fairy Tail'),
      });
      const nextState = addMovie(state, 'One Piece');
      expect(nextState).to.equal(Map({
        movies: List.of(
          'Bleach',
          'Fairy Tail',
          'One Piece',
        ),
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Bleach',
          'Fairy Tail',
        ),
      }));
    });
  });
});
