const emp = require('../../../model/admin/employee/emp_reg')
const cloud = require('../../../cloudinary')
const fs = require("fs")

exports.list_emp = (req, res) => {
    emp.find().exec((err, list) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json({ data: list })
        }
    })
}

exports.reg_emp = (req, res) => {
    var empObj = new emp(req.body)
    empObj.save(async (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            if (req.files) {
                var e_front = req.files.front_identity
                var e_back = req.files.back_identity

                const empRegF = async (path) => await cloud.emp_iden_front(path)
                const empRegS = async (path) => await cloud.emp_iden_back(path)

                const eF = e_front[0].path
                const eS = e_back[0].path

                const url_front = await empRegF(eF)
                const url_back = await empRegS(eS)

                emp.findByIdAndUpdate(resp._id, { $set: { front_identity: url_front, back_identity: url_back } })
                    .exec((err, empRep) => {
                        if (err) {
                            res.json(err)
                        }
                        else {
                            fs.unlinkSync(eF)
                            fs.unlinkSync(eS)
                            res.json({ data: empRep })
                        }
                    })

            }
            else {
                res.json({ data: resp })
            }
        }
    })
}

exports.emp_status = (req, res) => {
    //1 for active //0 for dactive
    if (req.body.status === 1) {
        emp.updateOne({ _id: req.body.empId }, { $set: { status: 0 } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    }

    else if (req.body.status === 0) {
        emp.updateOne({ _id: req.body.empId }, { $set: { status: 1 } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    }
}

exports.remove_emp = (req, res) => {
    emp.remove((err, empDel) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(empDel)
        }
    })
}