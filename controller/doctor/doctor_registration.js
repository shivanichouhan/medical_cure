const doc = require("../../model/doctor/doctor_registration")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.doctor_reg =async(req,res)=>{
    console.log(req.body)
    const { user_name, email, password } = req.body;
    const hashedPassword = await hashPassword(password)
    const data_check = await doc.findOne({ email: email })
    console.log(data_check)
    if (!data_check) {
        const datas = new doc({
            username: user_name,
            email: email,
            password: hashedPassword,

        })
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 200, msg: "Email already exist" })
    }
}

exports.doctorLogin =async (req,res)=>{
    var { email, password } = req.body
    console.log(email)
    const user = await doc.findOne({email:email})
    console.log(user)
    console.log(user[0])
    if (!user) {
        res.json({
            code: 200,
            msg: 'User with that email does not exist. Please signup'
        })
    }
    const validPassword = await validatePassword(password, user.password)
    console.log(validPassword,'44')
    if (!validPassword) {
        res.json({ code: 400, msg: 'Password is not correct' })
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    console.log(token)
    // const Doc = await doc.findByIdAndUpdate({_id:user._id},{$set:{ bearer_token: token} })
    // res.cookie('token', token, { expire: new Date() + 9999 })
    console.log(user)
    return res.json({ token, data: {_id:user._id,username:user.username,email:user.email,password:user.password}});
    // res.json({ code: 200, msg: Doc })
}