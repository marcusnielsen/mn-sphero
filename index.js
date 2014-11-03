var spheroRobotFactory = require('./sphero-robot').SpheroRobotFactory

var spheroRobot = spheroRobotFactory.createSpheroRobot(
  '/dev/tty.Sphero-GOG-AMP-SPP'
)

var ball = spheroRobot.ball()
var INTERVAL = 3000

var randomizedWork = function () {
  setInterval(function () {
    ball.speed(Math.random() * ball.MAX_SPEED / 4)
    ball.orientation(Math.random() * ball.MAX_ORIENTATION)
  }, INTERVAL)
}

randomizedWork()