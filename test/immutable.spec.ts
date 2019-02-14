import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

    describe('a number', () => {

        const increment = (currentState: number) => {
            return currentState + 1;
        };

        it('is immutable', () => {
            let state = 42;
            let nextState = increment(state);

            expect(nextState).to.equal(43);
            expect(state).to.equal(42);
        });

    });
    describe('A List', () => {

        const addMovie = (currentState: any[] | List<string>, movie: string) => {
            return currentState.push(movie);
        };

        it('is immutable', () => {
            let state = List.of('Bleach', 'Fairy Tail');
            let nextState = addMovie(state, 'One Piece');

            expect(nextState).to.equal(List.of(
                'Bleach',
                'Fairy Tail',
                'One Piece'
            ));
            expect(state).to.equal(List.of(
                'Bleach',
                'Fairy Tail'
            ));
        });

    });

    describe('a tree', () => {

        const addMovie = (currentState: Map<string, List<string>>, movie: string) => currentState.update(
            'movies',
            movies => movies.push(movie)
        );

        it('is immutable', () => {
            let state = Map({
                movies: List.of('Bleach', 'Fairy Tail')
            });
            let nextState = addMovie(state, 'One Piece');
            expect(nextState).to.equal(Map({
                movies: List.of(
                    'Bleach',
                    'Fairy Tail',
                    'One Piece'
                )
            }));
            expect(state).to.equal(Map({
                movies: List.of(
                    'Bleach',
                    'Fairy Tail'
                )
            }));
        });

    });
});
