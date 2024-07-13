import express from 'express';
import http from 'http';
import cors from 'cors';
import {Server} from 'socket.io';

const app = express();
app.use(cors()); // CORS 설정 추가

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  console.log('a user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });

  socket.on('send_message', data => {
    console.log('send_message Event : ', data);
    const {message, targetSocketId} = data;
    io.to(targetSocketId).emit('receive_message', data);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
