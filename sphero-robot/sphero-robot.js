var _ = require('lodash')
var Cylon = require('cylon')
var Ball = require('../ball').Ball

var SpheroRobot = function (bluetoothPort, ball) {
  if(!(this instanceof(SpheroRobot))) {
    return new SpheroRobot(bluetoothPort, ball)
  }

  this._robot = Cylon.robot(this._getRobotOptions(bluetoothPort))

  this._ball = ball || new Ball(bluetoothPort)

  this._robot.on('ready', _.bind(this._onReady, this))
  this._robot.on('error', _.bind(this._onError, this))

  this._robot.start()
}

SpheroRobot.prototype.ball = function () {
  if(arguments.length) {
    throw new Error('SpheroRobot#ball() does not have a setter.')
  }

  return this._ball
}

SpheroRobot.prototype._getRobotOptions = function (bluetoothPort) {
  if(!bluetoothPort) {
    throw new Error('Argument bluetoothPort not set.')
  }

  return {
    connection: { name: 'sphero', adaptor: 'sphero', port: bluetoothPort },
    device: { name: 'sphero', driver: 'sphero' }
  }
}

SpheroRobot.prototype._onError = function (err) {
  console.log('Ball Error!')
  throw new Error(err)
}

SpheroRobot.prototype._onCollision = function (data) {
  console.log('Collision detected. ' + data)
  // TODO: Implement on Ball.
  //this.ball.onCollision()
}

SpheroRobot.prototype._onReady = function () {
  console.log('Ball ready.')
  this._robot.sphero.detectCollisions()
  this._robot.sphero.on('collision', _.bind(this._onCollision, this))
  // TODO: Expose color-changes via Ball.
  this._robot.sphero.setRandomColor()

  // TODO: Find the best way or interval value.
  setInterval(_.bind(this._work, this), 50)
}

SpheroRobot.prototype._work = function () {
  this._robot.sphero.roll(this._ball._speed, this._ball._orientation)
}

module.exports = SpheroRobot