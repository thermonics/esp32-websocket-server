// server.js
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = new WebSocket.Server({ port: PORT });
console.log('✅ WebSocket server running on port ${PORT}');

server.on('connection', (socket) => {
  console.log('🟢 Client connected');
  socket.send('Hello from Railway WebSocket!');

  socket.on('message', (msg) => {
    console.log('📩 Message:', msg.toString());
    socket.send('Echo: ' + msg);
  });

  socket.on('close', () => console.log('🔴 Client disconnected'));
});
