import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Serve your dashboard (index.html)
app.use(express.static("."));

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("From ESP32:", msg.toString());
    // Send data to all connected web clients
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(msg.toString());
    });
  });

  ws.on("close", () => console.log("Client disconnected"));
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + (process.env.PORT || 3000));
});
