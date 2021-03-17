const Identity = require('../../model/Doctor/doctor_regis')
const cloud = require('../../cloudinary')
const fs = require("fs")

exports.doctor_identity = (req, res) => {

    Identity.updateOne({ _id: req.params.user_id },{$set:req.body},
    async (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.files) {
                var i_front = req.files.PanCard_front_side_img
                var i_back = req.files.PanCard_back_side_img

                const idenRegF = async (path) => await cloud.iden_front(path)
                const idenRegB = async (path) => await cloud.iden_back(path)


                const iF = i_front[0].path
                const iB = i_back[0].path

                const url_front = await idenRegF(iF)
                const url_back = await idenRegB(iB)

                Identity.updateOne({ _id: req.params.user_id }, { $set: { PanCard_front_side_img: url_front, PanCard_back_side_img: url_back } })
                    .exec((err, proRep) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            fs.unlinkSync(iF)
                            fs.unlinkSync(iB)
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
