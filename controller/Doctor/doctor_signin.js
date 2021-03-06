const doc = require("../../model/Doctor/doctor_regis")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var otpGenerator = require('otp-generator')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.doctor_reg = async (req, res) => {

    const OTP = otpGenerator.generate(2, { digits: true, upperCase: false, specialChars: false, alphabets: false });
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
        datas.user_id = datas._id
        datas.dumy_userName = '@' + user_name + OTP
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 200, msg: "Email already exist" })
    }
}

exports.doctorLogin = async (req, res) => {
    var { email, password } = req.body
    console.log(email)
    const user = await doc.findOne({ email: email })
    if (!user) {
        res.json({
            code: 400,
            msg: 'User with that email does not exist. Please signup'
        })
    }
    else {
        const validPassword = await validatePassword(password, user.password)
        console.log(validPassword, '44')
        if (!validPassword) {
            res.json({ code: 400, msg: 'Password is not correct' })
        }
        else {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
            console.log(token)
            // const Doc = await doc.findByIdAndUpdate({_id:user._id},{$set:{ bearer_token: token} })
            // res.cookie('token', token, { expire: new Date() + 9999 })
            console.log(user)
            return res.json({ token, data: {username: user.username, email: user.email, dumy_userName: user.dumy_userName, user_id: user.user_id } });
        }
        // res.json({ code: 200, msg: Doc })
    }
}