const jwt = require('jsonwebtoken')

exports.isAdmin = (req, res, next) => {
    var Token = req.headers["authorization"]
    const bearer = Token.split(' ');
    const bearerToken = bearer[1];
    if (typeof bearerToken !== "undefined") {
        jwt.verify(bearerToken,process.env.JWT_SECRET, (err, adminData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                if (adminData._id == req.params.adminId ) {
                    next()
                } else {
                    res.sendStatus(403);
                }
            }
        });
    }else{
        res.sendStatus(403);
    }
};