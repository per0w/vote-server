import makeStore from './store';
import startServer from './server';

export const store = makeStore();
startServer(store);

store.dispatch({
    type: 'SET_ENTRIES',
    // eslint-disable-next-line global-require
    entries: require('../mocks/entries.json')
});
store.dispatch({ type: 'NEXT' });

// eslint-disable-next-line no-console
// console.log(store.getState());
