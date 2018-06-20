var express = require('express')

var router = express.Router()
router.use('/user',require('./api/user.route'));
router.use('/auth',require('./api/session.route'));
router.use('/play',require('./api/play.route'));
router.use('/question',require('./api/question.route'));

module.exports = router;