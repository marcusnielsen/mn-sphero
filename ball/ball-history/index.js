var moment = require('moment')

var BallHistory = function () {
  if(!(this instanceof BallHistory)) {
    return new BallHistory()
  }

  this._historyCollection = []
}

BallHistory.prototype.add = function (ballCopy) {
  this._historyCollection.push({
    ball: ballCopy,
    moment: moment()})
}

BallHistory.prototype.undo = function (ball) {
  var ballCopy = this._historyCollection.pop()
  ball.copy(ballCopy)
}

module.exports = BallHistory