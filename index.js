import {Server} from 'socket.io';

const io = new Server();

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`, socket.request.headers);

  socket.on('send_message', data => {
    console.log(123123, data);

    io.emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.listen(3000);
