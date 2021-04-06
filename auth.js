const jwt = require('jsonwebtoken')
const health = require("./model/helth_worker/users")

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

exports.checkLogin =(req,res,next)=>{
    console.log(req.method)
    var myToken = localStorage.getItem('token')
    console.log(myToken)
        jwt.verify(myToken,process.env.JWT_SECRET,(err,data)=>{
            if(err){
                res.redirect("/admin_login")
                // res.json({error:"token is expire"})
            }
            else{
                if(data.role === 1){
                console.log(data)
                next()
           }    
       }
   })
}

exports.chk_helth_status = async(req,res)=>{
    var data = await health.findOne({_id:req.params.userId})
    if(data.status == 1){
        next()
    }
    else if(data.status == 0){
        res.json({code:400, msg:'health worker not approve'})
    }    
}