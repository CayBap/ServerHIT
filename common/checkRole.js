var User = require('../models/user.model'); // get our mongoose model
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('config'); // get our config file

module.exports = (role) => {
    return (req, res, next) => {
        let currentRole = req.decoded.role;
        if (currentRole) {
            if (currentRole === role) {
                return next();
            } else {
                res.json({
                    code: config.get("state.false"),
                    message: 'Không có quyền'
                });
                return;
            }
        } else {
            res.json({
                code: config.get("state.false"),
                message: 'Không có quyền'
            });
            return;
        }
    }
}
