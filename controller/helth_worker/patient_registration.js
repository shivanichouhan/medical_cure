const patient = require("../../model/helth_worker/patient_registration")
const health = require("../../model/helth_worker/users")
const _ = require("lodash")
const cloud = require("../../cloudinary")
const otp = require("../../otp")
const otpGenerator = require('otp-generator')
const helth_workers = require("../../model/helth_worker/users")

const fs = require('fs')
const { response } = require("express")

exports.appoinment_status = (req, res) => {
    patient.aggregate([
        { "$match": { health_worker_id: req.params.userId } },
        {
            "$group": {
                _id: "$status",
                list: {
                    $push: {
                        patient_name: "$patient_name",
                        patient_img: "$patient_img",
                        health_worker_name: "$health_worker_name",
                        disease: "$disease",
                        location: "$location"
                    }
                },
            }
        }
    ]).exec((err, resp) => {
        if (err) {
            res.json({ code: 400, msg: 'patient appoinment status not found' })
        }
        else {
            res.json({ code: 200, msg: resp })
        }
    })
}

exports.search_patient = (req, res) => {
    console.log(req.params.userId)
    var filter = {
        $and: [{ health_worker_id: req.params.userId },
        { $and: [{ $or: [{ mob_verify: true }, { mobile: req.body.search, patient_name: req.body.search }] }] }]
    }
    patient.find(filter)
        .exec((err, resp) => {
            if (err) {
                res.json({ code: 400, msg: 'patient list not found' })
            }
            else {
                res.json({ code: 200, msg: resp })
            }
        })
}

exports.patient_list = (req, res) => {
    patient.find({ $and: [{ health_worker_id: req.params.userId }, { p_reg: true }] })
        .exec((err, List) => {
            if (err) {
                res.json({ code: 400, msg: 'patient list not found' })
            }
            else {

                res.json({ code: 200, msg: List })
            }
        })
}

exports.create = async (req, res) => {
    var Health = await health.findOne({ _id: req.params.userId })
    if (Health) {
        const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
        otp.send_otp(req.body.mobile, OTP).then((resp) => {
            var patObj = new patient(req.body)
            patObj.health_worker_id = req.params.userId
            patObj.patient_id = patObj._id
            patObj.otp = OTP,
                patObj.health_worker_name = Health.username
            patObj.location = Health.city
            patObj.save((err, data) => {
                if (err) {
                    res.json({ code: 400, msg: 'patient detail not save' })
                    console.log(err)
                }
                else {
                    res.json({ code: 200, msg: 'otp send successfully', Data: data })
                }
            })

        }).catch((err) => {
            res.json({ code: 400, msg: 'otp not sent' })
        })
    }
    else {
        res.json({ code: 400, msg: 'health worker data not found' })
    }
}

exports.patient_verfiy = (req, res) => {
    patient.findOne({ _id: req.params.patientId })
        .exec((err, resp) => {
            if (err || !resp) {
                res.json({ code: 400, msg: 'wrong patient id' })
            }
            else {
                console.log(resp)
                if (resp.otp === req.body.otp) {
                    patient.updateOne({ _id: resp._id }, { $set: { otp: '', mob_verify: true } }, (err, updtePatient) => {
                        if (err) {
                            res.json({ code: 400, msg: 'phone no is verify' })
                        }
                        else {
                            res.json({ code: 200, msg: 'otp verify success', patient_id: resp._id })
                        }
                    })
                }
                else {
                    res.json({ code: 400, msg: 'wrong otp' })
                }
            }
        })
}

exports.patient_info = (req, res) => {
    console.log(req.file)
    if (req.file) {
        cloud.patient(req.file.path).then((resp) => {
            fs.unlinkSync(req.file.path)
            console.log(resp.url)
            patient.updateOne({ _id: req.params.patientId }, {
                $set: {
                    age: req.body.age,
                    gender: req.body.gender,
                    height: req.body.height,
                    weight: req.body.weight,
                    patient_img: resp.url,
                    p_reg: true,
                }
            }).then((pat) => {
                res.json({ code: 200, msg: 'patient register successfully' })
            }).catch((error) => {
                res.json({ code: 400, msg: 'patient details is not save' })
            })
        }).catch((err) => {
            res.json({ code: 400, msg: 'image url not create' })
        })
    }
    else {
        res.json({ code: 400, msg: 'patient image not come' })
    }

}

exports.doctor_reg = (req, res) => {
    Register.findByIdAndUpdate({ _id: req.params.user_id }, { $set: req.body },
        ((err, resp) => {
            if (err) {
                res.json({ code: 400, msg: "not update ragister" })
            }
            else {
                console.log(err)
                res.json({ code: 200, msg: resp._id })
            }
        }))
}


exports.status_patient = (req, res) => {
    const { doctor_id } = req.body
    const arr = []
    patient.find({ $and: [{ status: "ongoing", doctor_id: doctor_id }] })
        .exec(async (err, List) => {
            if (err) {
                res.json({ code: 400, msg: 'patient list not found' })
            }
            else {
                await Promise.all(List.map(async (items) => {
                    const obj = {}
                    const helth_workerdata = await helth_workers.findOne({ _id: items.health_worker_id })
                    obj.helthwork_username = helth_workerdata.username;
                    obj.health_worker_id = helth_workerdata._id
                    obj.patient_id = items._id
                    obj.patient_name = items.patient_name
                    obj.status = items.status
                    obj.createdAt = items.createdAt
                    obj.patient_img = items.patient_img
                    obj.mobile = items.mobile,
                        obj.disease = "High Blood Sugar"
                    obj.address = " "
                    obj.doctor_id = doctor_id
                    arr.push(obj)
                })).then((response) => {
                })
                res.json({ code: 200, msg: arr })
            }
        })
}

// http://148.72.214.135
