 
const bcrypt = require('bcryptjs')
const express = require('express')
const jwt = require('jsonwebtoken')
const Admin = require('../../model/admin/admin_login')


async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


exports.signup = async (req, res) => {
    console.log(req.body)
        const { user_name, email, password, con_password } = req.body;
            const Password = await hashPassword(password)
            const data_check = await Admin.findOne({ email: email })
            console.log(data_check)
            if (!data_check) {
                const datas = new Admin({
                    user_name: user_name,
                    email: email,
                    password: Password
                    // phone: phone

                })
                datas.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "signup successfully" })
                    }).catch((err)=>{
                        console.log(err)

                    })
            } else {
                res.json({ code: 200, msg: "Email already exist" })
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
            code: 400,
            msg: 'email id is wrong'
        })
    }
    else{
    const validPassword = await validatePassword(password, admin.password)
    if (!validPassword) {
        res.json({ code: 400, msg: 'Password is not correct' })
    }
    else{
    const token = jwt.sign({ _id: admin._id,role:admin.role }, process.env.JWT_SECRET,{expiresIn:'24h'} )

    localStorage.setItem('token',token)
    // const Doc = await doc.findByIdAndUpdate({_id:user._id},{$set:{ bearer_token: token} })
    // res.cookie('token', token, { expire: new Date() + 9999 })
    // res.redirect("/deshboard")
    return res.json({ token, data: {_id:admin._id,name:admin.username,email:admin.email,password:admin.password}});
    }
  }
}

exports.logout=(req,res)=>{
    localStorage.removeItem('token')
    res.json({msg:'logout successfully'})
}