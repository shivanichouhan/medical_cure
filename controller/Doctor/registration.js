const Register = require('../../model/Doctor/doctor_regis')

exports.doctor_reg = async (req, res) => {
    const {
        Gender,
        DOB,
        Blood_group
    } = req.body

    const data_find = await Register.findOne({ DOB: DOB })


    if (data_find) {
        res.send('this is already exist')
    } else {
        const parsonal_details = new Register({
            Gender:Gender,
            DOB:DOB,
            Blood_group:Blood_group
        })
        parsonal_details
            .save()
            .then(() => {
                res.json({ parsonal_details: parsonal_details })
            })
            .catch(e => {
                res.send(e)
            })
    }
}