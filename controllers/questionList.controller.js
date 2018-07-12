const Question = require('../models/question.model');
const QuestionList = require('../models/questionList.model');


exports.GetListQuestions = async (req, res) => {
    try {
        var questionList = await QuestionList.find();
        res.json({
            code: 1,
            status: "200",
            data: questionList
        })

    } catch (e) {
        console.log(e)
        res.json({
            code: 2,
            status: "400",
            message: "Lấy danh sách câu hỏi thất bại"
        })
    }
}

exports.GetListQuestionById = async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let questions = await Question.find();
            let quesitonList = await QuestionList.findById(id).lean();
            let quesIds = quesitonList.questions.map(ques => {
                return ques.questId;
            });
            quesitonList.questions = quesIds;
            res.json({
                code: 1,
                status: '200',
                data: {
                    quesitonList: quesitonList,
                    questions: questions
                }
            });

        } catch (err) {
            res.json({
                code: 2,
                status: '400',
                message: 'Lỗi không tìm thấy danh sách câu hỏi'
            });
        }
    } else {
        res.json({
            code: 2,
            status: '400',
            message: 'Lỗi không tìm thấy danh sách câu hỏi'
        });
    }
}

exports.AddListQuestion = async (req, res) => {
    let body = req.body;
    if (body) {
        try {
            let questions = [];
    
                if (body.questions) {

                    if (typeof body.questions == "string") {
                        let ques = await Question.findById(body.questions);
                        ques = {
                            questId: ques._id,
                            point: ques.score
                        }
                        questions.push(ques)
                    } else {
                        for (let i = 0; i < body.questions.length; i++) {
                            let ques = await Question.findById(body.questions[i]);
                            ques = {
                                questId: ques._id,
                                point: ques.score
                            }
                            questions.push(ques)
                        }
                    }

                }
            let listQuestion = new QuestionList({
                name: body.name,
                usingQuestion: body.usingQuestion,
                questions: questions,
                isRandom:body.isRandom
            });
            let result = await listQuestion.save();
            res.json({
                code: 1,
                status: '200',
                data: result
            })
        } catch (err) {
            res.json({
                code: 2,
                status: '400',
                message: 'Thêm mới danh sách câu hỏi thất bại.'
            });
        }
    }
}

exports.Delete = async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            await QuestionList.findByIdAndRemove(id);
            res.json({
                code: 1,
                status: '200',
                message: 'Xóa danh sách câu hỏi thành công'
            });
        } catch (err) {
            res.json({
                code: 2,
                status: '400',
                message: 'Xóa danh sách câu hỏi thất bại.'
            })
        }
    }
}

exports.Update = async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    if (id && body) {
        let questionList = undefined;
        try {
            questionList = await QuestionList.findById(id);
        } catch (err) {
            res.json({
                code: 1,
                status: '400',
                message: 'Không tìm thấy danh sách câu hỏi'
            });
        }
        if (questionList) {
            try {
                questionList.name = body.name;
                questionList.usingQuestion = body.usingquestion;
                questionList.isRandom = body.isRandom.toString();
                let questions = [];
    
                if (body.questions) {

                    if (typeof body.questions == "string") {
                        let ques = await Question.findById(body.questions);
                        ques = {
                            questId: ques._id,
                            point: ques.score
                        }
                        questions.push(ques)
                    } else {
                        for (let i = 0; i < body.questions.length; i++) {
                            let ques = await Question.findById(body.questions[i]);
                            ques = {
                                questId: ques._id,
                                point: ques.score
                            }
                            questions.push(ques)
                        }
                    }

                }
                questionList.questions = questions;
                let result = await questionList.save();
                res.json({
                    code: 1,
                    status: '200',
                    data: result
                });
            } catch (err) {
                console.log(err)
                res.json({
                    code: 1,
                    status: '400',
                    message: 'Cập nhập danh sách câu hỏi thất bại'
                });
            }
        }
    }
}