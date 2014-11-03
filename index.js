var spheroRobotFactory = require('./sphero-robot').SpheroRobotFactory

var spheroRobot = spheroRobotFactory.createSpheroRobot(
  '/dev/tty.Sphero-GOG-AMP-SPP'
)

var ball = spheroRobot.ball()
var INTERVAL = 4000
var MAX_MOVES = 5
var SLOW_FACTOR = 4

var movesCount = 0

var randomWorkId = -1

var randomWork = function () {
  if(movesCount >= MAX_MOVES) {
    console.log('MAX_MOVES reached.')
      //TODO: unsetInterval -> randomWorkId
    setInterval(fastRewind, INTERVAL)
  }

  ball.speed(Math.random() * ball.MAX_SPEED / SLOW_FACTOR)
  ball.orientation(Math.random() * ball.MAX_ORIENTATION)
}

randomWorkId = setInterval(randomWork, INTERVAL)

var fastRewind = function () {
  ball.reverse()
  ball._speed *= SLOW_FACTOR
}