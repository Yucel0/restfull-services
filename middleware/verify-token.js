const Token = require("../token");

module.exports = (req, res, next) => {
    const token = req.headers["access-valid-token"] || req.body.token || req.query.token;
    if (token) {
        Token.then(data => {
            if (token != data) {
                res.json({
                    status: false,
                    message: "invalid token"
                })
            } else {
                next();
            }
        })
    } else {
        res.json({
            status: false,
            message: "no token provided"
        })
    }
}