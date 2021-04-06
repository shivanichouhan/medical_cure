const Doctor_data = require("../../model/Doctor/doctor_regis")
const patient_data = require("../../model/helth_worker/patient_registration")
const helth_workers = require("../../model/helth_worker/users")



exports.allAppointmentList = (req, res) => {
    const { doctor_id } = req.body
    const arr = []
    patient_data.find({ doctor_id: doctor_id })
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

exports.completeAppointmentlist = (req, res) => {
    const { doctor_id } = req.body
    const arr = []
    patient_data.find({ $and: [{ status: "accepted", doctor_id: doctor_id }] })
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
