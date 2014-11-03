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
  this._history.add(this.copy())
}

Ball.prototype.position = function (position) {
  if(!arguments.length) {
    return this._position
  }

  this.position = {
    x: position.x || this.x,
    y: position.y || this.y
  }

  this._history.add(this.copy())
}

Ball.prototype.speed = function (speed) {
  if(!arguments.length) {
    return this._speed;
  }

  this._speed = Math.floor(speed)

  if(!this.isSpeedValid()) {
    throw new RangeError()
  }

  this._history.add(this.copy())
}

Ball.prototype.isSpeedValid = function () {
  return this._speed >= 0 && this._speed <= this.MAX_SPEED
}

Ball.prototype.return = function () {
  this._history.undo(this)
}

Ball.prototype.copy = function (ballCopy) {
  var from = arguments.length ? ballCopy : this
  var to = arguments.length ? this : new Ball(this.id())

  to._speed = from.speed()
  to._orientation = from.orientation()
  to._position = from.position()

  return to
}

module.exports = Ball