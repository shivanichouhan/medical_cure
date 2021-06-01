const docReg = require("../../../model/Doctor/doctor_regis")
const cloud = require("../../../cloudinary")
const fs = require("fs")
const path = require("path")
const bcrypt = require('bcryptjs')

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

exports.docInfod = (req, res) => {
    docReg.find({ _id: req.params.docId }).exec((err, resp) => {
        if (err) {
            res.send({ error: 'doctor details not get' })
            console.log(err)
        } else {
            res.send(resp)
        }
    })
}

exports.doctorByName = (req, res) => {
    const { search } = req.body
    if (search) {
        var blog_name = new RegExp('^' + search, 'i');
        var findQuery = { $or: [{ username: { $regex: blog_name } }, { mobile_number: blog_name }] }
        docReg.find(findQuery).exec((err, resp) => {
            if (err) {
                res.send({ error: 'doctor details not get' })
                console.log(err)
            } else {
                res.send(resp)
            }
        })
    } else {
        res.send("something went wrong")
    }
}

exports.doc_signup = async (req, res) => {
    console.log(req.body)
    const { first_name, Specialization, mobile_number, email, password } = req.body;

    const hashedPassword = await hashPassword(password)
    const data_check = await docReg.findOne({ email: email })
    if (!data_check) {
        const datas = new docReg({
            first_name: first_name,
            Specialization: Specialization,
            mobile_number: mobile_number,
            email: email,
            password: hashedPassword
        })
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 200, msg: "Email already exist" })
    }

}

exports.reg_doctor = async (req, res) => {
    console.log(req.body)
    console.log(req.files)

    docReg.findOne({ phone_number: req.body.phone_number })
        .exec((err, resp) => {
            if (err) {
                res.send({ code: 400, msg: 'data not found' })
            }
            else {
                if (!resp) {
                    var docObj = new docReg(req.body)
                    docObj.save(async (err, regDoc) => {
                        if (err) {
                            console.log(err)
                            res.json({ code: 400, msg: 'doctor details not save' })
                        }
                        else {
                            if (Object.entries(req.files).length != 0) {

                                var Certificate = []
                                var Lic_f = []
                                var Lic_b = []
                                var Ide_f = []
                                var Ide_b = []

                                if (req.files.certificate_Img) {
                                    const doc_cer = req.files.certificate_Img
                                    const p1 = doc_cer[0].path
                                    const docreg = async (path) => await cloud.doctor_reg(path)
                                    const url_cer = await docreg(p1)
                                    Certificate.push(url_cer)
                                    fs.unlinkSync(p1)
                                }

                                const lic_front = req.files.License_img_front_side
                                const lic_back = req.files.License_img_back_side
                                const identity_front = req.files.identity_front_side_img
                                const identity_back = req.files.identity_back_side_img


                                const front_lic = async (path) => await cloud.licence_front(path)
                                const back_lic = async (path) => await cloud.licence_back(path)
                                const identiy_front = async (path) => await cloud.iden_front(path)
                                const identiy_back = async (path) => await cloud.iden_back(path)


                                const p2 = lic_front[0].path
                                const p3 = lic_back[0].path
                                const p5 = identity_front[0].path
                                const p6 = identity_back[0].path


                                const lice_front = await front_lic(p2)
                                const lice_back = await back_lic(p3)
                                const iden_front = await identiy_front(p5)
                                const iden_back = await identiy_back(p6)

                                Lic_f.push(lice_front)
                                Lic_b.push(lice_back)
                                Ide_f.push(iden_front)
                                Ide_b.push(iden_back)

                                console.log(Certificate, Lic_f, Lic_b, Ide_f, Ide_b)

                                fs.unlinkSync(p2)
                                fs.unlinkSync(p3)
                                fs.unlinkSync(p5)
                                fs.unlinkSync(p6)

                                docReg.findByIdAndUpdate(regDoc._id, {
                                    $push: {
                                        License_img_front_side: Lic_f,
                                        License_img_back_side: Lic_b,
                                        identity_front_side_img: Ide_f,
                                        identity_back_side_img: Ide_b,
                                        certificate_Img: Certificate
                                    }, $set: { register: "1" }
                                }).exec((err, resDoc) => {
                                    if (err) {
                                        res.send({ code: 400, msg: 'images not add in doctor' })
                                    }
                                    else {
                                        res.send({ code: 200, data: resDoc })
                                    }
                                })
                            }
                            else {
                                console.log('file not come')
                                res.send({ code: 200, data: regDoc })
                            }
                        }
                    })
                }
                else {
                    res.send({ code: 400, msg: 'doctor already register' })
                }
            }
        })
}

exports.list_doctor = (req, res) => {
    docReg.find({ register: 1 }).exec((err, doctor_list) => {
        if (err) {
            res.send('doctor list not found')
        }
        else {
            console.log(doctor_list.length)

            res.send(doctor_list)
        }
    })
}


exports.pagination_list_doctor = (req, res) => {
    var _pageNumber = req.body.pageNumber,
        _pageSize = 10;
    docReg.find({ register: 1 })
        .skip(_pageNumber > 0 ? ((_pageNumber - 1) * _pageSize) : 0)
        .limit(_pageSize)
        .exec((err, doctor_list) => {
            if (err) {
                res.send('doctor list not found')
            }
            else {
                console.log(doctor_list.length)
                res.send(doctor_list)
            }
        })
}


