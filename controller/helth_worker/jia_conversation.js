const desease_name = require("../../model/admin/add_disease");
const patient_name = require("../../model/helth_worker/patient_registration")
var colors = require('colors');
const chalk = require('chalk');
const Doctor_data = require("../../model/Doctor/doctor_regis")
const patient_data = require("../../model/helth_worker/patient_registration")
const helth_workers = require("../../model/helth_worker/users")
const doctor_patientChat = require("../../model/Doctor/doctor_patient_chat")
const Jiaquestion = require("../../model/admin/question_add")

const greeting_time = (today) => {
    var curHr = today.getHours()
    console.log(curHr, "nnno")
    if (curHr <= 12) {
        return 'Good morning'
    } else if (curHr <= 16 && curHr >= 12) {
        return 'Good afternoon'
    } else if (curHr <= 18 && curHr >= 16) {
        return 'Good evening'
    }
    else if (curHr <= 24 && curHr >= 18) {
        return 'Good night'
    }
}

exports.greetings = async (req, res) => {
    const { patient_id, disease_name, desease_id, depart_name, helthwork_id } = req.body;
    const patients = await patient_name.findOne({ _id: patient_id })
    const depart_data = await desease_name.find({ department_name: depart_name }, { department_name: 1, disease_name: 1 })
    const update_desease = await patient_data.updateOne({ _id: patient_id }, { disease: disease_name })
    const my_question =await Jiaquestion.findOne({_id:"609132894d19905b5761bf97"})
    console.log(my_question,"queeeeeeeeeee")
    let greet = '';
    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr"
    } else {
        greet = "Miss"
    }
    var today = new Date()
    console.log(today, "klkjhjhjk")
    console.log('hello'.green); // outputs green text
    console.log(colors.red.underline('i like cake and pies')) // outputs red underlined text

    const gree_time = greeting_time(today)
    const mornings = chalk.blue(gree_time)
    console.log(mornings)
    const texts = `${mornings} ${greet}. ${patients.patient_name} ${my_question.text}`
    details.text = texts;
    const texts2 = `${greet}. ${patients.patient_name}, ${my_question.text2}`
    details.texts = texts2;
    const dats = ["1Week", "1Month", "2Month", "1Year"]
    details.problem_time = dats
    // details.disease = depart_data
    res.json({ code: 200, msg: details })
}


exports.greetings1 = async (req, res) => {
    const { patient_id, disease_id, helthwork_id } = req.body;
    const patients = await patient_name.findOne({ _id: patient_id })
    const my_question =await Jiaquestion.findOne({_id:"609132894d19905b5761bf97"})

    let greet = '';
    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr"
    } else {
        greet = "Miss"
    }
    const texts = `Alright ${greet}. ${patients.patient_name}, ${my_question.text2}`
    details.text = texts;
    const dats = ["1Week", "1Month", "2Month", "1Year"]
    details.problem_time = dats
    res.json({ code: 200, msg: details });
}

exports.greetings2 = async (req, res) => {
    const { patient_id, disease_id, helthwork_id, week, depart_ment } = req.body;
    console.log(req.body);
    const depart_data = await desease_name.findOne({ _id: disease_id }, { department_name: 1, disease_name: 1 })
    console.log(depart_data)
    const details = {}

    const texts = `Thanks for your reply. When does this ${depart_data.disease_name} affect you the most?`
    details.text = texts
    res.json({ code: 200, msg: details })
}

exports.greetings3 = async (req, res) => {
    const { patient_id, disease_id, helthwork_id, week, depart_ment } = req.body;
    const depart_data = await desease_name.findOne({ _id: disease_id }, { department_name: 1, disease_name: 1 })
    if (depart_data) {
        const details = {}

        const texts = `Can you describe your ${depart_data.disease_name} problem?`
        details.text = texts
        res.json({ code: 200, msg: details })
    } else {
        res.json({ code: 200, msg: "desease not defind" })

    }
}

exports.greetings4 = async (req, res) => {
    const { text_msg, disease_id, patient_id, department } = req.body;
    let greet = '';
    const patients = await patient_name.findOne({ _id: patient_id })
    const patient_status = await patient_data.updateOne({ _id: patient_id }, { $set: { disease_id: disease_id } })
    
    const my_question =await Jiaquestion.findOne({_id:"6091395c2440c212efd0ea78"})

    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr."
    } else {
        greet = "Miss."
    }
    const texts = `${greet} ${patients.patient_name} ${my_question.text}  `
    details.text = texts
    res.json({ code: 200, msg: details })
}

