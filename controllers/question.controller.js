const Question = require('../models/question.model');
const QuestionList = require('../models/questionList.model');

exports.GetRandomQuestion = async () => {
    let listQ = await QuestionList.find();
    let listP = [];
    let dem = 0;
    if (listQ != null) {
        await listQ.forEach(list => {
            let arr = GetArrRandom(list.usingQuestion, list.questions.length);
            for (let i = 0; i < list.usingQuestion; i++) {
                listP.push({
                    questionId: list.questions[arr[i]].questId,
                    answered: false
                });
            }
        });
    }
    return listP;
}
let GetArrRandom = (useQues, count) => {
    let arr = [];
    while (arr.length < useQues) {
        let length = arr.length;
        let number = Math.floor((Math.random() * count) + 1);
        if (length == 0) {
            arr.push(number - 1);
        } else {
            let dem = 0;
            for (let i = 0; i < length; i++) {
                if ((number - 1) != arr[i]) {
                    dem++;
                }
            }
            if (dem == length) {
                arr.push(number - 1);
            }
        }
    }
    return arr;
}
