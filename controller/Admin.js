const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../model/Admin_model.js')


async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


exports.signup = async (req, res) => {

    console.log(req.body)

        const { user_name, email, password, phone, con_password } = req.body;
        if (password == con_password) {
            const Password = await hashPassword(password)
            const data_check = await Admin.findOne({ email: email })

            console.log(data_check)
            if (!data_check) {
                const datas = new Admin({
                    user_name: user_name,
                    email: email,
                    password: Password,
                    phone: phone

                })
                datas.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "signup successfully" })
                    }).catch((err)=>{
                        console.log(err)

                    })
            } else {
                console.log(err)
                res.json({ code: 200, msg: "Email already exist" })
            }

        } else {
            res.json({ code: 200, msg: "confirm password is wrong" })
        }

};

exports.signin = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    const admin = await Admin.findOne({
        email:email}
    )
    console.log(admin)
    if (!admin) {
        res.json({
            code: 200,
            msg: 'User with that email does not exist. Please signup'
        })
    }
    const validPassword = await validatePassword(password, admin.password)
    if (!validPassword) {
        res.json({ code: 400, msg: 'Password is not correct' })
    }
    const token = jwt.sign({ _id: admin }, 'newsecret')
    const ss = await Admin.updateOne({ bearer_token: token })
    res.cookie('token', token, { expire: new Date() + 9999 })
    res.json({ code: 200, msg: admin })
}
