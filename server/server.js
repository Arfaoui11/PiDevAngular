// maybe replace with socket.io
const WebSocket = require("ws").Server;
const { v4: getID } = require("uuid");
const port = process.env.PORT || 2233;

const CLIENTS = new Map();

const ROOMS = new Map();

const wss = new WebSocket({ port });
console.log("ws:// listening on %d", port);

wss.on("connection", (client) => {
  const id = getID();
  client.uid = id;
  CLIENTS.set(id, client);
  const msg = {
    type: "connection",
    message: "Welcome",
    id: id,
  };
  client.send(JSON.stringify(msg));

  client.on("close", () => {
    const leave_id = client.uid;
    const room_id = client.room;
    if (client.room) {
      const thisRoom = ROOMS.get(room_id);
      if (thisRoom.attendees.has(leave_id)) {
        const msg = {
          type: "leave",
          message: "Tschö mit Ö",
          id: client.uid,
        };
        thisRoom.attendees.forEach((c) => {
          if (c !== client) {
            c.send(JSON.stringify(msg));
          }
        });
        thisRoom.attendees.delete(leave_id);
        if (thisRoom.attendees.size === 0) {
          ROOMS.delete(room_id);
        }
      }
    }
    CLIENTS.delete(leave_id);
  });
  client.on("message", (m) => {
    const msg = JSON.parse(m);
    const room = msg.id;
    switch (msg.type) {
      case "connection":
        client.name = msg.message;
        break;
      case "message":
        if (ROOMS.has(room)) {
          const thisRoom = ROOMS.get(room);
          console.log(client.name);
          msg.id = client.name;
          thisRoom.attendees.forEach((c) => {
            c.send(JSON.stringify(msg));
          });
        }
        break;
      case "join":
        client.room = room;
        if (!ROOMS.has(room)) {
          const newroom = {
            name: room,
            host: client,
            attendees: new Map(),
          };
          ROOMS.set(room, newroom);
        }
        const thisRoom = ROOMS.get(room);
        thisRoom.attendees.set(client.uid, client);
        const list = [];
        thisRoom.attendees.forEach((c) => {
          list.push({ name: c.name, id: c.uid });
        });
        const m = { message: list, id: client.uid, type: "list" };
        thisRoom.attendees.forEach((c) => {
          c.send(JSON.stringify(m));
        });
        break;
      case "available":
        if (ROOMS.has(room)) {
          const thisRoom = ROOMS.get(room);
          msg.id = msg.message;
          msg.message = client.name;
          thisRoom.attendees.forEach((c) => {
            console.log("call", c.name);
            if (c !== client) {
              c.send(JSON.stringify(msg));
            }
          });
        }
        break;
    }
  });
});
