const bcrypt = require('bcryptjs')
const e = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/users')


async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


exports.normal_signup = async (req, res) => {
    console.log(req.body)
        const { user_name, email, password, con_password } = req.body;
        if (password == con_password) {
            const Password = await hashPassword(password)
            const data_check = await User.find({ email: email })
            console.log(data_check)
            if (data_check.length == 0) {
                var datas = new User({
                    user_name: user_name,
                    email: email,
                    password: Password

                })
                console.log(datas)
                datas.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "signup successfully" })
                    })
            } else {
                res.json({ code: 201, msg: "Email already exist" })
            }

        } else {
            res.json({ code: 204, msg: "confirm password is wrong" })
        }

};


exports.users_signin = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    const user = await User.findOne({
        email: email
    }
    )
    console.log(user)
    if (!user) {
        res.json({
            code: 200,
            msg: 'User with that email does not exist. Please signup'
        })
    }
    const validPassword = await validatePassword(password, user.password)
    if (!validPassword) {
        res.json({ code: 400, msg: 'Password is not correct' })
    }
    const token = jwt.sign({ _id: user }, process.env.JWT_SECRET)
    const ss = await User.updateOne({ bearer_token: token })
    res.cookie('token', token, { expire: new Date() + 9999 })
    res.send({code:200,msg:user})
}

