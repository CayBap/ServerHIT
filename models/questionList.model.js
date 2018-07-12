const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const QuestionList = new Schema({
    name: String,
    usingQuestion: Number,
    questions: [{
        questId: {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        },
        point: Number
    }],
    isRandom:Boolean
}, {
    collection: 'QuestionList'
})

module.exports = mongoose.model('QuestionList', QuestionList);