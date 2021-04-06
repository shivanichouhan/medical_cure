const Identity = require('../../model/Doctor/doctor_regis')
const cloud = require('../../cloudinary')
const fs = require("fs")
var Up = require("../../handler/multer")
Up = Up.fields([{name:'PanCard_front_side_img'},{name:'PanCard_back_side_img'}])

exports.doctor_identity = (req, res) => {

    Identity.updateOne({ _id: req.params.user_id }, { $set: req.body },
        async (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                if (req.files) {
                    var i_front = req.files.PanCard_front_side_img
                    var i_back = req.files.PanCard_back_side_img

                    const idenRegF = async (path) => await cloud.iden_front(path)
                    const idenRegB = async (path) => await cloud.iden_back(path)


                    const iF = i_front[0].path
                    const iB = i_back[0].path

                    const url_front = await idenRegF(iF)
                    const url_back = await idenRegB(iB)

                    Identity.updateOne({ _id: req.params.user_id }, { $set: { PanCard_front_side_img: url_front, PanCard_back_side_img: url_back } })
                        .exec((err, proRep) => {
                            if (err) {
                                res.json(err)
                            }
                            else {
                                fs.unlinkSync(iF)
                                fs.unlinkSync(iB)
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

exports.edit_doctor_identity = (req, res) => {
    Identity.updateOne({ _id: req.params.userId }, req.body, (err, updteUser) => {
        if (err) {
            res.json(err)
        }
        else {
            Up(req, res, function (err) {
                if (err) {
                    res.send({ code: 400, msg: 'file formart not support' })
                }
                else {
                    if (req.files.PanCard_front_side_img) {
                        console.log(req.files.PanCard_front_side_img)
                        for (row of req.files.PanCard_front_side_img) {
                            var p = row.path
                        }
                        const path = p
                        cloud.iden_front(path).then((resp) => {
                            fs.unlinkSync(path)
                            console.log(resp)
                            Identity.updateOne({ 'PanCard_front_side_img.imgId': req.body.imgId }, { $set: { "PanCard_front_side_img.$.url": resp.url, "PanCard_front_side_img.$.imgId": resp.imgId } })
                                .then((resPatient) => {
                                    res.json({ code: 200, msg: 'Doctor details update with Identity pancard front side image' })
                                }).catch((error) => {
                                    res.json({ code: 400, msg: 'pancard front side image not update' })
                                })
                        }).catch((err) => {
                            res.send(err)
                        })
                    }

                    else if (req.files.PanCard_back_side_img) {
                        console.log(req.files.PanCard_back_side_img)
                        for (row of req.files.PanCard_back_side_img) {
                            var p = row.path
                        }
                        const path = p
                        cloud.iden_back(path).then((resp) => {
                            fs.unlinkSync(path)
                            console.log(resp)
                            Identity.updateOne({ 'PanCard_back_side_img.imgId': req.body.imgId }, { $set: { "PanCard_back_side_img.$.url": resp.url, "PanCard_back_side_img.$.imgId": resp.imgId } })
                                .then((resPatient) => {
                                    res.json({ code: 200, msg: 'identity details update with Pancard back side image' })
                                }).catch((error) => {
                                    res.json({ code: 400, msg: 'pancard back side image not update' })
                                })
                        }).catch((err) => {
                            res.send(err)
                        })
                    }
                    else {
                        res.json({ code: 200, msg: 'identity details update successfully' })
                    }
                }
            })
        }
    })
}

