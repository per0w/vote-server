import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
startServer(store);

store.dispatch({
    type: 'SET_ENTRIES',
    // eslint-disable-next-line global-require
    entries: require('./entries.json'),
});
store.dispatch({ type: 'NEXT' });

// eslint-disable-next-line no-console
// console.log(store.getState());
