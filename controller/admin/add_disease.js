const depart = require("../../model/admin/department/departments")
const disease = require("../../model/admin/add_disease")
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.lists_diseases = (req,res)=>{
    disease.find()
    .exec((err, resp) => {
        if (err) {
            res.send('disease list not found')
        }
        else {
            res.send(resp)
        }
    })
}

exports.list_disease = (req, res) => {
    disease.find()
        .exec((err, resp) => {
            if (err) {
                res.json({code:400,msg:'disease list not found'})
            }
            else {
                res.json({ code:200,msg: resp })
            }
        })
}

exports.create_disease = (req, res) => {
    console.log(req.body, 'run')
    var diseaseObj = new disease(req.body)
    diseaseObj.save((err, resp) => {
        if (err) {
            res.json({code:400,msg:'disease not add'})
        }
        else {
            if (req.file) {
                const { path } = req.file
                cloud.uploads(path).then((result) => {
                    fs.unlinkSync(path)
                    console.log(result)
                    disease.findByIdAndUpdate(resp._id, { $set: { icon: result.url } })
                        .then((data) => {
                            // res.json(data)
                            depart.updateOne({ department_name: req.body.department_name }, { $push: { disease: data } }
                                , (err, depatUpdte) => {
                                    if (err) {
                                        res.json({code:400,msg:'disease not add in department'})
                                    }
                                    else {
                                        res.json({code:200,msg: 'disease add successfully with img' })
                                    }
                                })
                        }).catch((err) => {
                            res.json({code:400,msg:'img not add in disease'})
                        })
                }).catch((error) => {
                    res.json({code:400,msg:'img url not create'})
                })
            }
            else{
                res.json({code:200,msg:'disease add successfully'})
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
            res.json({code:400,msg:'disease not remove'})
        }
        else {
            res.json({code:200,msg:'disease remove successfully'})
        }
    })
}