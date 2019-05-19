import Server from 'socket.io';
import Redux from 'redux';

export default (store: Redux.Store) => {
    const io = Server().attach(8090);
    store.subscribe(() => io.emit('state', store.getState().toJS()));

    io.on('connection', socket => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
};
