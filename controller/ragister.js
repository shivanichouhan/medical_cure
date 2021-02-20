const bcrypt = require('bcryptjs')
const e = require('express')
const jwt = require('jsonwebtoken')
const User = require('../model/users')

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dph53engs',
    api_key: '844719118241756',
    api_secret: '6IPsNfYyr9i43_qOhNPvLTh7Tg4'
})


async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


exports.normal_signup = async (req, res) => {
    // try {

        const { user_name, email, password, phone, con_password } = req.body;
        // if(req.file){

        // const path=req.file.path
        // cloudenary.uploader.upload(
        //     path,
        //     { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
        //    async function (err, images) {
        //         if (err) console.log(err)
        //         console.log('file uploaded to Cloudinary')
        //         const fs = require('fs')
        //         fs.unlinkSync(path)
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
                            // profile_pic:images.secure_url

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
            // })
        // }else{
        //     res.json({code:200,msg:"profile didn't add"})
        // }

    // } catch (err) {
    //     res.send(err)
    // }

};


exports.normal_signin = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    const user = await User.find_user(
        email
    )
    console.log(user)
    if (!user) {
        res.json({
            code: 200,
            msg: 'User with that email does not exist. Please signup'
        })
    }
    const validPassword = await validatePassword(password, user[0].password)
    if (!validPassword) {
        res.json({ code: 400, msg: 'Password is not correct' })
    }
    const token = jwt.sign({ _id: user }, process.env.JWT_SECRET)
    const ss = await User.updateOne({ bearer_token: token })
    res.cookie('token', token, { expire: new Date() + 9999 })
    res.json({ code: 200, msg: user[0] })
}
