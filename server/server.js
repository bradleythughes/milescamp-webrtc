const WebSocket = require("ws");

class WebSocketServer extends WebSocket.Server {
  broadcast(ws, message) {
    [...this.clients]
      .filter((client) => client !== ws)
      .filter((client) => client.readyState === WebSocket.OPEN)
      .filter((client) => client.protocol === ws.protocol)
      .forEach((client) => client.send(message));
  }

  start() {
    this.on("connection", (ws, req) => this.onconnection(ws, req));
  }

  onconnection(ws) {
    ws.on("message", (message) => this.onmessage(ws, message));
    ws.on("close", (code, reason) => this.onclose(ws, code, reason));
  }

  onmessage(ws, message) {
    this.broadcast(ws, message);
  }

  onclose(ws, code, reason) {
    const message = JSON.stringify({ type: "close", code, reason });
    this.broadcast(ws, message);
  }
}

const wss = new WebSocketServer({ port: 3030, path: "/" });
wss.start();
