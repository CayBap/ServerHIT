const CONST = require('../../config/config');
const User = require('../../models/user.model');
const Play = require('../../models/play.model');
module.exports = function(socket) {
  return function(data) {
    console.log(data);
    if (data.command === 1000) {
      User.findOne({ studentId: data.studentId }).then(user => {
        Play.findById(user.playId).then(play => {
          play.isInterviewing = true;
          play.save();
        });
      });
      socket.broadcast.emit(CONST.NAMESPACE.INTERVIEW, { command: 1000, studentId: data.studentId });
    }
  };
};
