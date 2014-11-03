var BallHistory = function () {
  if(!(this instanceof BallHistory)) {
    return new BallHistory()
  }

  this._historyCollection = []
}

BallHistory.prototype.add = function (ballCopy, milliseconds) {
  this._historyCollection.push({
    ball: ballCopy,
    milliseconds: milliseconds})
}

BallHistory.prototype.undo = function () {
  return this._historyCollection.pop()
}

module.exports = BallHistory