exports.greetings5 = async (req, res) => {
    const { text_msg, disease_id, patient_id, department } = req.body;
    const depart_data = await desease_name.findOne({ _id: disease_id }, { department_name: 1, disease_name: 1 })
    const details = {}

    const text_ms = `Still we are finding. the best ${depart_data.disease_name} doctor for you! `
    details.text = text_ms
    res.json({ code: 200, msg: details })
}

exports.doctor_sagastion = async (req, res) => {
    const { text_msg, disease_id, patient_id, department_name } = req.body;
    const doctor_find = await Doctor_data.findOne({ _id: "6068453d8a864506bebe73f9" });
    const my_question =await Jiaquestion.findOne({_id:"60913aad10daa714512132e4"})

    const details = {}
    if (doctor_find) {
        const text_data = `Dr. ${doctor_find.username} ${my_question.text}`
        details.doctor_detail = doctor_find
        details.text = text_data;
    } else {
        details.text = my_question.text
        details.doctor_detail = {}
    }
    res.json({ code: 200, msg: details })
}

exports.anathor_doctor = async (req, res) => {
    const { responce, disease_id, patient_id, department_name } = req.body;
    const details = {}
    const my_question =await Jiaquestion.findOne({_id:"60913b9a39e957156226364e"})

    if (responce == "Yes") {

        const doctor_find = await Doctor_data.findOne({ Specialization: department_name });
        if (doctor_find) {
            const text_data = `Dr. ${doctor_find.username} ${my_question.text}`
            details.doctor_detail = doctor_find
            details.text = text_data;
        }
    } else {
        details.text = my_question.text2;
    }
    res.json({ code: 200, msg: details })
}

exports.sendMsg_to_doctor = async (req, res) => {
    const { doctor_id, patient_id } = req.body;
    console.log(req.body)
    if (patient_id && doctor_id) {
        const patient_status = await patient_data.updateOne({ _id: patient_id }, { $set: { doctor_id: doctor_id, status: "appoint_requested" } })
        res.json({ code: 200, msg: "send msg success" })
    } else {
        res.json({ code: 400, msg: "something went wrong" })
    }
}

exports.patient_accept_status = (req, res) => {
    const { doctor_id, patient_id } = req.body;
    patient_data.findOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] })
        .then((responce) => {
            res.json({ code: 200, msg: responce })
        }).catch((err) => {
            console.log(err)
            res.json({ code: 400, msg: "something went wrong" })
        })
};


exports.patient_chat_request = async(req, res) => {
    const { doctor_id, patient_id } = req.body;
    console.log(req.body)
    if (patient_id && doctor_id) {
        const patient_status = await patient_data.updateOne({ _id: patient_id }, { $set: { doctor_id: doctor_id, status: "booked" } })
        res.json({ code: 200, msg: "msg send successfully" })
    } else {
        res.json({ code: 400, msg: "something went wrong" })
    }
}

exports.chat_requestedList = (req,res)=>{
    const { doctor_id } = req.body
    const arr = []
    patient_data.find({ $and: [{ status: "booked", doctor_id: doctor_id }] })
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
    });
}


exports.chatAccepted_by_Doctor =(req,res)=>{
    const { doctor_id, patient_id, type } = req.body;
    var otp = randomString(8, 'abcdefgjklmnopqrstuvwxyz')
    if (patient_id && doctor_id) {
        if (type == "1") {
            doctor_patientChat.findOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] })
                .then(async (response) => {
                    if (response) {
                        const data = await doctor_patientChat.updateOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] }, { $set: { doctor_id: doctor_id } }
                        )
                        const update_patient = await patient_data.updateOne({ _id: patient_id }, { $set: { status: "accepted" } })
                        console.log(update_patient)
                        res.json({ code: 200, msg: response })
                    } else {
                        const data_resp = new doctor_patientChat({
                            doctor_id: doctor_id,
                            patient_id: patient_id,
                            room: otp,
                            status: "accepted"
                        })
                        data_resp.save()
                            .then((resp) => {
                                patient_data.updateOne({ _id: patient_id }, { $set: { status: "accepted" } })
                                console.log(patient_data)
                                res.json({ code: 200, msg: resp })
                            }).catch((err) => {
                                res.json({ code: 400, msg: "something went wrong" })

                            })
                    }
                })
        } if (type == "0") {
            doctor_patientChat.findOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] })
                .then(async (response) => {
                    if (response) {
                        const data = await doctor_patientChat.updateOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] }, { $set: { doctor_id: doctor_id } }
                        )
                        const update_patient = await patient_data.updateOne({ _id: patient_id }, { $set: { status: "cancelled" } })
                        console.log(update_patient)
                        res.json({ code: 200, msg: response })
                    } else {
                        const data_resp = new doctor_patientChat({
                            doctor_id: doctor_id,
                            patient_id: patient_id,
                            room: otp,
                            status: "cancelled"
                        })
                        data_resp.save()
                            .then((resp) => {
                                patient_data.updateOne({ _id: patient_id }, { $set: { status: "cancelled" } })
                                console.log(patient_data)

                                res.json({ code: 200, msg: resp })
                            }).catch((err) => {
                                res.json({ code: 400, msg: "something went wrong" })

                            })
                    }
                })
        }
    } else {
        res.json({ code: 400, msg: "something went wrong" })

    }
}





