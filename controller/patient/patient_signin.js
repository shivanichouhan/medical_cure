// const Pat = require("../../model/patient/patient_signin")
const Patient = require("../../model/helth_worker/patient_registration")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const otp = require("../../otp")
var otpGenerator = require('otp-generator')
const _ = require('lodash')
const cloud = require("../../cloudinary")
const fs = require('fs')
const rat = require("../../model/Doctor/rating");
const add_disease = require("../../model/admin/add_disease")
const doctorSubcategory = require("../../model/Doctor/doctor_subcategory")
const response_time = require("../../model/Doctor/responce_time")
const rating = require("../../model/Doctor/rating")
var availabilityTime = require("../../model/Doctor/availability_hour")
const Doct = require("../../model/Doctor/doctor_regis")
// console.log(pets.includes('cat'));


function sorting(employees) {
    employees.sort((a, b) => {
        return a.resp_time - b.resp_time;
    });
}


async function checkResponseTime(Doctor_list) {
    console.log(Doctor_list)
    const array = []
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    await Promise.all(
        Doctor_list.map(async item => {
            console.log(item)
            const obj = {}
            const mon = await response_time.aggregate([
                {
                    $match: {
                        $and: [
                            // { doctor_id: item._id },
                            { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
                        ]
                    },
                }
                ,
                {
                    $group:
                    {
                        _id: null,
                        Response_rating: { $sum: "$Response_rating" }
                    }
                }
            ])
            const responceTime = mon[0]
            console.log(mon, "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
            obj.resp_time = responceTime.Response_rating
            obj.data = item
            array.push(obj)
            console.log(array, "dataaaaaaa")
        })).then(async(responce) => {
            console.log(responce, "respppppppppppppp")
            const resp_ar = []
            console.log(array)
            const sort_data =await sorting(array)
            // .then((sort_data)=>{
            // if()
            console.log(array, "lkjjkjiojiojioo,l",sort_data)
            const highest_data = sort_data[0]
            sort_data.forEach(item => {
                if (item.resp_time == highest_data.resp_time) {
                    resp_ar.push(item.data)
                }
            })
            return resp_ar

        })



    // })

}

function sorting1(employees) {
    employees.sort((a, b) => {
        return a.rating - b.rating;
    });
}

async function ratingCheck(Doctor_list) {
    const array = []
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    await Doctor_list.map(item => {
        const obj = {}
        rating.aggregate([
            {
                $match: {
                    // totalValue: {$sum: "$rating"},
                    $and: [
                        { doctor_id: item._id },
                        { $expr: { $gt: ["$date", { $toDate: dateInput }] } },
                    ]
                },
            },
            {
                $group:
                {
                    _id: null,
                    rating: { $sum: "$rating" }
                }
            }

        ]).then(err, monrating => {
            const ratingdata = monrating[0]

            obj.rating = ratingdata.rating
            obj.data = item
            array.push(obj)
        }).catch((err) => {
            res.send(err)
        })
    })

    const resp_ar = []
    const sort_data = sorting1(array)
    const highest_data = sort_data[0]
    sort_data.forEach(item => {
        if (item.rating == highest_data.rating) {
            resp_ar.push(item.data)
        }
    })
    return resp_ar


}

function sorting2(employees) {
    employees.sort((a, b) => {
        return a.availability_hour - b.availability_hour;
    });
}




function sorting3(employees) {
    employees.sort((a, b) => {
        return a.total_cases - b.total_cases;
    });
}


async function availability_hours() {
    const array = []
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    await Doctor_list.map(item => {
        const obj = {}
        availabilityTime.aggregate([
            {
                $match: {
                    $and: [
                        { doctor_id: item._id },

                        { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
                    ]
                },
            },
            {
                $group:
                {
                    _id: null,
                    availability_hour: { $sum: "$availability_hour" }
                }
            }
        ]).exec(err, availabilityTimes => {
            const availabilitydata = availabilityTimes[0]
            obj.availability_hour = availabilitydata.availability_hour
            obj.data = item
            array.push(obj)
        })
    })

    const resp_ar = []
    const sort_data = sorting2(array)
    const highest_data = sort_data[0]
    sort_data.forEach(item => {
        if (item.availability_hour == highest_data.availability_hour) {
            resp_ar.push(item.data)
        }
    })
    return resp_ar

}

async function FindByCases(doctor_list) {
    const array = []
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    await doctor_list.map(item => {
        const obj = {}
        Doct.aggregate([
            {
                $match: {
                    $and: [
                        { doctor_id: item._id },

                        { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
                    ]
                },
            }
        ]).then(err, Doctors => {
            const Doctorsdata = Doctors[0]
            obj.total_cases = Doctorsdata.total_cases
            obj.data = item
            array.push(obj)
        }).catch((err) => {
            res.send(err)
        })
    })


    const resp_ar = []
    const sort_data = sorting3(array)
    const highest_data = sort_data[0]
    sort_data.forEach(item => {
        if (item.total_cases == highest_data.total_cases) {
            resp_ar.push(item.data)
        }
    })
    return resp_ar


}

function sortDrByName(employees) {
    employees.sort((a, b) => {
        return a.username - b.username;
    });
}



async function find_duplicate_in_array(array, item_data) {
    const arraya = []
    array.forEach(item => {
        if (item.algorithm_index == item_data) {
            arraya.push(item)
        }
    })
    return arraya;

}



exports.doctor_find = async (req, res) => {
    const { patient_id } = req.body;
    console.log(req.body)
    const bcd_category = ["Dermatology", "GP/MBBS", "GP/Infections", "Venerology", "Leprosy", "Paediatrics", "Gynaecology", " General Medicine", "Family Medicine", "Ear, Nose and Throat", "Orthopaedics"]
    const e_category = ["Oncology", "Cardiology", "Neurology", "Psychiatry", "Endocrinology", "Gastroenterology", "Nephrology", "Pulmonology", "Urology"]

    const patient_data = await Patient.findOne({ _id: patient_id })
    const depart_ment_find = await add_disease.findOne({ disease_name: patient_data.disease })
    const depname = depart_ment_find.department_name
    if (patient_data.age > 15 && patient_data.disease == "Fever" || patient_data.disease == "Cough" || patient_data.disease == "Cold") {
        console.log(
            "aa categoryyyyyyy"
        )
        const A5categDr = await doctorSubcategory.findOne({ _id: "609bc851c1fe1147aede5443" }).populate("DoctorList")
        const drCheck = A5categDr.DoctorList
        if (drCheck.length == 0) {
            const A4categDr = await doctorSubcategory.findOne({ _id: "609bc84cc1fe1147aede5442" }).populate("DoctorList")
            const dr4Check = A4categDr.DoctorList
            if (dr4Check.length == 0) {

                const A3categDr = await doctorSubcategory.findOne({ _id: "609bc847c1fe1147aede5441" }).populate("DoctorList")
                const dr3Check = A3categDr.DoctorList
                if (dr3Check.length == 0) {
                    const A2categDr = await doctorSubcategory.findOne({ _id: "609bc83fc1fe1147aede5440" }).populate("DoctorList")
                    const dr2Check = A2categDr.DoctorList
                    if (dr2Check.length == 0) {
                        const A1categDr = await doctorSubcategory.findOne({ _id: "609bc72d94aeeb45c68636b4" })
                            .populate(
                                {
                                    path: 'DoctorList',
                                    match: { _id: "609cdb4c8e0993758b5411bc" },
                                    // select: 'name -_id',
                                    options: { sort: { algorithm_index: -1 }, limit: 5 }
                                }
                            )
                        const dr1Check = A1categDr.DoctorList
                        if (dr1Check.length == 0) {
                            res.json({ "dr": "dr not find in a1", "code": "A category", status: dr1Check })
                        } else {
                            const find_doctor_check = dr1Check[0]
                            const Doctor_list = await find_duplicate_in_array(dr1Check, find_doctor_check.algorithm_index)
                            console.log(Doctor_list, "lksssssss")
                            if (Doctor_list.length == 0) {
                                console.log("not same docot")
                            } else {
                                const findByrespTime = await checkResponseTime(Doctor_list)
                                if (findByrespTime.length > 1) {
                                    const findDrByRating = await ratingCheck(findByrespTime)
                                    if (findDrByRating.length > 1) {
                                        const availabilityResp = await availability_hours(findDrByRating)
                                        if (availabilityResp.length > 1) {
                                            // total_cases
                                            const totalCases = await FindByCases(availabilityResp)
                                            if (totalCases.length > 1) {
                                                const final_doctor = await sortDrByName(totalCases)
                                                const finallyDrByChar = final_doctor[0]
                                                console.log(finallyDrByChar)
                                            } else {
                                                console.log("doctor find by totalCases")

                                            }
                                        } else {
                                            console.log("doctor find by availability_hours")
                                        }
                                    } else {
                                        console.log("doctor find by rattings")

                                    }
                                } else {
                                    console.log("doctor find by responce time")


                                }
                                // const respTimeOfDoc =await response_time.findOne({doctor_id:})

                                console.log(" having same docot")

                            }
                            console.log(Doctor_list, "kjjkjkjijii")

                            res.json({ "dr": "dr not find in a1", "code": "A category", status: Doctor_list })

                        }

                    } else {

                        res.json({ "dr": "dr find in a2", "code": "A category", status: A1categDr })

                    }

                } else {
                    res.json({ "dr": "dr find in a3", "code": "A category", status: dr2Check })

                }

            } else {
                res.json({ "dr": "dr find in a4", "code": "A category", status: dr3Check })
            }


        } else {
            res.json({ "dr": "dr  find in a5", "code": "A category", status: dr4Check })
        }
        // } else {
        //     res.json({ "dr": "dr find in a5", "code": "A category", status: A5categDr })

        // }

    } else if (bcd_category.includes(depname)) {
        console.log("bbbbbbb")
        res.send("BCD category")

    } else if (e_category.includes(depname)) {
        console.log("e category")
        res.send("E category")
    } else {
        res.send("something went wrong")
    }
}




async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.patient_signup = async (req, res) => {
    const OTP = otpGenerator.generate(44, { digits: true, upperCase: false, specialChars: false, alphabets: false });
    console.log(req.body)
    const { user_name, email, mobile_number, password } = req.body;
    const hashedPassword = await hashPassword(password)
    const data_check = await Patient.findOne({ email: email })
    console.log(data_check)
    if (!data_check) {
        const datas = new Patient({
            user_name: user_name,
            email: email,
            mobile_number: mobile_number,
            password: hashedPassword,
        })
        datas.save()
            .then((resp) => {
                res.json({ code: 200, msg: resp })
            })

    } else {
        res.json({ code: 400, msg: "Email already exist" })
    }
}

exports.patient_Login = async (req, res) => {
    var { email, password } = req.body
    console.log(email)
    const patient = await Patient.findOne({ email: email })
    if (!patient) {
        res.json({
            code: 400,
            msg: 'Patient with that email does not exist. Please signup'
        })
    }
    else {
        console.log(patient)
        const validPassword = await validatePassword(password, patient.password)
        console.log(validPassword, '44')
        if (!validPassword) {
            res.json({ code: 400, msg: 'Password is not correct' })
        }
        else {
            const token = jwt.sign({ _id: patient._id }, process.env.JWT_SECRET)
            console.log(token)
            console.log(patient, patient.user_name)
            return res.json({ code: 200, token, msg: { user_name: patient.user_name, email: patient.email, patient_img: patient.patient_img } });
        }
    }
}

exports.facebook_Login = (req, res) => {
    const { email, gmailId, username, login_type, profile_pic } = req.body
    console.log("shubham  gmail data", req.body)
    if (login_type == "gmail") {
        Patient.findOne({ $or: [{ email: email }, { gmailId: gmailId }] })
            .then((resp) => {
                console.log(resp)
                if (resp) {
                    console.log('respone come')
                    res.json({ code: 200, msg: resp })
                }
                else {
                    console.log(req.body)
                    var pateintinfo = new Patient({
                        email: email,
                        gmailId: gmailId,
                        user_name: username,
                        patient_img: profile_pic

                    })
                    var Token = jwt.sign({ _id: pateintinfo._id }, process.env.JWT_SECRET)
                    pateintinfo.bearer_token = Token
                    console.log(pateintinfo, 'obj')
                    pateintinfo.save((err, Data) => {
                        if (err) {
                            res.send({ code: 400, msg: 'patient detail not add' })
                        }
                        else {
                            res.json({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                console.log(error)
                res.send({ code: 400, msg: 'data is empty' })
            })
    } else if (login_type == 'facebook') {
        Patient.findOne({ gmailId: gmailId })
            .then((resp) => {
                console.log('inside facebook')
                if (resp) {
                    res.json({ code: 200, msg: resp })
                }
                else {
                    console.log(req.body, 'inside')
                    var pateintobj = new Patient({
                        email: req.body.email,
                        gmailId: req.body.gmailId,
                        user_name: username,
                        patient_img: profile_pic
                    })
                    console.log(pateintobj)
                    var Token = jwt.sign({ _id: pateintobj._id }, process.env.JWT_SECRET)
                    pateintobj.bearer_token = Token
                    pateintobj.save((err, Data) => {
                        if (err) {
                            res.send({ code: 400, msg: 'patient detail not add' })
                        }
                        else {

                            res.send({ code: 200, msg: Data })
                        }
                    })
                }
            }).catch((error) => {
                console.log(error)
                res.json({ code: 400, msg: 'data is empty' })
            })
    }
}

exports.forget_otpSend = async (req, res) => {
    console.log(req.body)
    var str = req.body.forgetpass
    var patt1 = /^[0-9]*$/;
    if (str.match(patt1)) {
        Patient.findOne({ mobile: req.body.forgetpass })
            .exec((err, data) => {
                if (err || !data) {
                    res.json({ code: 400, error: 'this number does not exist' })
                }
                else {
                    const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
                    console.log(OTP, typeof OTP)
                    otp.send_otp(str, OTP).then((data) => {
                        Patient.findByIdAndUpdate({ mobile: str, p_reg: true }, { $set: { otp: OTP } }, (err, respdata) => {
                            if (err) {
                                res.json({ code: 400, msg: 'otp number not add in patient' })
                            }
                            else {
                                res.json({ code: 200, msg: "otp send successfully", patId: respdata._id })
                            }
                        })
                    }).catch((err) => {
                        res.send({ code: 400, msg: 'otp not send' })
                    })
                }
            })
    } else {
        console.log(str)
        var Email = await Patient.findOne({ email: str })
        if (!Email) {
            res.json({ code: 400, msg: 'this email id not exist' })
        } else {
            const otp_no = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
            console.log(otp_no, typeof OTP)
            otp.forget_email_otp(str, otp_no).then(async (res_data) => {
                var update_pat = await Patient.findByIdAndUpdate({ _id: Email._id }, { $set: { otp: otp_no } })
                if (update_pat) {
                    res.json({ code: 200, msg: 'otp send on email successfully', patId: update_pat._id })
                }
            }).catch((error) => {
                res.json({ code: 400, msg: 'otp not sent on email' })
                console.log(err)
            })
        }
    }
}

exports.forget_otpVerify = (req, res) => {
    console.log(req.body)
    Patient.findOne({ _id: req.body.patId })
        .exec((err, resp) => {
            if (err || !resp) {
                res.json({ code: 400, msg: 'this patient does not exist' })
            }
            else {
                if (resp.otp === req.body.otp) {
                    Patient.findOneAndUpdate({ _id: req.body.patId }, { $set: { otp: " " } }, (err, patUpdate) => {
                        if (err) {
                            res.json({ code: 400, msg: 'data not found' })
                        }
                        else {
                            res.json({ code: 200, patient_id: patUpdate._id, msg: 'otp verfiy successfully', patId: Patient._id })
                        }
                    })
                }
                else {
                    res.json({ code: 400, error: 'wrong otp' })
                }
            }
        })
}

exports.reg_otpSend = async (req, res) => {
    var patData = await Patient.findOne({ $and: [{ mobile: req.body.mobile }, { p_reg: true }] })
    if (patData) {
        res.json({ code: 400, msg: 'this mobile no already register' })
    }
    else {
        var patient = await Patient.findOne({ _id: req.body.patientId })
        if (patient) {
            const OTP = otpGenerator.generate(4, { digits: true, upperCase: false, specialChars: false, alphabets: false });
            otp.send_otp(req.body.mobile, OTP).then((result) => {
                Patient.updateOne({ _id: req.body.patientId }, { $set: { mobile: req.body.mobile, otp: OTP } },
                    (err, resp) => {
                        if (err) {
                            res.json({ code: 400, msg: 'mobile no is not add in patient' })
                        }
                        else {
                            res.json({ code: 200, msg: 'otp send successfully' })
                        }
                    })

            }).catch((error) => {
                console.log()
                res.json({ code: 400, msg: 'otp not sent' })
            })
        } else {
            res.json({ code: 400, msg: 'patient id not come' })
        }
    }
}




exports.reg_otpVerify = async (req, res) => {
    Patient.findOne({ _id: req.body.patientId })
        .exec((err, resp) => {
            if (err || !resp) {
                res.json({ code: 400, msg: 'wrong patient id' })
            }
            else {
                console.log(resp)
                if (resp.otp === req.body.otp) {
                    Patient.updateOne({ _id: resp._id }, { $set: { otp: '', mob_verify: true } }, (err, updtePatient) => {
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

exports.reg_patient = async (req, res) => {
    console.log(req.body)
    if (req.body.type == 'self') {
        var result = await Patient.findOne({ _id: req.body.patientId })
        if (result) {
            Patient.updateOne({ _id: req.body.patientId }, {
                reg_type: 'self',
                patient_id: result._id,
                age: req.body.age,
                gender: req.body.gender,
                height: req.body.height,
                weight: req.body.weight,
                patient_name: req.body.patient_name,
                p_reg: true
            }, (err, resp) => {
                if (err) {
                    res.json({ code: 400, msg: 'self patient is not register' })
                }
                else {
                    res.json({ code: 200, msg: 'self patient register successfully' })
                }
            })
        } else {
            res.json({ code: 400, msg: 'patient id is not come' })
        }
    }
    else if (req.body.type == 'other') {
        console.log('run')
        var patObj = new Patient(req.body)
        patObj.patient_id = req.body.patientId
        patObj.reg_type = 'other'
        patObj.p_reg = true
        console.log(patObj)
        patObj.save((err, resp) => {
            if (err) {
                res.json({ code: 400, msg: 'other patient is not register' })
            } else {
                res.json({ code: 200, msg: 'other patient is register' })
            }
        })
    }
}

exports.passwordupdate = async (req, res) => {
    console.log(req.body.password, req.body.confirmPass)
    if (req.body.password === req.body.confirmPass) {
        const Password = await hashPassword(req.body.password)
        Patient.findByIdAndUpdate(req.body.patient_id, { $set: { password: Password } },
            (err, passupdate) => {
                if (err) {
                    res.json({ code: 400, error: 'password does not update' })
                }
                else {
                    res.json({ code: 200, msg: 'password update successfully' })
                }
            })
    }
    else {
        res.json({ code: 400, error: 'password does not match' })
    }
}

exports.edit_patient = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    Patient.updateOne({ _id: req.body.patientId }, req.body, (err, resp) => {
        if (err) {
            res.json({ code: 400, msg: 'patient details not update' })
        }
        else {
            if (req.file) {
                const { path } = req.file
                console.log(path)
                cloud.patient(path).then((patImg) => {
                    fs.unlinkSync(path)
                    console.log(patImg)
                    Patient.updateOne({ _id: req.body.patientId }, { $set: { patient_img: patImg.url } }, (err, resp) => {
                        if (err) {
                            res.json({ code: 400, msg: 'patient img not update' })
                        }
                        else {
                            res.json({ code: 200, msg: 'patient detail update with image' })
                        }
                    })

                }).catch((error) => {
                    res.json({ code: 400, msg: 'img url not create' })
                })

            } else {
                res.json({ code: 200, msg: 'patient details update successfully' })
            }
        }
    })
}

exports.other_patient = async (req, res) => {
    var data = await Patient.find({ $and: [{ patient_id: req.params.patient_id }, { reg_type: 'other' }] })
    if (data.length > 0) {
        res.json({ code: 200, msg: data })
    } else {
        res.json({ code: 400, msg: 'other patient data not found' })
    }
}

exports.rating = (req, res) => {
    var ratObj = new rat({
        doctor_id: req.body.doctor_id,
        rating: req.body.rating,
        patient_id: req.body.patient_id
    })
    ratObj.date = new Date()
    console.log(ratObj)
    ratObj.save((err, resp) => {
        if (err) {
            res.send({ code: 400, msg: 'rating detail not add' })
        } else {
            res.send({ code: 200, msg: 'rating add successfully' })
        }
    })
}
