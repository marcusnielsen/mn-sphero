var BallHistory = require('./ball-history')

// bluetoothPort example: '/dev/tty.Sphero-GOG-AMP-SPP'.
var Ball = function(bluetoothPort) {
  if(!(this instanceof Ball)) {
    return new Ball(bluetoothPort)
  }

  this._id = bluetoothPort

  if(!bluetoothPort) {
    throw new Error('Arguments not set for Ball.')
  }

  this._position = {
    x: 0,
    y: 0
  }

  this._speed = 0
  this._orientation = 0

  this._history = new BallHistory()
}

Ball.prototype.MAX_SPEED = 100
Ball.prototype.MAX_ORIENTATION = 360

Ball.prototype.id = function () {
  if(arguments.length > 0) {
    throw new Error('Ball#id is not a setter function.')
  }

  return this._id
}

Ball.prototype.orientation = function (orientation) {
  if(!arguments.length) {
    return this._orientation
  }

  this._orientation = Math.floor(orientation % this.MAX_ORIENTATION)
}

Ball.prototype.position = function (position) {
  if(!arguments.length) {
    return this._position
  }

  this.position = {
    x: position.x || this.x,
    y: position.y || this.y
  }
}

Ball.prototype.speed = function (speed) {
  if(!arguments.length) {
    return this._speed;
  }

  this._speed = Math.floor(speed)

  if(!this.isSpeedValid()) {
    throw new RangeError()
  }
}

Ball.prototype.isSpeedValid = function () {
  return this._speed >= 0 && this._speed <= this.MAX_SPEED
}

Ball.prototype.execute = function (milliseconds) {
  this._history.add(this.copy(), milliseconds)

  // TODO: Fire off event.
}

Ball.prototype.reverse = function () {
  var historyItem = this._history.undo()

  if(!historyItem) {
    return false
  }

  var ballCopy = historyItem.ball

  // TODO: Don't bypass the setter function when bypassing the history.
  ballCopy._orientation = (ballCopy._orientation + 180) % 360
  this.copy(ballCopy)

  return true
}

Ball.prototype.toString = function () {
  var s = ''

  s += 'Speed: ' + this.speed()
  s += ', Orientation: ' + this.orientation()

  return s
}

Ball.prototype.copy = function (ballCopy) {
  var from = arguments.length ? ballCopy : this
  var to = arguments.length ? this : new Ball(this.id())

  to._speed = from.speed()
  to._orientation = from.orientation()
  to._position = from.position()
  to._history = from._history //TODO: Implement getter

  return to
}

module.exports = Ball