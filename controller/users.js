const bcrypt = require('bcryptjs')
const e = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/users')

// const SendOtp = require('sendotp');
// const sendOtp = new SendOtp("4603359F95325E",'Otp for your order is {{otp}}, please do not share it with anybody');

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


exports.otp_send =(req,res)=>{
    sendOtp.send(req.body.Mobile, "VIRALL", function (error, data) {
        if(error){
            res.send(error)
        }
        else{
            res.send(data)
        }
      });
}



// exports.otp_send =(req,res)=>{
//     var number = req.body.Mobile
//     console.log(number)
//     sendOtp.send(number,"VIRALL", function (error, data) {
//         res.send(data);
//       });
    // User.findOne({Mobile:req.body.Mobile})
    // .then((resp)=>{
    //     console.log(resp)
    //     if(resp.otp == ''){
    //         console.log('otp blank')
    //         sendOtp.send(req.body.Mobile,"",(error, data)=>{
    //             res.send(data)
    //             // User.updateOne({_id:resp._id},{$set:{otp:data.otp}})
    //             // .then((otp)=>{
    //             //    res.json({code:200,msg:'otp send successfully',Data:Data})     
    //             // })
    //             // .catch((error)=>{
    //             //     console.log(error)
    //             //     res.json({code:400,msg:'otp is not add in user'})
    //             // })
    //         });
    //     }
    //     else{
    //         console.log('otp blank not')
    //         // sendOtp.retry(resp.Mobile, true,(error, data)=>{
    //         //     res.json({code:200,msg:'otp resend successfully',Data:data}) 
    //         // });
    //     }

    // }).catch((error)=>{
    //     res.json({code:400,msg:'mobile no is not register'})
    // })
// }

exports.otp_verify=(req,res)=>{
    User.find({otp:req.body.otp})
    .then((resp)=>{
        sendOtp.verify(resp.Mobile, resp.otp, function (error, data) {
            console.log(data); // data object with keys 'message' and 'type'
            if(data.type == 'success'){
                res.json({code:200,msg:'otp verify successfully'})
            } 
            if(data.type == 'error'){
                res.json({code:400,msg:'otp is not verify'})
            }
          });
    }).catch((err)=>{
        res.json({code:400,msg:'wrong otp'})
    })
}

exports.normal_signup = async (req, res) => {
    try {
        const { user_name, email, password, phone, con_password } = req.body;
        if (password == con_password) {
            const hashedPassword = await hashPassword(password)
            const data_check = await User.findOne({ email: email })
            console.log(data_check)
            if (!data_check) {
                const datas = new User({
                    username: user_name,
                    email: email,
                    password: hashedPassword,
                    Mobile: phone

                })
                datas.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "signup successfully" })
                    })
            } else {
                res.json({ code: 200, msg: "Email already exist" })
            }

        } else {
            res.json({ code: 200, msg: "confirm password is wrong" })
        }
    }catch(err){
        res.send(err)
    }

};


exports.normal_signin = async (req, res) => {
    const { email, password } = req.body
    console.log(email)
    const user = await User.find({email:email})
    console.log(user)
    console.log(user[0])
    if (!user) {
        res.json({
            code: 200,
            msg: 'User with that email does not exist. Please signup'
        })
    }
    const validPassword = await validatePassword(password, user[0].password)
    console.log(validPassword,'44')
    if (!validPassword) {
        res.json({ code: 400, msg: 'Password is not correct' })
    }
    const token = jwt.sign({ _id: user }, process.env.JWT_SECRET)
    const ss = await User.updateOne({ bearer_token: token })
    res.cookie('token', token, { expire: new Date() + 9999 })
    res.json({ code: 200, msg: user })
}

