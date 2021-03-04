const Doctor = require('../model/registerdoctor.js')

exports.doctor = async (req, res) => {
    const {
        Name,
        EmailId,
        Address,
        Education,
        MobileNumber
        //Image
    } = req.body

    const data_find = await Doctor.findOne({ MobileNumber: MobileNumber })


    if (data_find) {
        res.send('this is already exist')
    } else {
        const cont_details = new Doctor({
            Name: Name,
            EmailId: EmailId,
            Address: Address,
            Education: Education,
            MobileNumber: MobileNumber,
            //Image : Image
        })
        cont_details
            .save()
            .then(() => {
                res.json({ cont_details: cont_details })
            })
            .catch(e => {
                res.send(e)
            })
    }


}

exports.finddoctors = async (req, res) => {
    try {
        const doctorsData = await Doctor.find();
        res.send(doctorsData);
    } catch (e) {
        res.send(e);
    }
}

exports.updatedoctors = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Doctor list can not be empty"
        });
    }

    Doctor.findByIdAndUpdate(req.params.doctorId, {
        Name: req.body.Name || "No doctor Name",
        EmailId: req.body.EmailId,
        Address: req.body.Address,
        Education: req.body.Education,
        MobileNumber: req.body.MobileNumber

    }, { new: true })
        .then(doctor => {
            if (!doctor) {
                return res.status(404).send({
                    message: "Doctor not found with id " + req.params.doctorId
                });
            }
            res.send(doctor);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Doctor not found with id " + req.params.doctorId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.doctorId
            });
        });
};

exports.deletedoctors = (req, res) => {
    Doctor.findByIdAndRemove(req.params.doctorId)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).send({
                    message: "doctor not found with id " + req.params.doctorId
                });
            }
            res.send({ message: "doctor deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "doctor not found with id " + req.params.doctorId
                });
            }
            return res.status(500).send({
                message: "Could not delete doctor with id " + req.params.doctorId
            });
        });
};