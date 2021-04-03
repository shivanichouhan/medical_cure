const desease_name = require("../../model/admin/add_disease");
const patient_name = require("../../model/helth_worker/patient_registration")
var colors = require('colors');
const chalk = require('chalk');
const Doctor_data = require("../../model/Doctor/doctor_regis")
const patient_data = require("../../model/helth_worker/patient_registration")
const helth_workers = require("../../model/helth_worker/users")
const doctor_patientChat = require("../../model/Doctor/doctor_patient_chat")


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
    const texts = `${mornings} ${greet}. ${patients.patient_name} Namaste! Welcome to tele-consultation by XpressCure. I am Jia. I shall get the best treatment for you. Please provide your chief complaint.`
    details.text = texts;
    const texts2 = `${greet}. ${patients.patient_name}, since how long has this problem troubled you?`
    details.texts = texts2;
    const dats = ["1Week", "1Month", "2Month", "1Year"]
    details.problem_time = dats
    // details.disease = depart_data
    res.json({ code: 200, msg: details })
}


exports.greetings1 = async (req, res) => {
    const { patient_id, disease_id, helthwork_id } = req.body;
    const patients = await patient_name.findOne({ _id: patient_id })

    let greet = '';
    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr"
    } else {
        greet = "Miss"
    }
    const texts = `Alright ${greet}. ${patients.patient_name}, since how long has this problem troubled you?`
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

    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr."
    } else {
        greet = "Miss."
    }
    const texts = `Thank you. ${greet} ${patients.patient_name}.We are finding the most suitable doctor for you. `
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
    const doctor_find = await Doctor_data.findOne({ Specialization: department_name });
    const details = {}
    if (doctor_find) {
        const text_data = `Dr. ${doctor_find.username} shall take up your case. Book your consultation now.`
        details.doctor_detail = doctor_find
        details.text = text_data;
    } else {
        details.text = "now There is no doctor available if you want to checkup anathor then say yes."
        details.doctor_detail = {}
    }
    res.json({ code: 200, msg: details })
}

exports.anathor_doctor = async (req, res) => {
    const { responce, disease_id, patient_id, department_name } = req.body;
    const details = {}

    if (responce == "Yes") {
        const doctor_find = await Doctor_data.findOne({ Specialization: department_name });
        if (doctor_find) {
            const text_data = `Dr. ${doctor_find.username} shall take up your case. Book your consultation now.`
            details.doctor_detail = doctor_find
            details.text = text_data;
        }
    } else {
        details.text = "Thank You for using app.";
    }
    res.json({ code: 200, msg: details })
}

exports.sendMsg_to_doctor = async (req, res) => {
    const { doctor_id, patient_id } = req.body;
    if (patient_id && doctor_id) {
        const patient_status = await patient_data.updateOne({ _id: patient_id }, { $set: { doctor_id: doctor_id, status: "booked" } })
        res.json({ code: 200, msg: "send msg success" })
    } else {
        res.json({ code: 400, msg: "something went wrong" })
    }
}


exports.booked_patient = async (req, res) => {
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
                        const update_patient = await patient_data.updateOne({_id: patient_id }, { $set: { status: "accepted" } })
                        console.log(update_patient)
                        res.json({ code: 200, msg: response })
                    } else {
                        const data_resp = new doctor_patientChat({
                            doctor_id: doctor_id,
                            patient_id: patient_id,
                            room: otp,
                            status:"accepted"
                        })
                        data_resp.save()
                            .then((resp) => {
                                patient_data.updateOne({_id: patient_id }, { $set: { status: "accepted" } })
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
                        const update_patient = await patient_data.updateOne({_id: patient_id }, { $set: { status: "cancelled" } })
                        console.log(update_patient)
                        res.json({ code: 200, msg: response })
                    } else {
                        const data_resp = new doctor_patientChat({
                            doctor_id: doctor_id,
                            patient_id: patient_id,
                            room: otp,
                            status:"cancelled"
                        })
                        data_resp.save()
                            .then((resp) => {
                                patient_data.updateOne({_id: patient_id }, { $set: { status: "cancelled" } })
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


exports.patient_accept_status =(req,res)=>{
    const { doctor_id, patient_id}=req.body;
    patient_data.findOne({$and:[{doctor_id:doctor_id,patient_id:patient_id}]})
    .then((responce)=>{
        res.json({code:200,msg:responce})
    }).catch((err)=>{
        console.log(err)
        res.json({code:400,msg:"something went wrong"})
    })
}

// http://148.72.214.135