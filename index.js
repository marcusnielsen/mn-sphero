var spheroRobotFactory = require('./sphero-robot').SpheroRobotFactory

var spheroRobot = spheroRobotFactory.createSpheroRobot(
  '/dev/tty.Sphero-GOG-AMP-SPP'
)

var ball = spheroRobot.ball()
var INTERVAL = 2000
var MAX_MOVES = 2
var SLOW_FACTOR = 1

var movesCount = 0

var randomWorkId
var fastRewindWorkId

var randomWork = function () {
  if(movesCount >= MAX_MOVES) {
    console.log('MAX_MOVES reached.')
    clearInterval(randomWorkId)
    ball.speed(0)
    ball.execute(INTERVAL)
    fastRewindWorkId = setInterval(fastRewindWork, INTERVAL / SLOW_FACTOR)
  }
  else {
    console.log('Randomly rolling ball.')
    movesCount += 1

    ball.speed(Math.random() * ball.MAX_SPEED / SLOW_FACTOR)
    ball.orientation(Math.random() * ball.MAX_ORIENTATION)
    ball.execute(INTERVAL)
  }

  console.log(ball.toString())
}

var fastRewindWork = function () {
  if(!ball.reverse())
  {
    console.log('No more rolls to reverse.')
    clearInterval(fastRewindWorkId)

    movesCount = 0
    randomWorkId = setInterval(randomWork, INTERVAL)
  }
  else {
    console.log('Reversing ball.')
    ball._speed *= SLOW_FACTOR
  }

  console.log(ball.toString())
}

spheroRobot._robot.on('ready', function () {
  randomWorkId = setInterval(randomWork, INTERVAL)
})
