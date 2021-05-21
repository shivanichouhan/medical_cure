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
const forPatientDoctor = require("../../model/Doctor/doctor_forPatient_list")
const helthworkers = require("../../model/helth_worker/users")
const not = require("../../model/Doctor/notification")
var notification_firebase = require("../../firebase_notification")

// function sorting(employees) {

// }


async function checkResponseTime(Doctor_list, callback) {
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
            obj.resp_time = responceTime.Response_rating
            obj.data = item
            array.push(obj)
        })).then(async (responce) => {
            const resp_ar = []
            const sort_data = await array.sort((a, b) => {
                return a.resp_time - b.resp_time;
            });

            console.log(array, "lkjjkjiojiojioo,l", sort_data)
            const highest_data = sort_data[0]
            await sort_data.map(item => {
                if (item.resp_time == highest_data.resp_time) {
                    console.log(highest_data.resp_time)
                    resp_ar.push(item.data)
                }
            })
            // console.log(resp_ar, "SSSSSSSSSSSSSSSSSSSSSSSS")
            callback(resp_ar)
        })
}


async function ratingCheck(Doctor_list, callback) {
    const array = []
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    await Promise.all(
        Doctor_list.map(async (item) => {
            const obj = {}
            const monrating = await rating.aggregate([
                {
                    $match: {
                        // totalValue: {$sum: "$rating"},
                        $and: [
                            // { doctor_id: item._id },
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

            ])
            const ratingdata = monrating[0]
            // console.log(item, "GGGGGGGGGgg", monrating)
            obj.rating = ratingdata.rating
            obj.data = item
            array.push(obj)
        })).then(async (responce) => {
            console.log(array, "WWWWWWWWWWWWWWWWWWWWWWWWWW")
            const resp_ar = []
            const sort_data = await array.sort((a, b) => {
                return a.rating - b.rating;
            });
            const highest_data = sort_data[0]
            sort_data.forEach(item => {
                if (item.rating == highest_data.rating) {
                    resp_ar.push(item.data)
                }
            })
            console.log(resp_ar, "sss")
            callback(resp_ar)
        })

}




async function availability_hours(Doctor_list, callback) {
    const array = []
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    await Promise.all(
        Doctor_list.map(async (item) => {
            const obj = {}
            const availabilityTimes = await availabilityTime.aggregate([
                {
                    $match: {
                        $and: [
                            // { doctor_id: item._id },

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
            ])
            const availabilitydata = availabilityTimes[0]
            obj.availability_hour = availabilitydata.availability_hour
            obj.data = item
            array.push(obj)
        })).then(async (responce) => {
            const resp_ar = []
            const sort_data = await array.sort((a, b) => {
                return a.availability_hour - b.availability_hour;
            });
            const highest_data = sort_data[0]
            await sort_data.forEach(item => {
                if (item.availability_hour == highest_data.availability_hour) {
                    resp_ar.push(item.data)
                }
            })
            callback(resp_ar)
        })

}

async function FindByCases(doctor_list, callback) {
    const array = []
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    await Promise.all(
        doctor_list.map(async (item) => {
            const obj = {}
            const Doctors = await Doct.aggregate([
                {
                    $match: {
                        $and: [
                            // { doctor_id: item._id },
                            { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
                        ]
                    },
                }
            ])
            console.log(Doctors, "klklkkooooo")
            const Doctorsdata = Doctors[0]
            obj.total_cases = Doctorsdata.total_cases
            obj.data = item
            array.push(obj)
        })).then(async (responce) => {
            const resp_ar = []
            const sort_data = await array.sort((a, b) => {
                return a.total_cases - b.total_cases;
            });
            const highest_data = sort_data[0]
            await sort_data.forEach(item => {
                if (item.total_cases == highest_data.total_cases) {
                    resp_ar.push(item.data)
                }
            })
            callback(resp_ar)
        })
}

async function sortDrByName(employees, callback) {
    const data = await employees.sort((a, b) => {
        return a.username - b.username;
    });
    callback(data)
}


async function DoctorDetailsCheck(dr1Check, find_doctor_check, callback) {
    await find_duplicate_in_array(dr1Check, find_doctor_check.algorithm_index, async function (Doctor_list) {

        console.log(Doctor_list, "lksssssss")
        if (Doctor_list.length > 1) {
            await checkResponseTime(Doctor_list, async function (findByrespTime) {
                if (findByrespTime.length > 1) {
                    await ratingCheck(findByrespTime, async function (findDrByRating) {
                        if (findDrByRating.length > 1) {
                            await availability_hours(findDrByRating, async function (availabilityResp) {
                                if (availabilityResp.length > 1) {
                                    await FindByCases(availabilityResp, async function (totalCases) {
                                        if (totalCases.length > 1) {
                                            await sortDrByName(totalCases, async function (final_doctor) {
                                                const finallyDrByChar = final_doctor[0]
                                                callback({ "dr": "dr find in a1", "code": "A category", status: finallyDrByChar })
                                                // console.log(finallyDrByChar)
                                                // res.json({ "dr": "dr not find in a1", "code": "A category", status: finallyDrByChar })
                                            })
                                        } else {
                                            callback({ "dr": "doctor find by totalCases", "code": "A category", status: totalCases })

                                            // res.json({ "dr": "doctor find by totalCases", "code": "A category", status:  })

                                            console.log("doctor find by totalCases")

                                        }
                                    })
                                } else {
                                    // res.json({ "dr": "doctor find by availability_hours", "code": "A category", status: availabilityResp })
                                    callback({ "dr": "doctor find by availability_hours", "code": "A category", status: availabilityResp })

                                    console.log("doctor find by availability_hours")
                                }
                            })
                        } else {
                            callback({ "dr": "doctor find by rattings", "code": "A category", status: findDrByRating })
                            console.log("doctor find by rattings")

                        }
                    })
                } else {
                    callback({ "dr": "doctor find by responce time", "code": "A category", status: findByrespTime })

                    // res.json({ "dr": "doctor find by responce time", "code": "A category", status: findByrespTime })

                    console.log("doctor find by responce time")
                }
                console.log(" having same docot")
            })

        } else {
            callback({ "dr": "not same docot", "code": "A category", status: Doctor_list })

            console.log(Doctor_list, "kjjkjkjijii")
            console.log("not same docot")
            // res.json({ "dr": "not same docot", "code": "A category", status: Doctor_list })

        }

    })
}



function find_duplicate_in_array(array, item_data, callback) {
    const arraya = []
    array.forEach(item => {
        if (item.algorithm_index == item_data) {
            arraya.push(item)
        }
    })
    callback(arraya);

}

function setTimeOutFunction(doctor_id, callback) {
    setTimeout(
        Doct.updateOne({ _id: doctor_id }, { patient_status: "0" })
            .then((resp) => {
                callback("doctor refused")
            }).catch((err) => {
                console.log(err)
                callback(err)
            })
        , 600000);

}

function NotificationData(userdata, senderData, callback) {
    console.log(userdata.firebase_token,"tokennnnnnnnnnnn")
    var msg = {}
    var Notification = {}
    msg.to = userdata.firebase_token
    msg.collapse_key = 'XXX'
    msg.data = { my_key: 'my value', contents: "abcv/" }
    Notification.title = `${senderData.patient_name} has requested for Appointment.`
    Notification.body = senderData
    msg.notification = Notification
    notification_firebase.Notification(msg).then(async (resp) => {
        console.log(resp)
        var obj = {}
        obj.username = userdata.username
        obj.email = userdata.email
        obj.profile_pic = userdata.profile_pic
        obj.notification_text = `Doctor Has Send prescription To you.`
        obj.patient_id = senderData._id
        obj.docId = userdata._id;
        obj.notificationFor = "Doctor"
        var notObj = new not(obj)
        var notData = await notObj.save()
        callback(true)

    })
}


exports.doctor_find = async (req, res) => {
    const { patient_id } = req.body;
    console.log(req.body)
    const bcd_category = ["Dermatology", "Diabetology", "GP/MBBS", "GP/Infections", "Venerology", "Leprosy", "Paediatrics", "Gynaecology", " General Medicine", "Family Medicine", "Ear, Nose and Throat", "Orthopaedics"]
    const e_category = ["Oncology", "Cardiology", "Neurology", "Psychiatry", "Endocrinology", "Gastroenterology", "Nephrology", "Pulmonology", "Urology"]

    const patient_data = await Patient.findOne({ _id: patient_id })
    const depart_ment_find = await add_disease.findOne({ disease_name: patient_data.disease })
    const depname = depart_ment_find.department_name
    console.log(depname, "departmenttttttt",patient_data)

    const DoctorsArray = []

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
                                    // match: { _id: "609cdb4c8e0993758b5411bc" },
                                    // select: 'name -_id',
                                    options: { sort: { algorithm_index: -1 } }
                                }
                            )
                        const dr1Check = A1categDr.DoctorList
                        if (dr1Check.length == 0) {
                            res.json({ "dr": "dr not find in a1", "code": "A category", status: dr1Check })
                        } else {
                            const find_doctor_check = dr1Check[0]
                            console.log()
                            console.log(find_doctor_check, "DDDDDDDDDDDDDDDDD")

                            await DoctorDetailsCheck(dr1Check, find_doctor_check, async function (doctorresp) {
                                const suitableDoctor = doctorresp.status[0]
                                // console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                if (dr1Check.length >= 5) {
                                    await dr1Check.map(async (items) => {
                                        const datapatient = new forPatientDoctor({
                                            doctor_id: items._id,
                                            patient_id: patient_id
                                        })
                                        if (items._id == suitableDoctor._id) {
                                            datapatient.Doctor_status = "1"
                                            await datapatient.save()
                                            console.log("kuchh nhi")
                                            DoctorsArray.push(items)
                                        } else if (DoctorsArray.length == 5) {
                                            // setTimeOutFunction(suitableDoctor._id, function (data) {
                                            //     console.log(data)
                                            // })


                                            NotificationData(suitableDoctor,patient_data,function(data){
                                                res.send(data)
                                            })

                                        } else {
                                            datapatient.Doctor_status = "0"
                                            await datapatient.save()
                                            DoctorsArray.push(items)
                                        }
                                    })
                                } else {
                                    await dr1Check.map(async (items) => {
                                        const datapatient = new forPatientDoctor({
                                            doctor_id: items._id,
                                            patient_id: patient_id
                                        })
                                        console.log(items, "kkk")
                                        console.log(suitableDoctor._id, "kkkjjj")
                                        if (items._id == suitableDoctor._id) {
                                            datapatient.Doctor_status = "1"
                                            await datapatient.save()
                                            console.log("kuchh nhi")
                                            DoctorsArray.push(items)
                                        } else {
                                            datapatient.Doctor_status = "0"
                                            await datapatient.save()
                                            DoctorsArray.push(items)
                                        }
                                    })
                                    // setTimeOutFunction(suitableDoctor._id, function (data) {
                                    //     console.log(data)
                                    // })


                                    NotificationData(suitableDoctor,patient_data,function(data){
                                        res.send(data)
                                    })

                                }

                            })
                        }
                    } else {
                        const find_doctor_dr2Check = dr2Check[0]
                        await DoctorDetailsCheck(dr2Check, find_doctor_dr2Check, async function (doctorresp) {
                            // res.send(doctorresp)
                            const suitableDoctor = doctorresp.status[0]
                            console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                            if (dr2Check.length >= 5) {
                                await dr2Check.map(async (items) => {
                                    const datapatient = new forPatientDoctor({
                                        doctor_id: items._id,
                                        patient_id: patient_id
                                    })
                                    if (items._id == suitableDoctor._id) {
                                        datapatient.Doctor_status = "1"
                                        await datapatient.save()
                                        console.log("kuchh nhi")
                                        DoctorsArray.push(items)
                                    } else if (DoctorsArray.length == 5) {
                                        setTimeOutFunction(suitableDoctor._id, function (data) {
                                            console.log(data)
                                        })
                                        res.send(doctorresp)

                                    } else {
                                        datapatient.Doctor_status = "0"
                                        await datapatient.save()
                                        DoctorsArray.push(items)
                                    }
                                })
                            } else {
                                await dr2Check.map(async (items) => {
                                    const datapatient = new forPatientDoctor({
                                        doctor_id: items._id,
                                        patient_id: patient_id
                                    })
                                    console.log(items, "kkk")
                                    console.log(suitableDoctor._id, "kkkjjj")
                                    if (items._id == suitableDoctor._id) {
                                        datapatient.Doctor_status = "1"
                                        await datapatient.save()
                                        console.log("kuchh nhi")
                                        DoctorsArray.push(items)
                                    } else {
                                        datapatient.Doctor_status = "0"
                                        await datapatient.save()
                                        DoctorsArray.push(items)
                                    }
                                })
                                await setTimeOutFunction(suitableDoctor._id, function (data) {
                                    console.log(data)
                                })
                                res.send(doctorresp)
                            }
                        })
                    }

                } else {
                    const find_doctor_dr3Check = dr3Check[0]
                    await DoctorDetailsCheck(dr3Check, find_doctor_dr3Check, async function (doctorresp) {
                        const suitableDoctor = doctorresp.status[0]
                        console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                        if (dr3Check.length >= 5) {
                            await dr3Check.map(async (items) => {
                                const datapatient = new forPatientDoctor({
                                    doctor_id: items._id,
                                    patient_id: patient_id
                                })
                                if (items._id == suitableDoctor._id) {
                                    datapatient.Doctor_status = "1"
                                    await datapatient.save()
                                    console.log("kuchh nhi")
                                    DoctorsArray.push(items)
                                } else if (DoctorsArray.length == 5) {
                                    setTimeOutFunction(suitableDoctor._id, function (data) {
                                        console.log(data)
                                    })
                                    res.send(doctorresp)

                                } else {
                                    datapatient.Doctor_status = "0"
                                    await datapatient.save()
                                    DoctorsArray.push(items)
                                }
                            })
                        } else {
                            await dr3Check.map(async (items) => {
                                const datapatient = new forPatientDoctor({
                                    doctor_id: items._id,
                                    patient_id: patient_id
                                })
                                console.log(items, "kkk")
                                console.log(suitableDoctor._id, "kkkjjj")
                                if (items._id == suitableDoctor._id) {
                                    datapatient.Doctor_status = "1"
                                    await datapatient.save()
                                    console.log("kuchh nhi")
                                    DoctorsArray.push(items)
                                } else {
                                    datapatient.Doctor_status = "0"
                                    await datapatient.save()
                                    DoctorsArray.push(items)
                                }
                            })
                            await setTimeOutFunction(suitableDoctor._id, function (data) {
                                console.log(data)
                            })
                            res.send(doctorresp)
                        }
                    })
                    // res.json({ "dr": "dr find in a3", "code": "A category", status: dr2Check })
                }

            } else {
                const find_doctor_dr4Check = dr3Check[0]
                await DoctorDetailsCheck(dr4Check, find_doctor_dr4Check, async function (doctorresp) {


                    const suitableDoctor = doctorresp.status[0]
                    console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                    if (dr4Check.length >= 5) {
                        await dr4Check.map(async (items) => {
                            const datapatient = new forPatientDoctor({
                                doctor_id: items._id,
                                patient_id: patient_id
                            })
                            if (items._id == suitableDoctor._id) {
                                datapatient.Doctor_status = "1"
                                await datapatient.save()
                                console.log("kuchh nhi")
                                DoctorsArray.push(items)
                            } else if (DoctorsArray.length == 5) {
                                setTimeOutFunction(suitableDoctor._id, function (data) {
                                    console.log(data)
                                })
                                res.send(doctorresp)

                            } else {
                                datapatient.Doctor_status = "0"
                                await datapatient.save()
                                DoctorsArray.push(items)
                            }
                        })
                    } else {
                        await dr4Check.map(async (items) => {
                            const datapatient = new forPatientDoctor({
                                doctor_id: items._id,
                                patient_id: patient_id
                            })
                            console.log(items, "kkk")
                            console.log(suitableDoctor._id, "kkkjjj")
                            if (items._id == suitableDoctor._id) {
                                datapatient.Doctor_status = "1"
                                await datapatient.save()
                                console.log("kuchh nhi")
                                DoctorsArray.push(items)
                            } else {
                                datapatient.Doctor_status = "0"
                                await datapatient.save()
                                DoctorsArray.push(items)
                            }
                        })
                        await setTimeOutFunction(suitableDoctor._id, function (data) {
                            console.log(data)
                        })
                        res.send(doctorresp)
                    }

                })
                // res.json({ "dr": "dr find in a4", "code": "A category", status: dr3Check })
            }
        } else {
            const find_doctor_drCheck = drCheck[0]
            await DoctorDetailsCheck(drCheck, find_doctor_drCheck, async function (doctorresp) {
                const suitableDoctor = doctorresp.status[0]
                console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                if (drCheck.length >= 5) {
                    await drCheck.map(async (items) => {
                        const datapatient = new forPatientDoctor({
                            doctor_id: items._id,
                            patient_id: patient_id
                        })
                        if (items._id == suitableDoctor._id) {
                            datapatient.Doctor_status = "1"
                            await datapatient.save()
                            console.log("kuchh nhi")
                            DoctorsArray.push(items)
                        } else if (DoctorsArray.length == 5) {
                            setTimeOutFunction(suitableDoctor._id, function (data) {
                                console.log(data)
                            })
                            res.send(doctorresp)

                        } else {
                            datapatient.Doctor_status = "0"
                            await datapatient.save()
                            DoctorsArray.push(items)
                        }
                    })
                } else {
                    await drCheck.map(async (items) => {
                        const datapatient = new forPatientDoctor({
                            doctor_id: items._id,
                            patient_id: patient_id
                        })
                        console.log(items, "kkk")
                        console.log(suitableDoctor._id, "kkkjjj")
                        if (items._id == suitableDoctor._id) {
                            datapatient.Doctor_status = "1"
                            await datapatient.save()
                            console.log("kuchh nhi")
                            DoctorsArray.push(items)
                        } else {
                            datapatient.Doctor_status = "0"
                            await datapatient.save()
                            DoctorsArray.push(items)
                        }
                    })
                    await setTimeOutFunction(suitableDoctor._id, function (data) {
                        console.log(data)
                    })
                    res.send(doctorresp)
                }
            })
        }

    } else if (bcd_category.includes(depname)) {
        console.log("BCD category")
        const D5categDr = await doctorSubcategory.findOne({ _id: "609bc8fec1fe1147aede544e" }).populate(
            {
                path: 'DoctorList',
                match: { $and: [{ Specialization: depname }] },
                // select: 'name -_id',
                options: { sort: { algorithm_index: -1 } }
            }
        )
        const drCheck = D5categDr.DoctorList
        if (drCheck.length == 0) {
            const C5categDr = await doctorSubcategory.findOne({ _id: "609bc8e9c1fe1147aede544d" }).populate(
                {
                    path: 'DoctorList',
                    match: { $and: [{ Specialization: depname }] },
                    // select: 'name -_id',
                    options: { sort: { algorithm_index: -1 } }
                }
            )
            const drC5Check = C5categDr.DoctorList
            if (drC5Check.length == 0) {
                const B5categDr = await doctorSubcategory.findOne({ _id: "609bc8b9c1fe1147aede5448" }).populate(
                    {
                        path: 'DoctorList',
                        match: { $and: [{ Specialization: depname }] },
                        // select: 'name -_id',
                        options: { sort: { algorithm_index: -1 } }
                    }
                )
                const drB5Check = B5categDr.DoctorList
                if (drB5Check.length == 0) {
                    const D4categDr = await doctorSubcateDoctorDetailsCheckgory.findOne({ _id: "609bc908c1fe1147aede544f" }).populate(
                        {
                            path: 'DoctorList',
                            match: { $and: [{ Specialization: depname }] },
                            // select: 'name -_id',
                            options: { sort: { algorithm_index: -1 } }
                        }
                    )
                    const drD4Check = D4categDr.DoctorList
                    if (drD4Check.length == 0) {
                        const C4categDr = await doctorSubcategory.findOne({ _id: "609bc8e4c1fe1147aede544c" })
                            .populate(
                                {
                                    path: 'DoctorList',
                                    match: { $and: [{ Specialization: depname }] },
                                    // select: 'name -_id',
                                    options: { sort: { algorithm_index: -1 } }
                                }
                            )
                        const drC4Check = C4categDr.DoctorList
                        if (drC4Check.length == 0) {
                            // res.json({ "dr": "dr not find in E1", "code": "E1 category", status: drC4Check })
                            const B4categDr = await doctorSubcategory.findOne({ _id: "609bc8b4c1fe1147aede5447" })
                                .populate(
                                    {
                                        path: 'DoctorList',
                                        match: { $and: [{ Specialization: depname }] },
                                        // select: 'name -_id',
                                        options: { sort: { algorithm_index: -1 } }
                                    }
                                )
                            const drB4Check = B4categDr.DoctorList
                            if (drB4Check.length == 0) {
                                const D3categDr = await doctorSubcategory.findOne({ _id: "609bc911c1fe1147aede5450" })
                                    .populate(
                                        {
                                            path: 'DoctorList',
                                            match: { $and: [{ Specialization: depname }] },
                                            // select: 'name -_id',
                                            options: { sort: { algorithm_index: -1 } }
                                        }
                                    )
                                const drD3Check = D3categDr.DoctorList
                                if (drD3Check.length == 0) {
                                    const C3categDr = await doctorSubcategory.findOne({ _id: "609bc8dec1fe1147aede544b" })
                                        .populate(
                                            {
                                                path: 'DoctorList',
                                                match: { $and: [{ Specialization: depname }] },
                                                // select: 'name -_id',
                                                options: { sort: { algorithm_index: -1 } }
                                            }
                                        )
                                    const drC3Check = C3categDr.DoctorList
                                    if (drC3Check.length == 0) {
                                        const B3categDr = await doctorSubcategory.findOne({ _id: "609bc8afc1fe1147aede5446" })
                                            .populate(
                                                {
                                                    path: 'DoctorList',
                                                    match: { $and: [{ Specialization: depname }] },
                                                    // select: 'name -_id',
                                                    options: { sort: { algorithm_index: -1 } }
                                                }
                                            )
                                        const drB3Check = B3categDr.DoctorList
                                        if (drB3Check.length == 0) {
                                            const D2categDr = await doctorSubcategory.findOne({ _id: "609bc917c1fe1147aede5451" })
                                                .populate(
                                                    {
                                                        path: 'DoctorList',
                                                        match: { $and: [{ Specialization: depname }] },
                                                        // select: 'name -_id',
                                                        options: { sort: { algorithm_index: -1 } }
                                                    }
                                                )
                                            const drD2Check = D2categDr.DoctorList
                                            if (drD2Check.length == 0) {
                                                const C2categDr = await doctorSubcategory.findOne({ _id: "609bc8d9c1fe1147aede544a" })
                                                    .populate(
                                                        {
                                                            path: 'DoctorList',
                                                            match: { $and: [{ Specialization: depname }] },
                                                            // select: 'name -_id',
                                                            options: { sort: { algorithm_index: -1 } }
                                                        }
                                                    )
                                                const drC2Check = C2categDr.DoctorList
                                                if (drC2Check.length == 0) {
                                                    const B2categDr = await doctorSubcategory.findOne({ _id: "609bc8a8c1fe1147aede5445" })
                                                        .populate(
                                                            {
                                                                path: 'DoctorList',
                                                                match: { $and: [{ Specialization: depname }] },
                                                                // select: 'name -_id',
                                                                options: { sort: { algorithm_index: -1 } }
                                                            }
                                                        )
                                                    const drB2Check = B2categDr.DoctorList
                                                    if (drB2Check.length == 0) {

                                                        const D1categDr = await doctorSubcategory.findOne({ _id: "609ccdce54298e19d7ccd9a4" })
                                                            .populate(
                                                                {
                                                                    path: 'DoctorList',
                                                                    match: { $and: [{ Specialization: depname }] },
                                                                    // select: 'name -_id',
                                                                    options: { sort: { algorithm_index: -1 } }
                                                                }
                                                            )
                                                        const drD1Check = D1categDr.DoctorList
                                                        if (drD1Check.length == 0) {
                                                            const C1categDr = await doctorSubcategory.findOne({ _id: "609bc8d2c1fe1147aede5449" })
                                                                .populate(
                                                                    {
                                                                        path: 'DoctorList',
                                                                        match: { $and: [{ Specialization: depname }] },
                                                                        // select: 'name -_id',
                                                                        options: { sort: { algorithm_index: -1 } }
                                                                    }
                                                                )
                                                            const drC1Check = C1categDr.DoctorList
                                                            if (drC1Check.length == 0) {
                                                                const B1categDr = await doctorSubcategory.findOne({ _id: "609bc89ac1fe1147aede5444" })
                                                                    .populate(
                                                                        {
                                                                            path: 'DoctorList',
                                                                            match: { $and: [{ Specialization: depname }] },
                                                                            // select: 'name -_id',
                                                                            options: { sort: { algorithm_index: -1 } }
                                                                        }
                                                                    )
                                                                const drB1Check = B1categDr.DoctorList
                                                                if (drB1Check.length == 0) {
                                                                    res.send({ datas: drB1Check, status: "B1 not have doctor category" })

                                                                } else {
                                                                    const find_doctorB1_check = drB1Check[0]
                                                                    await DoctorDetailsCheck(drB1Check, find_doctorB1_check, async function (doctorresp) {
                                                                        const suitableDoctor = doctorresp.status[0]
                                                                        console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                                                        if (drB1Check.length >= 5) {
                                                                            await drB1Check.map(async (items) => {
                                                                                const datapatient = new forPatientDoctor({
                                                                                    doctor_id: items._id,
                                                                                    patient_id: patient_id
                                                                                })
                                                                                if (items._id == suitableDoctor._id) {
                                                                                    datapatient.Doctor_status = "1"
                                                                                    await datapatient.save()
                                                                                    console.log("kuchh nhi")
                                                                                    DoctorsArray.push(items)
                                                                                } else if (DoctorsArray.length == 5) {
                                                                                    setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                                        console.log(data)
                                                                                    })
                                                                                    res.send({ datas: doctorresp, status: "B1 category" })

                                                                                } else {
                                                                                    datapatient.Doctor_status = "0"
                                                                                    await datapatient.save()
                                                                                    DoctorsArray.push(items)
                                                                                }
                                                                            })
                                                                        } else {
                                                                            await drB1Check.map(async (items) => {
                                                                                const datapatient = new forPatientDoctor({
                                                                                    doctor_id: items._id,
                                                                                    patient_id: patient_id
                                                                                })
                                                                                console.log(items, "kkk")
                                                                                console.log(suitableDoctor._id, "kkkjjj")
                                                                                if (items._id == suitableDoctor._id) {
                                                                                    datapatient.Doctor_status = "1"
                                                                                    await datapatient.save()
                                                                                    console.log("kuchh nhi")
                                                                                    DoctorsArray.push(items)
                                                                                } else {
                                                                                    datapatient.Doctor_status = "0"
                                                                                    await datapatient.save()
                                                                                    DoctorsArray.push(items)
                                                                                }
                                                                            })
                                                                            await setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                                console.log(data)
                                                                            })
                                                                            res.send({ datas: doctorresp, status: "B1 category" })
                                                                        }
                                                                    })
                                                                }

                                                            } else {
                                                                const find_doctorC1_check = drC1Check[0]
                                                                await DoctorDetailsCheck(drC1Check, find_doctorC1_check, async function (doctorresp) {
                                                                    const suitableDoctor = doctorresp.status[0]
                                                                    console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                                                    if (drC1Check.length >= 5) {
                                                                        await drC1Check.map(async (items) => {
                                                                            const datapatient = new forPatientDoctor({
                                                                                doctor_id: items._id,
                                                                                patient_id: patient_id
                                                                            })
                                                                            if (items._id == suitableDoctor._id) {
                                                                                datapatient.Doctor_status = "1"
                                                                                await datapatient.save()
                                                                                console.log("kuchh nhi")
                                                                                DoctorsArray.push(items)
                                                                            } else if (DoctorsArray.length == 5) {
                                                                                setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                                    console.log(data)
                                                                                })
                                                                                res.send({ datas: doctorresp, status: "C1 category" })

                                                                            } else {
                                                                                datapatient.Doctor_status = "0"
                                                                                await datapatient.save()
                                                                                DoctorsArray.push(items)
                                                                            }
                                                                        })
                                                                    } else {
                                                                        await drC1Check.map(async (items) => {
                                                                            const datapatient = new forPatientDoctor({
                                                                                doctor_id: items._id,
                                                                                patient_id: patient_id
                                                                            })
                                                                            console.log(items, "kkk")
                                                                            console.log(suitableDoctor._id, "kkkjjj")
                                                                            if (items._id == suitableDoctor._id) {
                                                                                datapatient.Doctor_status = "1"
                                                                                await datapatient.save()
                                                                                console.log("kuchh nhi")
                                                                                DoctorsArray.push(items)
                                                                            } else {
                                                                                datapatient.Doctor_status = "0"
                                                                                await datapatient.save()
                                                                                DoctorsArray.push(items)
                                                                            }
                                                                        })
                                                                        await setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                            console.log(data)
                                                                        })
                                                                        res.send({ datas: doctorresp, status: "C1 category" })
                                                                    }
                                                                })
                                                            }


                                                        } else {
                                                            const find_doctorD1_check = drD1Check[0]
                                                            await DoctorDetailsCheck(drD1Check, find_doctorD1_check, async function (doctorresp) {
                                                                const suitableDoctor = doctorresp.status[0]
                                                                console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                                                if (drD1Check.length >= 5) {
                                                                    await drD1Check.map(async (items) => {
                                                                        const datapatient = new forPatientDoctor({
                                                                            doctor_id: items._id,
                                                                            patient_id: patient_id
                                                                        })
                                                                        if (items._id == suitableDoctor._id) {
                                                                            datapatient.Doctor_status = "1"
                                                                            await datapatient.save()
                                                                            console.log("kuchh nhi")
                                                                            DoctorsArray.push(items)
                                                                        } else if (DoctorsArray.length == 5) {
                                                                            setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                                console.log(data)
                                                                            })
                                                                            res.send({ datas: doctorresp, status: "D1 category" })

                                                                        } else {
                                                                            datapatient.Doctor_status = "0"
                                                                            await datapatient.save()
                                                                            DoctorsArray.push(items)
                                                                        }
                                                                    })
                                                                } else {
                                                                    await drD1Check.map(async (items) => {
                                                                        const datapatient = new forPatientDoctor({
                                                                            doctor_id: items._id,
                                                                            patient_id: patient_id
                                                                        })
                                                                        console.log(items, "kkk")
                                                                        console.log(suitableDoctor._id, "kkkjjj")
                                                                        if (items._id == suitableDoctor._id) {
                                                                            datapatient.Doctor_status = "1"
                                                                            await datapatient.save()
                                                                            console.log("kuchh nhi")
                                                                            DoctorsArray.push(items)
                                                                        } else {
                                                                            datapatient.Doctor_status = "0"
                                                                            await datapatient.save()
                                                                            DoctorsArray.push(items)
                                                                        }
                                                                    })
                                                                    await setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                        console.log(data)
                                                                    })
                                                                    res.send({ datas: doctorresp, status: "D1 category" })
                                                                }
                                                            })
                                                        }


                                                    } else {
                                                        const find_doctorB2_check = drB2Check[0]
                                                        await DoctorDetailsCheck(drB2Check, find_doctorB2_check, async function (doctorresp) {


                                                            const suitableDoctor = doctorresp.status[0]
                                                            console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                                            if (drB2Check.length >= 5) {
                                                                await drB2Check.map(async (items) => {
                                                                    const datapatient = new forPatientDoctor({
                                                                        doctor_id: items._id,
                                                                        patient_id: patient_id
                                                                    })
                                                                    if (items._id == suitableDoctor._id) {
                                                                        datapatient.Doctor_status = "1"
                                                                        await datapatient.save()
                                                                        console.log("kuchh nhi")
                                                                        DoctorsArray.push(items)
                                                                    } else if (DoctorsArray.length == 5) {
                                                                        setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                            console.log(data)
                                                                        })
                                                                        res.send({ datas: doctorresp, status: "B2 category" })

                                                                    } else {
                                                                        datapatient.Doctor_status = "0"
                                                                        await datapatient.save()
                                                                        DoctorsArray.push(items)
                                                                    }
                                                                })
                                                            } else {
                                                                await drB2Check.map(async (items) => {
                                                                    const datapatient = new forPatientDoctor({
                                                                        doctor_id: items._id,
                                                                        patient_id: patient_id
                                                                    })
                                                                    console.log(items, "kkk")
                                                                    console.log(suitableDoctor._id, "kkkjjj")
                                                                    if (items._id == suitableDoctor._id) {
                                                                        datapatient.Doctor_status = "1"
                                                                        await datapatient.save()
                                                                        console.log("kuchh nhi")
                                                                        DoctorsArray.push(items)
                                                                    } else {
                                                                        datapatient.Doctor_status = "0"
                                                                        await datapatient.save()
                                                                        DoctorsArray.push(items)
                                                                    }
                                                                })
                                                                await setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                    console.log(data)
                                                                })
                                                                res.send({ datas: doctorresp, status: "B2 category" })
                                                            }

                                                        })
                                                    }
                                                } else {
                                                    const find_doctorC2_check = drC2Check[0]
                                                    await DoctorDetailsCheck(drC2Check, find_doctorC2_check, async function (doctorresp) {

                                                        const suitableDoctor = doctorresp.status[0]
                                                        console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                                        if (drC2Check.length >= 5) {
                                                            await drC2Check.map(async (items) => {
                                                                const datapatient = new forPatientDoctor({
                                                                    doctor_id: items._id,
                                                                    patient_id: patient_id
                                                                })
                                                                if (items._id == suitableDoctor._id) {
                                                                    datapatient.Doctor_status = "1"
                                                                    await datapatient.save()
                                                                    console.log("kuchh nhi")
                                                                    DoctorsArray.push(items)
                                                                } else if (DoctorsArray.length == 5) {
                                                                    setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                        console.log(data)
                                                                    })
                                                                    res.send({ datas: doctorresp, status: "C2 category" })

                                                                } else {
                                                                    datapatient.Doctor_status = "0"
                                                                    await datapatient.save()
                                                                    DoctorsArray.push(items)
                                                                }
                                                            })
                                                        } else {
                                                            await drC2Check.map(async (items) => {
                                                                const datapatient = new forPatientDoctor({
                                                                    doctor_id: items._id,
                                                                    patient_id: patient_id
                                                                })
                                                                console.log(items, "kkk")
                                                                console.log(suitableDoctor._id, "kkkjjj")
                                                                if (items._id == suitableDoctor._id) {
                                                                    datapatient.Doctor_status = "1"
                                                                    await datapatient.save()
                                                                    console.log("kuchh nhi")
                                                                    DoctorsArray.push(items)
                                                                } else {
                                                                    datapatient.Doctor_status = "0"
                                                                    await datapatient.save()
                                                                    DoctorsArray.push(items)
                                                                }
                                                            })
                                                            await setTimeOutFunction(suitableDoctor._id, function (data) {
                                                                console.log(data)
                                                            })
                                                            res.send({ datas: doctorresp, status: "C2 category" })
                                                        }
                                                    })
                                                }



                                            } else {
                                                const find_doctorD2_check = drD2Check[0]
                                                await DoctorDetailsCheck(drD2Check, find_doctorD2_check, async function (doctorresp) {
                                                    const suitableDoctor = doctorresp.status[0]
                                                    console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                                    if (drD2Check.length >= 5) {
                                                        await drD2Check.map(async (items) => {
                                                            const datapatient = new forPatientDoctor({
                                                                doctor_id: items._id,
                                                                patient_id: patient_id
                                                            })
                                                            if (items._id == suitableDoctor._id) {
                                                                datapatient.Doctor_status = "1"
                                                                await datapatient.save()
                                                                console.log("kuchh nhi")
                                                                DoctorsArray.push(items)
                                                            } else if (DoctorsArray.length == 5) {
                                                                res.send({ datas: doctorresp, status: "D2 category" })

                                                            } else {
                                                                datapatient.Doctor_status = "0"
                                                                await datapatient.save()
                                                                DoctorsArray.push(items)
                                                            }
                                                        })
                                                    } else {
                                                        await drD2Check.map(async (items) => {
                                                            const datapatient = new forPatientDoctor({
                                                                doctor_id: items._id,
                                                                patient_id: patient_id
                                                            })
                                                            console.log(items, "kkk")
                                                            console.log(suitableDoctor._id, "kkkjjj")
                                                            if (items._id == suitableDoctor._id) {
                                                                datapatient.Doctor_status = "1"
                                                                await datapatient.save()
                                                                console.log("kuchh nhi")
                                                                DoctorsArray.push(items)
                                                            } else {
                                                                datapatient.Doctor_status = "0"
                                                                await datapatient.save()
                                                                DoctorsArray.push(items)
                                                            }
                                                        })

                                                        res.send({ datas: doctorresp, status: "D2 category" })
                                                    }

                                                })
                                            }


                                        } else {
                                            const find_doctorB3_check = drB3Check[0]
                                            await DoctorDetailsCheck(drB3Check, find_doctorB3_check, async function (doctorresp) {
                                                const suitableDoctor = doctorresp.status[0]
                                                console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                                if (drB3Check.length >= 5) {
                                                    await drB3Check.map(async (items) => {
                                                        const datapatient = new forPatientDoctor({
                                                            doctor_id: items._id,
                                                            patient_id: patient_id
                                                        })
                                                        if (items._id == suitableDoctor._id) {
                                                            datapatient.Doctor_status = "1"
                                                            await datapatient.save()
                                                            console.log("kuchh nhi")
                                                            DoctorsArray.push(items)
                                                        } else if (DoctorsArray.length == 5) {
                                                            res.send({ datas: doctorresp, status: "B3 category" })

                                                        } else {
                                                            datapatient.Doctor_status = "0"
                                                            await datapatient.save()
                                                            DoctorsArray.push(items)
                                                        }
                                                    })
                                                } else {
                                                    await drB3Check.map(async (items) => {
                                                        const datapatient = new forPatientDoctor({
                                                            doctor_id: items._id,
                                                            patient_id: patient_id
                                                        })
                                                        console.log(items, "kkk")
                                                        console.log(suitableDoctor._id, "kkkjjj")
                                                        if (items._id == suitableDoctor._id) {
                                                            datapatient.Doctor_status = "1"
                                                            await datapatient.save()
                                                            console.log("kuchh nhi")
                                                            DoctorsArray.push(items)
                                                        } else {
                                                            datapatient.Doctor_status = "0"
                                                            await datapatient.save()
                                                            DoctorsArray.push(items)
                                                        }
                                                    })

                                                    res.send({ datas: doctorresp, status: "B3 category" })
                                                }

                                            })
                                        }


                                    } else {
                                        const find_doctorC3_check = drC3Check[0]
                                        await DoctorDetailsCheck(drC3Check, find_doctorC3_check, async function (doctorresp) {

                                            const suitableDoctor = doctorresp.status[0]
                                            console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                            if (drC3Check.length >= 5) {
                                                await drC3Check.map(async (items) => {
                                                    const datapatient = new forPatientDoctor({
                                                        doctor_id: items._id,
                                                        patient_id: patient_id
                                                    })
                                                    if (items._id == suitableDoctor._id) {
                                                        datapatient.Doctor_status = "1"
                                                        await datapatient.save()
                                                        console.log("kuchh nhi")
                                                        DoctorsArray.push(items)
                                                    } else if (DoctorsArray.length == 5) {
                                                        res.send({ datas: doctorresp, status: "C3 category" })

                                                    } else {
                                                        datapatient.Doctor_status = "0"
                                                        await datapatient.save()
                                                        DoctorsArray.push(items)
                                                    }
                                                })
                                            } else {
                                                await drC3Check.map(async (items) => {
                                                    const datapatient = new forPatientDoctor({
                                                        doctor_id: items._id,
                                                        patient_id: patient_id
                                                    })
                                                    console.log(items, "kkk")
                                                    console.log(suitableDoctor._id, "kkkjjj")
                                                    if (items._id == suitableDoctor._id) {
                                                        datapatient.Doctor_status = "1"
                                                        await datapatient.save()
                                                        console.log("kuchh nhi")
                                                        DoctorsArray.push(items)
                                                    } else {
                                                        datapatient.Doctor_status = "0"
                                                        await datapatient.save()
                                                        DoctorsArray.push(items)
                                                    }
                                                })

                                                res.send({ datas: doctorresp, status: "C3 category" })
                                            }
                                        })
                                    }
                                } else {
                                    const find_doctorD3_check = drD3Check[0]
                                    await DoctorDetailsCheck(drD3Check, find_doctorD3_check, async function (doctorresp) {

                                        const suitableDoctor = doctorresp.status[0]
                                        console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                        if (drD3Check.length >= 5) {
                                            await drD3Check.map(async (items) => {
                                                const datapatient = new forPatientDoctor({
                                                    doctor_id: items._id,
                                                    patient_id: patient_id
                                                })
                                                if (items._id == suitableDoctor._id) {
                                                    datapatient.Doctor_status = "1"
                                                    await datapatient.save()
                                                    console.log("kuchh nhi")
                                                    DoctorsArray.push(items)
                                                } else if (DoctorsArray.length == 5) {
                                                    res.send({ datas: doctorresp, status: "D3 category" })

                                                } else {
                                                    datapatient.Doctor_status = "0"
                                                    await datapatient.save()
                                                    DoctorsArray.push(items)
                                                }
                                            })
                                        } else {
                                            await drD3Check.map(async (items) => {
                                                const datapatient = new forPatientDoctor({
                                                    doctor_id: items._id,
                                                    patient_id: patient_id
                                                })
                                                console.log(items, "kkk")
                                                console.log(suitableDoctor._id, "kkkjjj")
                                                if (items._id == suitableDoctor._id) {
                                                    datapatient.Doctor_status = "1"
                                                    await datapatient.save()
                                                    console.log("kuchh nhi")
                                                    DoctorsArray.push(items)
                                                } else {
                                                    datapatient.Doctor_status = "0"
                                                    await datapatient.save()
                                                    DoctorsArray.push(items)
                                                }
                                            })

                                            res.send({ datas: doctorresp, status: "D3 category" })
                                        }


                                    })
                                }

                            } else {
                                const find_doctorb4_check = drB4Check[0]
                                await DoctorDetailsCheck(drB4Check, find_doctorb4_check, async function (doctorresp) {
                                    const suitableDoctor = doctorresp.status[0]
                                    console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                    if (drB4Check.length >= 5) {
                                        await drB4Check.map(async (items) => {
                                            const datapatient = new forPatientDoctor({
                                                doctor_id: items._id,
                                                patient_id: patient_id
                                            })
                                            if (items._id == suitableDoctor._id) {
                                                datapatient.Doctor_status = "1"
                                                await datapatient.save()
                                                console.log("kuchh nhi")
                                                DoctorsArray.push(items)
                                            } else if (DoctorsArray.length == 5) {
                                                res.send({ datas: doctorresp, status: "B4 category" })

                                            } else {
                                                datapatient.Doctor_status = "0"
                                                await datapatient.save()
                                                DoctorsArray.push(items)
                                            }
                                        })
                                    } else {
                                        await drB4Check.map(async (items) => {
                                            const datapatient = new forPatientDoctor({
                                                doctor_id: items._id,
                                                patient_id: patient_id
                                            })
                                            console.log(items, "kkk")
                                            console.log(suitableDoctor._id, "kkkjjj")
                                            if (items._id == suitableDoctor._id) {
                                                datapatient.Doctor_status = "1"
                                                await datapatient.save()
                                                console.log("kuchh nhi")
                                                DoctorsArray.push(items)
                                            } else {
                                                datapatient.Doctor_status = "0"
                                                await datapatient.save()
                                                DoctorsArray.push(items)
                                            }
                                        })

                                        res.send({ datas: doctorresp, status: "B4 category" })
                                    }

                                })
                            }
                        } else {
                            const find_doctorC4_check = drC4Check[0]
                            await DoctorDetailsCheck(drC4Check, find_doctorC4_check, async function (doctorresp) {

                                const suitableDoctor = doctorresp.status[0]
                                console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                if (drC4Check.length >= 5) {
                                    await drC4Check.map(async (items) => {
                                        const datapatient = new forPatientDoctor({
                                            doctor_id: items._id,
                                            patient_id: patient_id
                                        })
                                        if (items._id == suitableDoctor._id) {
                                            datapatient.Doctor_status = "1"
                                            await datapatient.save()
                                            console.log("kuchh nhi")
                                            DoctorsArray.push(items)
                                        } else if (DoctorsArray.length == 5) {
                                            res.send({ datas: doctorresp, status: "C4 category" })

                                        } else {
                                            datapatient.Doctor_status = "0"
                                            await datapatient.save()
                                            DoctorsArray.push(items)
                                        }
                                    })
                                } else {
                                    await drC4Check.map(async (items) => {
                                        const datapatient = new forPatientDoctor({
                                            doctor_id: items._id,
                                            patient_id: patient_id
                                        })
                                        console.log(items, "kkk")
                                        console.log(suitableDoctor._id, "kkkjjj")
                                        if (items._id == suitableDoctor._id) {
                                            datapatient.Doctor_status = "1"
                                            await datapatient.save()
                                            console.log("kuchh nhi")
                                            DoctorsArray.push(items)
                                        } else {
                                            datapatient.Doctor_status = "0"
                                            await datapatient.save()
                                            DoctorsArray.push(items)
                                        }
                                    })

                                    res.send({ datas: doctorresp, status: "C4 category" })
                                }

                            })
                        }
                    } else {
                        const find_doctor_D4Check = drD4Check[0]
                        await DoctorDetailsCheck(drD4Check, find_doctor_D4Check, async function (doctorresp) {

                            const suitableDoctor = doctorresp.status[0]
                            console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                            if (drD4Check.length >= 5) {
                                await drD4Check.map(async (items) => {
                                    const datapatient = new forPatientDoctor({
                                        doctor_id: items._id,
                                        patient_id: patient_id
                                    })
                                    if (items._id == suitableDoctor._id) {
                                        datapatient.Doctor_status = "1"
                                        await datapatient.save()
                                        console.log("kuchh nhi")
                                        DoctorsArray.push(items)
                                    } else if (DoctorsArray.length == 5) {
                                        res.send({ datas: doctorresp, status: "D4 category" })

                                    } else {
                                        datapatient.Doctor_status = "0"
                                        await datapatient.save()
                                        DoctorsArray.push(items)
                                    }
                                })
                            } else {
                                await drD4Check.map(async (items) => {
                                    const datapatient = new forPatientDoctor({
                                        doctor_id: items._id,
                                        patient_id: patient_id
                                    })
                                    console.log(items, "kkk")
                                    console.log(suitableDoctor._id, "kkkjjj")
                                    if (items._id == suitableDoctor._id) {
                                        datapatient.Doctor_status = "1"
                                        await datapatient.save()
                                        console.log("kuchh nhi")
                                        DoctorsArray.push(items)
                                    } else {
                                        datapatient.Doctor_status = "0"
                                        await datapatient.save()
                                        DoctorsArray.push(items)
                                    }
                                })

                                res.send({ datas: doctorresp, status: "D4 category" })
                            }
                        })
                    }

                } else {
                    const find_doctor_drB5Check = drB5Check[0]
                    await DoctorDetailsCheck(drB5Check, find_doctor_drB5Check, async function (doctorresp) {

                        const suitableDoctor = doctorresp.status[0]
                        console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                        if (drB5Check.length >= 5) {
                            await drB5Check.map(async (items) => {
                                const datapatient = new forPatientDoctor({
                                    doctor_id: items._id,
                                    patient_id: patient_id
                                })
                                if (items._id == suitableDoctor._id) {
                                    datapatient.Doctor_status = "1"
                                    await datapatient.save()
                                    console.log("kuchh nhi")
                                    DoctorsArray.push(items)
                                } else if (DoctorsArray.length == 5) {
                                    res.send({ datas: doctorresp, status: "B5 category" })

                                } else {
                                    datapatient.Doctor_status = "0"
                                    await datapatient.save()
                                    DoctorsArray.push(items)
                                }
                            })
                        } else {
                            await drB5Check.map(async (items) => {
                                const datapatient = new forPatientDoctor({
                                    doctor_id: items._id,
                                    patient_id: patient_id
                                })
                                console.log(items, "kkk")
                                console.log(suitableDoctor._id, "kkkjjj")
                                if (items._id == suitableDoctor._id) {
                                    datapatient.Doctor_status = "1"
                                    await datapatient.save()
                                    console.log("kuchh nhi")
                                    DoctorsArray.push(items)
                                } else {
                                    datapatient.Doctor_status = "0"
                                    await datapatient.save()
                                    DoctorsArray.push(items)
                                }
                            })

                            res.send({ datas: doctorresp, status: "B5 category" })
                        }
                    })
                    // res.json({ "dr": "dr find in a3", "code": "A category", status: dr2Check })
                }
            } else {
                const find_doctor_drC5Check = drC5Check[0]
                await DoctorDetailsCheck(drC5Check, find_doctor_drC5Check, async function (doctorresp) {

                    const suitableDoctor = doctorresp.status[0]
                    console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                    if (drC5Check.length >= 5) {
                        await drC5Check.map(async (items) => {
                            const datapatient = new forPatientDoctor({
                                doctor_id: items._id,
                                patient_id: patient_id
                            })
                            if (items._id == suitableDoctor._id) {
                                datapatient.Doctor_status = "1"
                                await datapatient.save()
                                console.log("kuchh nhi")
                                DoctorsArray.push(items)
                            } else if (DoctorsArray.length == 5) {
                                res.send({ datas: doctorresp, status: "C5 category" })

                            } else {
                                datapatient.Doctor_status = "0"
                                await datapatient.save()
                                DoctorsArray.push(items)
                            }
                        })
                    } else {
                        await drC5Check.map(async (items) => {
                            const datapatient = new forPatientDoctor({
                                doctor_id: items._id,
                                patient_id: patient_id
                            })
                            console.log(items, "kkk")
                            console.log(suitableDoctor._id, "kkkjjj")
                            if (items._id == suitableDoctor._id) {
                                datapatient.Doctor_status = "1"
                                await datapatient.save()
                                console.log("kuchh nhi")
                                DoctorsArray.push(items)
                            } else {
                                datapatient.Doctor_status = "0"
                                await datapatient.save()
                                DoctorsArray.push(items)
                            }
                        })

                        res.send({ datas: doctorresp, status: "C5 category" })
                    }
                })
                // res.json({ "dr": "dr find in a4", "code": "A category", status: dr3Check })
            }
        } else {
            const find_doctor_drCheck = drCheck[0]
            await DoctorDetailsCheck(drCheck, find_doctor_drCheck, async function (doctorresp) {

                const suitableDoctor = doctorresp.status[0]
                console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                if (drCheck.length >= 5) {
                    await drCheck.map(async (items) => {
                        const datapatient = new forPatientDoctor({
                            doctor_id: items._id,
                            patient_id: patient_id
                        })
                        if (items._id == suitableDoctor._id) {
                            datapatient.Doctor_status = "1"
                            await datapatient.save()
                            console.log("kuchh nhi")
                            DoctorsArray.push(items)
                        } else if (DoctorsArray.length == 5) {
                            res.send({ datas: doctorresp, status: "D5 category" })

                        } else {
                            datapatient.Doctor_status = "0"
                            await datapatient.save()
                            DoctorsArray.push(items)
                        }
                    })
                } else {
                    await drCheck.map(async (items) => {
                        const datapatient = new forPatientDoctor({
                            doctor_id: items._id,
                            patient_id: patient_id
                        })
                        console.log(items, "kkk")
                        console.log(suitableDoctor._id, "kkkjjj")
                        if (items._id == suitableDoctor._id) {
                            datapatient.Doctor_status = "1"
                            await datapatient.save()
                            console.log("kuchh nhi")
                            DoctorsArray.push(items)
                        } else {
                            datapatient.Doctor_status = "0"
                            await datapatient.save()
                            DoctorsArray.push(items)
                        }
                    })

                    res.send({ datas: doctorresp, status: "D5 category" })
                }
            })
        }

    } else if (e_category.includes(depname)) {
        const E5categDr = await doctorSubcategory.findOne({ _id: "609bc94dc1fe1147aede5457" }).populate(
            {
                path: 'DoctorList',
                match: { $and: [{ Specialization: depname }] },
                // select: 'name -_id',
                options: { sort: { algorithm_index: -1 } }
            }
        )
        const drCheckE1 = E5categDr.DoctorList
        if (drCheckE1.length == 0) {
            const E4categDr = await doctorSubcategory.findOne({ _id: "609bc948c1fe1147aede5456" }).populate(
                {
                    path: 'DoctorList',
                    match: { $and: [{ Specialization: depname }] },
                    // select: 'name -_id',
                    options: { sort: { algorithm_index: -1 } }
                }
            )
            const dr4Check = E4categDr.DoctorList
            if (dr4Check.length == 0) {
                const E3categDr = await doctorSubcategory.findOne({ _id: "609bc943c1fe1147aede5455" }).populate(
                    {
                        path: 'DoctorList',
                        match: { $and: [{ Specialization: depname }] },
                        // select: 'name -_id',
                        options: { sort: { algorithm_index: -1 } }
                    }
                )
                const drE3Check = E3categDr.DoctorList
                if (drE3Check.length == 0) {
                    const E2categDr = await doctorSubcategory.findOne({ _id: "609bc93fc1fe1147aede5454" }).populate(
                        {
                            path: 'DoctorList',
                            match: { $and: [{ Specialization: depname }] },
                            options: { sort: { algorithm_index: -1 } }
                        }
                    )
                    const drE2Check = E2categDr.DoctorList
                    if (drE2Check.length == 0) {
                        const E1categDr = await doctorSubcategory.findOne({ _id: "609bc93ac1fe1147aede5453" })
                            .populate(
                                {
                                    path: 'DoctorList',
                                    match: { $and: [{ Specialization: depname }] },
                                    // select: 'name -_id',
                                    options: { sort: { algorithm_index: -1 } }
                                }
                            )
                        const drE1Check = E1categDr.DoctorList
                        if (drE1Check.length == 0) {
                            res.json({ "dr": "dr not find in E1", "code": "E1 category", status: dr1Check })
                        } else {
                            const find_doctor_check = drE1Check[0]
                            await DoctorDetailsCheck(drE1Check, find_doctor_check, async function (doctorresp) {
                                const suitableDoctor = doctorresp.status[0]
                                console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                                if (drE1Check.length >= 5) {
                                    await drE1Check.map(async (items) => {
                                        const datapatient = new forPatientDoctor({
                                            doctor_id: items._id,
                                            patient_id: patient_id
                                        })
                                        if (items._id == suitableDoctor._id) {
                                            datapatient.Doctor_status = "1"
                                            await datapatient.save()
                                            console.log("kuchh nhi")
                                            DoctorsArray.push(items)
                                        } else if (DoctorsArray.length == 5) {
                                            res.send({ datas: doctorresp, status: "D5 category" })

                                        } else {
                                            datapatient.Doctor_status = "0"
                                            await datapatient.save()
                                            DoctorsArray.push(items)
                                        }
                                    })
                                } else {
                                    await drE1Check.map(async (items) => {
                                        const datapatient = new forPatientDoctor({
                                            doctor_id: items._id,
                                            patient_id: patient_id
                                        })
                                        console.log(items, "kkk")
                                        console.log(suitableDoctor._id, "kkkjjj")
                                        if (items._id == suitableDoctor._id) {
                                            datapatient.Doctor_status = "1"
                                            await datapatient.save()
                                            console.log("kuchh nhi")
                                            DoctorsArray.push(items)
                                        } else {
                                            datapatient.Doctor_status = "0"
                                            await datapatient.save()
                                            DoctorsArray.push(items)
                                        }
                                    })

                                    res.send({ datas: doctorresp, status: "D5 category" })
                                }

                            })
                        }
                    } else {
                        const find_doctor_dr2Check = dr2Check[0]
                        await DoctorDetailsCheck(drE2Check, find_doctor_dr2Check, async function (doctorresp) {
                            res.send(doctorresp)
                            const suitableDoctor = doctorresp.status[0]
                            console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                            if (drE2Check.length >= 5) {
                                await drE2Check.map(async (items) => {
                                    const datapatient = new forPatientDoctor({
                                        doctor_id: items._id,
                                        patient_id: patient_id
                                    })
                                    if (items._id == suitableDoctor._id) {
                                        datapatient.Doctor_status = "1"
                                        await datapatient.save()
                                        console.log("kuchh nhi")
                                        DoctorsArray.push(items)
                                    } else if (DoctorsArray.length == 5) {
                                        res.send({ datas: doctorresp, status: "E2 category" })

                                    } else {
                                        datapatient.Doctor_status = "0"
                                        await datapatient.save()
                                        DoctorsArray.push(items)
                                    }
                                })
                            } else {
                                await drE2Check.map(async (items) => {
                                    const datapatient = new forPatientDoctor({
                                        doctor_id: items._id,
                                        patient_id: patient_id
                                    })
                                    console.log(items, "kkk")
                                    console.log(suitableDoctor._id, "kkkjjj")
                                    if (items._id == suitableDoctor._id) {
                                        datapatient.Doctor_status = "1"
                                        await datapatient.save()
                                        console.log("kuchh nhi")
                                        DoctorsArray.push(items)
                                    } else {
                                        datapatient.Doctor_status = "0"
                                        await datapatient.save()
                                        DoctorsArray.push(items)
                                    }
                                })

                                res.send({ datas: doctorresp, status: "E2 category" })
                            }
                        })
                    }

                } else {
                    const find_doctor_dr3Check = drE3Check[0]
                    await DoctorDetailsCheck(drE3Check, find_doctor_dr3Check, async function (doctorresp) {
                        const suitableDoctor = doctorresp.status[0]
                        console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                        if (drE3Check.length >= 5) {
                            await drE3Check.map(async (items) => {
                                const datapatient = new forPatientDoctor({
                                    doctor_id: items._id,
                                    patient_id: patient_id
                                })
                                if (items._id == suitableDoctor._id) {
                                    datapatient.Doctor_status = "1"
                                    await datapatient.save()
                                    console.log("kuchh nhi")
                                    DoctorsArray.push(items)
                                } else if (DoctorsArray.length == 5) {
                                    res.send({ datas: doctorresp, status: "E3 category" })

                                } else {
                                    datapatient.Doctor_status = "0"
                                    await datapatient.save()
                                    DoctorsArray.push(items)
                                }
                            })
                        } else {
                            await drE3Check.map(async (items) => {
                                const datapatient = new forPatientDoctor({
                                    doctor_id: items._id,
                                    patient_id: patient_id
                                })
                                console.log(items, "kkk")
                                console.log(suitableDoctor._id, "kkkjjj")
                                if (items._id == suitableDoctor._id) {
                                    datapatient.Doctor_status = "1"
                                    await datapatient.save()
                                    console.log("kuchh nhi")
                                    DoctorsArray.push(items)
                                } else {
                                    datapatient.Doctor_status = "0"
                                    await datapatient.save()
                                    DoctorsArray.push(items)
                                }
                            })

                            res.send({ datas: doctorresp, status: "E3 category" })
                        }
                    })
                    // res.json({ "dr": "dr find in a3", "code": "A category", status: dr2Check })
                }
            } else {
                const find_doctor_dr4Check = dr4Check[0]
                await DoctorDetailsCheck(dr4Check, find_doctor_dr4Check, async function (doctorresp) {


                    const suitableDoctor = doctorresp.status[0]
                    console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                    if (dr4Check.length >= 5) {
                        await dr4Check.map(async (items) => {
                            const datapatient = new forPatientDoctor({
                                doctor_id: items._id,
                                patient_id: patient_id
                            })
                            if (items._id == suitableDoctor._id) {
                                datapatient.Doctor_status = "1"
                                await datapatient.save()
                                console.log("kuchh nhi")
                                DoctorsArray.push(items)
                            } else if (DoctorsArray.length == 5) {
                                res.send({ datas: doctorresp, status: "E4 category" })

                            } else {
                                datapatient.Doctor_status = "0"
                                await datapatient.save()
                                DoctorsArray.push(items)
                            }
                        })
                    } else {
                        await dr4Check.map(async (items) => {
                            const datapatient = new forPatientDoctor({
                                doctor_id: items._id,
                                patient_id: patient_id
                            })
                            console.log(items, "kkk")
                            console.log(suitableDoctor._id, "kkkjjj")
                            if (items._id == suitableDoctor._id) {
                                datapatient.Doctor_status = "1"
                                await datapatient.save()
                                console.log("kuchh nhi")
                                DoctorsArray.push(items)
                            } else {
                                datapatient.Doctor_status = "0"
                                await datapatient.save()
                                DoctorsArray.push(items)
                            }
                        })

                        res.send({ datas: doctorresp, status: "E4 category" })
                    }
                })
                // res.json({ "dr": "dr find in a4", "code": "A category", status: dr3Check })
            }
        } else {
            const find_doctor_drCheck = drCheckE1[0]
            await DoctorDetailsCheck(drCheckE1, find_doctor_drCheck, async function (doctorresp) {
                const suitableDoctor = doctorresp.status[0]
                console.log(suitableDoctor, "DDDDDDDDDDDDDDDDD", doctorresp)
                if (drCheckE1.length >= 5) {
                    await drCheckE1.map(async (items) => {
                        const datapatient = new forPatientDoctor({
                            doctor_id: items._id,
                            patient_id: patient_id
                        })
                        if (items._id == suitableDoctor._id) {
                            datapatient.Doctor_status = "1"
                            await datapatient.save()
                            console.log("kuchh nhi")
                            DoctorsArray.push(items)
                        } else if (DoctorsArray.length == 5) {
                            res.send({ datas: doctorresp, status: "E5 category" })

                        } else {
                            datapatient.Doctor_status = "0"
                            await datapatient.save()
                            DoctorsArray.push(items)
                        }
                    })
                } else {
                    await drCheckE1.map(async (items) => {
                        const datapatient = new forPatientDoctor({
                            doctor_id: items._id,
                            patient_id: patient_id
                        })
                        console.log(items, "kkk")
                        console.log(suitableDoctor._id, "kkkjjj")
                        if (items._id == suitableDoctor._id) {
                            datapatient.Doctor_status = "1"
                            await datapatient.save()
                            console.log("kuchh nhi")
                            DoctorsArray.push(items)
                        } else {
                            datapatient.Doctor_status = "0"
                            await datapatient.save()
                            DoctorsArray.push(items)
                        }
                    })

                    res.send({ datas: doctorresp, status: "E5 category" })
                }
            })
        }
        // res.send("E category")
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


exports.patientDetailsForDoctor = async (req, res) => {
    const { doctor_id, patient_id } = req.body;
    const obj = {}
    const patient_detail = await Patient.findOne({ $and: [{ doctor_id: doctor_id }, { _id: patient_id }] }, { patient_name: 1, activeStatus: 1, health_worker_id: 1, createdAt: 1, patient_img: 1 })
    console.log("patient", patient_detail)
    if (patient_detail) {
        const helth = await helthworkers.findOne({ _id: patient_detail.health_worker_id }, { firebase_token: 1, username: 1, activeStatus: 1 })
        console.log("helth", helth)
        if (!helth) {

        } else {
            obj.name = patient_detail.patient_name;
            obj.createdAt = patient_detail.createdAt;
            obj.profile_pic = patient_detail.patient_img
            obj.firebaseToken = helth.firebase_token
            obj.activeStatus = helth.activeStatus
            res.json({ code: 200, msg: obj })
        }
    } else {
        res.json({ code: 400, msg: "patient not found" })
    }
}