const { io } = require("./custom_modules/webserver");

/* Seed */
const seed = Math.round(Math.random() * 10 ** 10);
io.on("connection", (socket) => {
  socket.emit("seed", { seed });
});
