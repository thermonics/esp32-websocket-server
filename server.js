import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Create WebSocket server on top of HTTP
const wss = new WebSocketServer({ server });

// Serve your frontend files (e.g., index.html)
app.use(express.static(path.join(__dirname, "public"))); // make a folder named 'public'

// WebSocket events
wss.on("connection", (ws) => {
  console.log("Client connected ✅");

  ws.on("message", (msg) => {
    console.log("From ESP32:", msg.toString());
    // Broadcast to all connected clients
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(msg.toString());
    });
  });

  ws.on("close", () => console.log("Client disconnected ❌"));
});

// Railway automatically assigns a port via process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
