const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate')
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Problem = new Schema({
    title: String,
    content: String,
    correctScore:Number,
    level:Number
}, {
    collection: 'Problem'
});
Problem.plugin(mongoosePaginate)
module.exports = mongoose.model('Problem', Problem);