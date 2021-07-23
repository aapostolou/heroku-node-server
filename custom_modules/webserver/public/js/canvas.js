function CANVAS() {
  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");

  /* Init */
  this.resize();
  window.addEventListener("resize", () => {
    this.resize();
  });
  document.body.append(this.canvas);

  this.handleMouse();

  /* constructor */
  this.position = {
    x: 0,
    y: 0
  };
  this.tile = {
    size: 32
  };
}

CANVAS.prototype.resize = function () {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;

  this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
};

CANVAS.prototype.grid = function () {
  const { canvas, ctx, position, tile } = this;

  for (
    let i = -Math.ceil(canvas.width / 2 / tile.size) - 1;
    i < Math.ceil(canvas.width / 2 / tile.size) + 1;
    i++
  ) {
    for (
      let j = -Math.ceil(canvas.height / tile.size) - 1;
      j < Math.ceil(canvas.height / 2 / tile.size) + 1;
      j++
    ) {
      ctx.strokeRect(
        i * tile.size - tile.size / 2 + (tile.size - (position.x % tile.size)),
        j * tile.size - tile.size / 2 + (tile.size - (position.y % tile.size)),
        tile.size,
        tile.size
      );
    }
  }
};

CANVAS.prototype.handleMouse = function () {
  this.mouse = {
    canMove: false,
    down: false
  };

  window.addEventListener("keydown", (e) => {
    if (["AltLeft", "AltRight"].indexOf(e.code) !== -1) {
      this.mouse.canMove = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (["AltLeft", "AltRight"].indexOf(e.code) !== -1) {
      this.mouse.canMove = false;
    }
  });

  this.canvas.addEventListener("mousedown", (e) => {
    this.mouse = {
      ...this.mouse,
      down: true,
      start: {
        x: e.clientX,
        y: e.clientY
      },
      before: {
        ...this.position
      }
    };
  });
  this.canvas.addEventListener("mouseup", (e) => {
    this.mouse.down = false;
  });

  this.canvas.addEventListener("mousemove", (e) => {
    if (this.mouse.down && this.mouse.canMove) {
      this.position.x = this.mouse.before.x + this.mouse.start.x - e.clientX;
      this.position.y = this.mouse.before.y + this.mouse.start.y - e.clientY;
    }
  });
};

CANVAS.prototype.draw = function () {
  const { canvas, ctx } = this;

  ctx.clearRect(
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  this.grid();
};
