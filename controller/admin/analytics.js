const doctor = require("../../model/Doctor/doctor_regis")
const doctor_mitra = require("../../model/helth_worker/users")
const Patients_list  = require("../../model/patient/patient_signin")

exports.total_doctors = (req, res) => {
    doctor.count({}, function (err, count) {
        console.log("Number of users:", count);
        res.send({ totalDoctor: count });
    })
};

exports.totalDoctor_mitra = (req, res) => {
    doctor_mitra.count({}, function (err, count) {
        console.log("Number of doctor_mitra:", count);
        res.send({ totalDoctorMitra: count });
    })
};


exports.totalPatients = (req,res)=>{
    Patients_list.count({}, function (err, count) {
        console.log("Number of doctor_mitra:", count);
        res.send({ totalPatients: count });
    })
};