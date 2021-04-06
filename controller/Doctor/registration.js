const Register = require('../../model/Doctor/doctor_regis')
const cloud = require("../../cloudinary")

exports.doctor_reg = (req, res) => {
    Register.findByIdAndUpdate({ _id: req.params.user_id }, { $set: req.body },
        ((err, resp) => {
            if (err) {
                res.json({code:400,msg:"not update ragister"})
            }
            else {
                console.log(err)
                res.json({code:200,msg:resp._id})            }
        }))
}

exports.reg_list = (req, res) => {
    //console.log(req.params._id)
    Register.findOne({ _id: req.params.user_id })
        .exec((err, List) => {
            if (err) {
                res.json(err)
            }
            else {

                res.json(List)
            }
        })
}


exports.edit_regis_list = (req, res) => {
    console.log(req.body)
    Register.updateOne({ _id: req.params.user_id }, req.body)
        .exec((err, updtedoctor) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
            else {
                console.log(req.files, "hgghfthftyfuyfit")
                if (req.files.length > 0) {
                    console.log("shubham")
                    for (row of req.files) {
                        console.log(row)
                        var p = row.path
                    }
                    const path = p
                    console.log(path)
                    cloud.Certificate(path).then((resp) => {
                        console.log(req.body)
                        console.log(resp)
                        Register.updateOne({ 'certificate.imgId': req.body.imgId }, { $set: { "certificate.$.url": resp.url, "certificate.$.imgId": resp.imgId } })
                            .exec((err, doctorUpdte) => {
                                if (err) {
                                    console.log(err)
                                    res.json(err)
                                }
                                else {
                                    res.json({ doctorUpdte })
                                }
                            })
                    }).catch((error) => {
                        res.json(error)
                    })
                }
                else {
                    res.json({ msg: 'Doctor details updated successfully' })
                }
            }
        })
}


exports.remove_doctor = (req, res) => {
    Register.remove({ _id: req.params.user_id }, (err, del_doc) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(del_doc)
        }
    })
}




