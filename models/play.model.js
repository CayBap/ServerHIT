const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Play = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    },
    history: {
      questions: [
        {
          questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
          },
          answered: Boolean,
          answer: String
        }
      ],
      problems: [
        {
          problemId: {
            type: Schema.Types.ObjectId,
            ref: 'Problem'
          },
          correct: Boolean,
          score: Number
        }
      ]
    },
    time: {
      type: Number,
      default: 60 * 60
    },
    status: {
      type: Number,
      default: 0
    }, //0: init, 1: playing, 2: end
    totalScore: {
      type: Number,
      default: 0
    },
    totalTime: {
      type: Number,
      default: 60 * 60
    },

    interviewScore: {
      type: Number,
      default: 0
    },
    isInterviewing: {
      type: Boolean,
      default: false
    }
  },
  {
    collection: 'Play'
  }
);

module.exports = mongoose.model('Play', Play);
