var Ball = require('./ball')

var balls = []

var createBall = function (bluetoothPort) {
  var ball = new Ball(bluetoothPort)
  balls.push(ball)
  return ball
}

var BallFactory = {
  balls: balls,
  createBall: createBall
}

module.exports = BallFactory