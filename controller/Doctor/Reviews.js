const doctorModel = require("../../model/Doctor/doctor_regis")
const Review = require("../../model/Doctor/Reviews")
const patient = require("../../model/patient/patient_signin")

exports.doctor_reviews = (req, res) => {
    //console.log("sveltosh")
    const { patient_id, doctor_id, rating } = req.body
    Review.findOne({ $and: [{ doctor_Id: doctor_id, patient_Id: patient_id }] })
        .then((respo) => {
            if (respo) {
                //doctorModel.findById({_id = req.body.doctor_id})
            } else {
                var reviewObj = new Review(req.body)
                reviewObj.save((err, doctor_reviews) => {
                    if (err) {
                        res.json(err)
                    }
                    else {
                       
                    }
                })
            }
        })
}


/*Review.updateOne({ _id: req.body.rating })
                           .then((response) => {
                               res.send(response)
                           }).catch((error) => {
                               res.send("Not updated review")
                               //console.log(error)
                           })*/