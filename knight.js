const MAX_X = 7;
const MAX_Y = 7;

class Position {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  moves() {
    const destinations = [];
    let xDirs = [-1, 1];
    let yDirs = [-1, 1];
    let offsets = [
      [1, 2],
      [2, 1],
    ];

    for (let xDir of xDirs) {
      for (let yDir of yDirs) {
        for (let [xOffset, yOffset] of offsets) {
          let xDestination = this.x + xOffset * xDir;
          if (xDestination < 0 || xDestination > MAX_X) {
            continue;
          }
          let yDestination = this.y + yOffset * yDir;
          if (yDestination < 0 || yDestination > MAX_Y) {
            continue;
          }
          let destination = new Position(xDestination, yDestination);
          destinations.push(destination);
        }
      }
    }
    return destinations;
  }

  equals(other) {
    return this.x === other.x && this.y === other.y;
  }
}

function knightMoves(start, end) {
  let startPos = new Position(...start);
  let endPos = new Position(...end);
  let visited = [startPos];
  let q = [{ pos: startPos, path: [startPos] }];
  while (q.length > 0) {
    let { pos, path } = q.shift();
    if (pos.equals(endPos)) {
      return path.map((pos) => [pos.x, pos.y]);
    }
    for (let reachable of pos.moves()) {
      if (visited.some((p) => p.equals(reachable))) {
        continue;
      }
      q.push({ pos: reachable, path: path.concat(reachable) });
      visited.push(reachable);
    }
  }
}

export { knightMoves };
