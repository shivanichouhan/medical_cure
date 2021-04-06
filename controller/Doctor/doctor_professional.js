const Professional = require('../../model/Doctor/doctor_regis')
const cloud = require('../../cloudinary')
const fs = require("fs")
var Up = require("../../handler/multer")
Up = Up.fields([{name:'License_img_front_side'},{name:'License_img_back_side'}])

exports.doctor_professional = (req, res) => {
    // var profObj = new Professional(req.body)
    Professional.updateOne({ _id: req.params.user_id },{$set:req.body},
    async (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.files) {
                var p_front = req.files.License_img_front_side
                var p_back = req.files.License_img_back_side

                const proRegF = async (path) => await cloud.License_front_side(path)
                const proRegB = async (path) => await cloud.License_back_side(path)


                const pF = p_front[0].path
                const pB = p_back[0].path

                const url_front = await proRegF(pF)
                const url_back = await proRegB(pB)

                Professional.updateOne({ _id: req.params.user_id }, { $set: { License_img_front_side: url_front, License_img_back_side: url_back } })
                    .exec((err, proRep) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            fs.unlinkSync(pF)
                            fs.unlinkSync(pB)
                            res.json({ data: proRep })
                        }
                    })

            }
            else {
                res.json({ data: resp })
            }
        }
    })
}

exports.Edit_doctor_professional = (req, res) => {
    Professional.updateOne({ _id: req.params.userId }, req.body, (err, updteUser) => {
        if (err) {
            res.json(err)
        }
        else {
            Up(req, res, function (err) {
                if (err) {
                    res.send({ code: 400, msg: 'file formart not support' })
                }
                else {
                    if (req.files.License_img_front_side) {
                        console.log(req.files.License_img_front_side)
                        for (row of req.files.License_img_front_side) {
                            var p = row.path
                        }
                        const path = p
                        cloud.License_front_side(path).then((resp) => {
                            fs.unlinkSync(path)
                            console.log(resp)
                            Professional.updateOne({ 'License_img_front_side.imgId': req.body.imgId }, { $set: { "License_img_front_side.$.url": resp.url, "License_img_front_side.$.imgId": resp.imgId } })
                                .then((resPatient) => {
                                    res.json({ code: 200, msg: 'Doctor details update with License front side image' })
                                }).catch((error) => {
                                    res.json({ code: 400, msg: 'License front side image not update' })
                                })
                        }).catch((err) => {
                            res.send(err)
                        })
                    }

                    else if (req.files.License_img_back_side) {
                        console.log(req.files.License_img_back_side)
                        for (row of req.files.License_img_back_side) {
                            var p = row.path
                        }
                        const path = p
                        cloud.iden_back(path).then((resp) => {
                            fs.unlinkSync(path)
                            console.log(resp)
                            Professional.updateOne({ 'License_img_back_side.imgId': req.body.imgId }, { $set: { "License_img_back_side.$.url": resp.url, "License_img_back_side.$.imgId": resp.imgId } })
                                .then((resPatient) => {
                                    res.json({ code: 200, msg: 'Professional details update with license back side image' })
                                }).catch((error) => {
                                    res.json({ code: 400, msg: 'license back side image not update' })
                                })
                        }).catch((err) => {
                            res.send(err)
                        })
                    }
                    else {
                        res.json({ code: 200, msg: 'professional details update successfully' })
                    }
                }
            })
        }
    })
}


