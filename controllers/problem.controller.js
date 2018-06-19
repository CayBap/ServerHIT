const Problem = require('../models/problem.model');

exports.GetRandomProblem =async () => {
    let arr = [];
    let proEasy =await Problem.find({
        level: 1
    });
    let proNomal =await Problem.find({
        level: 2
    });
    let proHard =await Problem.find({
        level: 3
    });
    arr.push({
        problemId: proEasy[Math.floor((Math.random() * proEasy.length) )]._id,
        correct: false,
        score : 0
    });
    arr.push({
        problemId: proNomal[Math.floor((Math.random() * proNomal.length) )]._id,
        correct: false,
        score : 0
    });
    arr.push({
        problemId: proHard[Math.floor((Math.random() * proHard.length) )]._id,
        correct: false,
        score : 0
    });
    return arr;
}
