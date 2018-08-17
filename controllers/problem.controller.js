const Problem = require('../models/problem.model');
const request = require('request');
exports.GetRandomProblem =async () => {
    let arr = [];
    let proEasy =await Problem.find({
        level: '1'
    });
    let proNomal =await Problem.find({
        level: '2'
    });
    let proHard =await Problem.find({
        level: '3'
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
exports.GetProblems = async (req, res) => {
    var page = req.query.page ? parseInt(req.query.page) : 1
    var limit = req.query.limit ? parseInt(req.query.limit) : 10;

    var options = {
        page,
        limit,
    }
    try {
        var problems = await Problem.paginate({}, options);
        // console.log(problems.sortName)
        res.json({
            code: 1,
            status: "200",
            data: problems
        })

    } catch (e) {
        console.log(e)
        res.json({
            code: 2,
            status: "400",
            message: "Lấy  câu hỏi thất bại"
        })
    }
}
exports.GetQuestionsNotPage = async (req, res) => {

    try {
        var problems = await Problem.find();
        res.json({
            code: 1,
            status: "200",
            data: problems
        })

    } catch (e) {
        res.json({
            code: 2,
            status: "400",
            message: "Lấy  câu hỏi thất bại"
        })
    }
}

exports.GetProblemById = async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            let problem = await Problem.findById(id);
            res.json({
                code: 1,
                status: '200',
                data: problem
            });

        } catch (err) {
            res.json({
                code: 2,
                status: '400',
                message: 'Lỗi không tìm thấy câu hỏi'
            });
        }
    } else {
        res.json({
            code: 2,
            status: '400',
            message: 'Lỗi không tìm thấy câu hỏi'
        });
    }
}

exports.AddProblem = async (req, res) => {
    let body = JSON.parse(req.body.data);
    if (body) {
        try {
            let score = 0;
            if(body.level==1){
                score=20;
            }
            if(body.level==2){
                score = 30;
            }
            if(body.level==3){
                score = 50;
            }
            // body = JSON.parse(body)
            // console.log(body.example.input)
            let problem = new Problem({
                title: body.title,
                content: body.content,
                input:body.input,
                output:body.output,
                example:{
                    input:body.example.input,
                    output:body.example.output
                },
                sortName:body.sortName,
                correctScore:score,
                level:body.level,
                timeLimit:body.timeLimit,
                memoryLimit:body.memoryLimit,
                language:body.language
              });
            let result = await problem.save();
            res.json({
                code: 1,
                status: '200',
                data: result
            })
        } catch (err) {
            console.log(err)
            res.json({
                code: 2,
                status: '400',
                message: 'Thêm mới câu hỏi thất bại.'
            });
        }
    }
}

exports.Delete = async (req, res) => {
    let id = req.params.id;
    if (id) {
        try {
            await Problem.findByIdAndRemove(id);
            res.json({
                code: 1,
                status: '200',
                message: 'Xóa câu hỏi thành công'
            });
        } catch (err) {
            console.log(err)
            res.json({
                code: 2,
                status: '400',
                message: 'Xóa câu hỏi thất bại.'
            })
        }
    }
}

exports.Update = async (req, res) => {
    let id = req.params.id;
    let body = JSON.parse(req.body.data);
 
    if (id && body) {
        let problem = undefined;
        try {
            problem = await Problem.findById(id);
        } catch (err) {
            res.json({
                code: 1,
                status: '400',
                message: 'Không tìm thấy câu hỏi'
            });
        }
        // console.log(problem)
        if (problem) {
            let score = 0;
            if(body.level==1){
                score=20;
            }
            if(body.level==2){
                score = 30;
            }
            if(body.level==3){
                score = 50;
            }
            try {
                problem.title= body.title;
                problem.content= body.content;
                problem.input= body.input;
                problem.output= body.output;
                problem.example.input= body.example.input;
                problem.example.output= body.example.output;
                problem.sortName= body.sortName;
                problem.correctScore= score;
                problem.level= body.level;
                problem.timeLimit= body.timeLimit;
                problem.memoryLimit= body.memoryLimit;
                problem.language= body.language;
                let result = await problem.save();
                res.json({
                    code: 1,
                    status: '200',
                    data: result
                });
            } catch (err) {
                res.json({
                    code: 1,
                    status: '400',
                    message: 'Cập nhập câu hỏi thất bại'
                });
            }
        }
    }
}
exports.SubmitCode = async (req,res)=>{
    console.log(req.file);
    console.log(req.body);

}
async function getResult(submissionId) {
    let url = 'http://192.168.1.111/domjudge/api/judgings?cid=2&submitid=' + submissionId;
    let auth = {
        'user': 'admin',
        'pass': 'admin',
        'sendImmediately': true
    };

    try {
        let res = await request.get({
            auth: auth, url: url
        });
        return res;
    }
    catch (err) {
        console.log('EX: ');
        console.log(err);
    }
}

async function SubmitToServerDomjudge() {
    //    let url = 'http://localhost:3000';
    let url = 'http://192.168.1.111/domjudge/api/submissions';
    let auth = {
        'user': 'dothang',
        'pass': 'dothang',
        'sendImmediately': true
    };
    let formData = {
        shortname: 'sum',
        langid: 'cpp',
        contest: 'demo',
        'code[]': require('fs').createReadStream('main.cpp'),
    };
    try {
        let res = await request.post({
            auth: auth, url: url, formData: formData
        });
        let time = 0;
        let interval = setInterval(async()=>{
            console.log(res)
            let result = JSON.parse(await getResult(res));
            if(result.length!=0){
                console.log(result)
                clearInterval(interval);
            }else{
                time++;
                console.log('waiting for ..... ',res,' time:',time)
            }
        },1000)
    }
    catch (err) {
        console.log('EX: ');
        console.log(err);
    }
}
