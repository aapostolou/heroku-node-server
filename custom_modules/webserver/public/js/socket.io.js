/* Seed */
socket.on("seed", ({ seed }) => {
  if (localStorage.getItem("seed") != seed) {
    localStorage.setItem("seed", seed);
    window.location.reload();
  }
});
