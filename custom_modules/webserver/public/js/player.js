function PLAYER() {
  this.position = {
    x: 0,
    y: 0
  };
}
PLAYER.prototype.draw = function (canvas) {
  const { ctx } = canvas;

  ctx.save();

  ctx.fillStyle = "white";
  ctx.fillRect(
    this.position.x - 8 - canvas.position.x,
    this.position.y - 8 - canvas.position.y,
    16,
    16
  );

  ctx.restore();
};
