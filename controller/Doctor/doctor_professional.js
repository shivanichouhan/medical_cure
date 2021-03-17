const Professional = require('../../model/Doctor/doctor_regis')
const cloud = require('../../cloudinary')
const fs = require("fs")

exports.doctor_professional = (req, res) => {
    // var profObj = new Professional(req.body)
    Professional.updateOne({ _id: req.params.user_id },{$set:req.body},
    async (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.files) {
                var p_front = req.files.License_img_front_side
                var p_back = req.files.License_img_back_side

                const proRegF = async (path) => await cloud.License_front_side(path)
                const proRegB = async (path) => await cloud.License_back_side(path)


                const pF = p_front[0].path
                const pB = p_back[0].path

                const url_front = await proRegF(pF)
                const url_back = await proRegB(pB)

                Professional.updateOne({ _id: req.params.user_id }, { $set: { License_img_front_side: url_front, License_img_back_side: url_back } })
                    .exec((err, proRep) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            fs.unlinkSync(pF)
                            fs.unlinkSync(pB)
                            res.json({ data: proRep })
                        }
                    })

            }
            else {
                res.json({ data: resp })
            }
        }
    })
}
