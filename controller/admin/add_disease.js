const depart = require("../../model/admin/department/departments")
const disease = require("../../model/admin/add_disease")
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.list_disease = (req, res) => {
    disease.find()
        .exec((err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json({ data: resp })
            }
        })

}

exports.create_disease = (req, res) => {
    console.log(req.body, 'run')
    var diseaseObj = new disease(req.body)
    diseaseObj.save((err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.file) {
                const { path } = req.file
                cloud.uploads(path).then((result) => {
                    fs.unlinkSync(path)
                    disease.findByIdAndUpdate(resp._id, { $set: { icon: result.url } })
                        .then((data) => {
                            // res.json(data)
                            depart.updateOne({ department_name: req.body.department_name }, { $push: { disease: data } }
                                , (err, depatUpdte) => {
                                    if (err) {
                                        res.json(err)
                                    }
                                    else {
                                        res.json({ Data: data })
                                    }
                                })
                        }).catch((err) => {
                            res.json(err)
                        })
                }).catch((error) => {
                    res.json(error)
                })
            }
        }
    })
}

exports.edit_disease = (req, res) => {
    disease.updateOne({ _id: req.params.diseaseId }, req.body, (err, data) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.file) {
                const { path } = req.file
                cloud.uploads(path).then((result) => {
                    fs.unlinkSync(path)
                    disease.findByIdAndUpdate(req.params.diseaseId, { $set: { icon: result.url } })
                        .then((data) => {
                            res.json({ msg: 'disease update successfully with image' })
                        }).catch((err) => {
                            res.json(err)
                        })
                }).catch((error) => {
                    res.json(error)
                })
            }
            else {
                res.json({ msg: 'disease update successfully', result: data })
            }
        }
    })
}

exports.remove_disease = (req, res) => {
    disease.remove({ _id: req.params.diseaseId }, (err, del_disease) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(del_disease)
        }
    })
}