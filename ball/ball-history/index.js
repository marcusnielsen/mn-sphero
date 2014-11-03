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

BallHistory.prototype.undo = function () {
  return this._historyCollection.pop()
}

module.exports = BallHistory