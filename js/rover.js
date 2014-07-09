var Rover = {
  init: function (x, y, orientation) {
    this.position = [x, y];
    this.orientation = orientation;
  },
  move: function (commands) {
    for (var i = 0; i < commands.length; i++) {
      var c = commands[i];
      switch (c) {
        case 'f':
          this.moveForward();
        break;
        case 'b':
          this.moveBackward();
        break;
        case 'r':
          this.turnRight();
        break;
        case 'l':
          this.turnLeft();
        break;
        default:
          console.log('Unrecognized command: ' + c);
        break;
      }
    }
  },
  moveForward: function () {
    this.advance('forward');
  },
  moveBackward: function () {
    this.advance('backward');
  },
  advance: function (direction) {
    direction = (direction === 'forward') ? 1 : -1;
    var formerPosition = [
      this.position[0],
      this.position[1]
    ];
    var increment = this.increments[this.orientation];
    this.position = [
      (this.position[0] + increment[0] * direction) % Grid.sizeX,
      (this.position[1] + increment[1] * direction) % Grid.sizeY
    ];
    if (this.position[0] < 0) {
      this.position[0] = Grid.sizeX + this.position[0];
    }
    if (this.position[1] < 0) {
      this.position[1] = Grid.sizeY + this.position[1];
    }
    if (Grid.thereIsObstacle(this.position[0], this.position[1])) {
      this.position = formerPosition;
    }
  },
  turnRight: function () {
    this.turn('right');
  },
  turnLeft: function () {
    this.turn('left')
  },
  turn: function (direction) {
    var currentIndex = this.orientations.indexOf(this.orientation);
    var newIndex = currentIndex + (direction === 'right' ? 1 : -1);
    if (newIndex < 0) {
      newIndex = this.orientations.length + newIndex;
    }
    this.orientation = this.orientations[newIndex];
  },
  orientations: 'nesw'
};
