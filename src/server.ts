import Server from 'socket.io';


export default () => {
  const io = Server().attach(8090);
};
