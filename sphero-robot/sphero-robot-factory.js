var SpheroRobot = require('./sphero-robot')

var createSpheroRobot = function (bluetoothPort, ball) {
  return new SpheroRobot(bluetoothPort, ball)
}

var SpheroRobotFactory = {
  createSpheroRobot: createSpheroRobot
}

module.exports = SpheroRobotFactory