exports.booked_patient = async (req, res) => {
    const { doctor_id } = req.body
    const arr = []
    patient_data.find({ $and: [{ status: "appoint_requested", doctor_id: doctor_id }] })
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
function randomString(len, charSet) {
    charSet = charSet || '0123456789'
    var randomString = ''
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length)
        randomString += charSet.substring(randomPoz, randomPoz + 1)
    }
    return randomString
}


exports.accept_patient = (req, res) => {
    const { doctor_id, patient_id, type } = req.body;
    var otp = randomString(8, 'abcdefgjklmnopqrstuvwxyz')
    if (patient_id && doctor_id) {
        if (type == "1") {
            doctor_patientChat.findOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] })
                .then(async (response) => {
                    if (response) {
                        const data = await doctor_patientChat.updateOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] }, { $set: { doctor_id: doctor_id } }
                        )
                        const update_patient = await patient_data.updateOne({ _id: patient_id }, { $set: { status: "appoint_accepted" } })
                        console.log(update_patient)
                        res.json({ code: 200, msg: response })
                    } else {
                        const data_resp = new doctor_patientChat({
                            doctor_id: doctor_id,
                            patient_id: patient_id,
                            room: otp,
                            status: "appoint_accepted"
                        })
                        data_resp.save()
                            .then((resp) => {
                                patient_data.updateOne({ _id: patient_id }, { $set: { status: "appoint_accepted" } })
                                console.log(patient_data)
                                res.json({ code: 200, msg: resp })
                            }).catch((err) => {
                                res.json({ code: 400, msg: "something went wrong" })

                            })
                    }
                })
        } if (type == "0") {
            doctor_patientChat.findOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] })
                .then(async (response) => {
                    if (response) {
                        const data = await doctor_patientChat.updateOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] }, { $set: { doctor_id: doctor_id } }
                        )
                        const update_patient = await patient_data.updateOne({ _id: patient_id }, { $set: { status: "cancelled" } })
                        console.log(update_patient)
                        res.json({ code: 200, msg: response })
                    } else {
                        const data_resp = new doctor_patientChat({
                            doctor_id: doctor_id,
                            patient_id: patient_id,
                            room: otp,
                            status: "cancelled"
                        })
                        data_resp.save()
                            .then((resp) => {
                                patient_data.updateOne({ _id: patient_id }, { $set: { status: "cancelled" } })
                                console.log(patient_data)

                                res.json({ code: 200, msg: resp })
                            }).catch((err) => {
                                res.json({ code: 400, msg: "something went wrong" })

                            })
                    }
                })
        }
    } else {
        res.json({ code: 400, msg: "something went wrong" })

    }
}




exports.accepted_chat_status = (req, res) => {
    const { doctor_id, patient_id } = req.body;
    const obj = {}
    patient_data.findOne({ $and: [{ doctor_id: doctor_id, patient_id: patient_id }] })
        .then((responce) => {
            if (responce) {
                if (responce.status == "accepted") {
                    obj.msg = "accepted"
                } else {
                    obj.msg = "waiting"
                }
                res.json({ code: 200, msg: obj })
            } else {
                res.json({ code: 400, msg: "something went wrong" })
            }
        }).catch((err) => {
            console.log(err)
            res.json({ code: 400, msg: "something went wrong" })
        })
}


exports.onGoing_patients = (req, res) => {
    const { helth_worker_id } = req.body
    const arr = []
    patient_data.find({ $and: [{ status: "ongoing", health_worker_id: helth_worker_id }] })
        .exec(async (err, List) => {
            if (err) {
                res.json({ code: 400, msg: 'patient list not found' })
            }
            else {
                await Promise.all(List.map(async (items) => {
                    console.log(items)
                    const obj = {}
                    const helth_workerdata = await helth_workers.findOne({ _id: items.health_worker_id })
                    const docter_data = await Doctor_data.findOne({ _id: items.doctor_id })
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
                    obj.doctor_id = docter_data._id
                    obj.doctor_name = docter_data.username
                    obj.doctor_pic = docter_data.profile_pic
                    obj.disease = items.disease
                    obj.disease_id = items.disease_id
                    arr.push(obj)
                })).then((response) => {
                })
                res.json({ code: 200, msg: arr })
            }
        })
}


// http://148.72.214.135