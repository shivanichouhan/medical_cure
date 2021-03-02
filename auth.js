
exports.isAdmin = (req, res, next) => {
    var Token = req.headers["authorization"]
    const bearer = Token.split(' ');
    const bearerToken = bearer[1];
    if (typeof bearerToken !== "undefined") {
        jwt.verify(bearerToken,process.env.JWT_SECRET, (err, adminData) => {
            console.log(adminData,req.params.userId,'run')
            if (err) {
                res.sendStatus(403);
            } else {
                if (adminData.id == req.params.adminId && adminData.role == 1) {
                    console.log(adminData);
                    next()
                } else {
                    res.sendStatus(403);
                }
            }
        });
    } else {
        res.sendStatus(403);
    }
};