// if (req.files.clinic) {
//     console.log(req.files.clinic)
//     for (row of req.files.clinic) {
//         var p = row.path
//     }
//     const path = p
//     cloud.Clinic(path).then((resp) => {
//         fs.unlinkSync(path)
//         console.log(resp)
//         User.updateOne({ 'clinic_img.imgId': req.body.imgID }, { $set: { "clinic_img.$.url": resp.url, "clinic_img.$.imgId": resp.imgId } })
//             .then((resPatient) => {
//                 res.json({ code: 200, msg: 'user details update with clinic image' })
//             }).catch((error) => {
//                 res.json({ code: 400, msg: 'clinic image not update' })
//             })
//     }).catch((err) => {
//         res.send({ code: 400, msg: 'image url not create' })
//     })
// }

exports.edit_doctor = (req, res) => {
    console.log(req.body)
    var file = req.files
    var ary = []
    ary.push(file)
    console.log(ary)
    docReg.updateOne({ _id: req.params.doctorId }, req.body)
        .exec(async (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                if (req.files) {
                    if (Object.entries(req.files).length != 0) {
                        await Promise.all(ary.map(async (File) => {
                            console.log(File, 'inside img')

                            if (File.certificate_Img) {
                                var Certificate = []
                                const doc_cer = req.files.certificate_Img
                                const p1 = doc_cer[0].path
                                const docreg = async (path) => await cloud.doctor_reg(path)
                                const url_cer = await docreg(p1)
                                Certificate.push(url_cer)
                                console.log('img', url_cer)
                                fs.unlinkSync(p1)
                                var cer_update = await docReg.updateOne({ 'certificate_Img.imgId': req.body.certificate_imgId }, { $set: { "certificate_Img.$.url": url_cer.url, "certificate_Img.$.imgId": url_cer.imgId } })
                                if (cer_update) {
                                    console.log('certificate img update')
                                } else {
                                    console.log('certificate img not update')
                                }
                            }

                            if (File.License_img_front_side) {
                                const lic_front = req.files.License_img_front_side
                                console.log('licencePic', lic_front)
                                const p2 = lic_front[0].path
                                const front_lic = async (path) => await cloud.licence_front(path)
                                const lice_front = await front_lic(p2)
                                fs.unlinkSync(p2)

                                var l_f_update = await docReg.updateOne({ 'License_img_front_side.imgId': req.body.lic_fornt_imgId }, { $set: { "License_img_front_side.$.url": lice_front.url, "License_img_front_side.$.imgId": lice_front.imgId } })
                                if (l_f_update) {
                                    console.log('licence front  img update')
                                } else {
                                    console.log('licence img not update')
                                }
                            }

                            if (File.License_img_back_side) {
                                const lic_back = req.files.License_img_back_side
                                console.log('licencePic', lic_back)
                                const p3 = lic_back[0].path
                                const front_lic = async (path) => await cloud.licence_back(path)
                                const lice_back = await front_lic(p3)
                                fs.unlinkSync(p3)

                                var l_b_update = await docReg.updateOne({ 'License_img_back_side.imgId': req.body.lic_back_imgId }, { $set: { "License_img_back_side.$.url": lice_back.url, "License_img_back_side.$.imgId": lice_back.imgId } })
                                if (l_b_update) {
                                    console.log('licence back  img update')
                                } else {
                                    console.log('licence back img not update')
                                }
                            }

                            if (File.identity_front_side_img) {
                                const identity_front = req.files.identity_front_side_img
                                console.log('licencePic', identity_front)
                                const p4 = identity_front[0].path
                                const identiy_front = async (path) => await cloud.iden_front(path)
                                const iden_front = await identiy_front(p4)
                                fs.unlinkSync(p4)

                                var iden_f_update = await docReg.updateOne({ 'identity_front_side_img.imgId': req.body.Iden_f_imgId }, { $set: { "identity_front_side_img.$.url": iden_front.url, "identity_front_side_img.$.imgId": iden_front.imgId } })
                                if (iden_f_update) {
                                    console.log('identity front  img update')
                                } else {
                                    console.log('identity front img not update')
                                }
                            }

                            if (File.identity_back_side_img) {
                                const identity_back = req.files.identity_back_side_img
                                console.log('licencePic', identity_front)
                                const p5 = identity_back[0].path
                                const identiy_back = async (path) => await cloud.iden_back(path)
                                const iden_back = await identiy_back(p5)
                                fs.unlinkSync(p5)

                                var iden_b_update = await docReg.updateOne({ 'identity_back_side_img.imgId': req.body.Iden_b_imgId }, { $set: { "identity_back_side_img.$.url": iden_back.url, "identity_back_side_img.$.imgId": iden_back.imgId } })
                                if (iden_f_update) {
                                    console.log('identity back  img update')
                                } else {
                                    console.log('identity back img not update')
                                }
                            }

                        })).then((resp) => {
                            res.send({ code: 200, msg: 'doctor detail with img update' })
                        }).catch((error) => {
                            console.log(error)
                            res.send({ code: 400, msg: 'doctor detail update but not img update' })
                        })
                    }
                    else {
                        console.log('file not come')
                        res.send({ code: 200, msg: 'doctor details update successfully' })
                    }
                }
                else {
                    res.json({ code: 200, msg: 'doctor details update successfully' })
                }
            }
        })
}

exports.status_manage = (req, res) => {
    if (req.body.status === 0) {
        docReg.updateOne({ _id: req.body.doctorId }, { $set: { status: 1 } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    }
    else if (req.body.status === 1) {
        docReg.updateOne({ _id: req.body.doctorId }, { $set: { status: 0 } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    }
}

exports.remove_doctor = (req, res) => {
    docReg.remove({ _id: req.params.doctorId }, (err, removeDoc) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(removeDoc)
        }
    })
}