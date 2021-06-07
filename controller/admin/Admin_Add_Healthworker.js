const HealthWorker = require('../../model/helth_worker/users');
const cloud = require("../../cloudinary")
const fs = require('fs')
const bcrypt = require('bcryptjs')
const otp = require("../../otp")

async function hashPassword(password) {
    return await bcrypt.hash(password, 10)
}

exports.health_signup = async (req, res) => {
    const { first_name, mobile, email, password, course } = req.body;
    const hashedPassword = await hashPassword(password)
    const data_check = await HealthWorker.findOne({ email: email })
    if (!data_check) {
        const data_mob = await HealthWorker.findOne({ mobile: mobile })
        if (!data_mob) {
            const datas = new HealthWorker({
                first_name: first_name,
                mobile: mobile,
                email: email,
                password: hashedPassword,
                health_worker_course: course
            })
            datas.save()
                .then((resp) => {
                    res.json({ code: 200, msg: resp })
                }).catch((err) => {
                    res.json({ code: 400, msg: 'health worker not signup' })
                })
        }
        else {
            res.json({ code: 400, msg: "Mobile already exist" })
        }

    } else {
        res.json({ code: 400, msg: "Email already exist" })
    }
}

exports.Add_Health_Worker = async (req, res) => {
    HealthWorker.find({ mobile: req.body.mobile })
        .exec((err, resp) => {
            if (err) {
                res.send({ code: 400, msg: 'data not found' })
            }
            else {
                if (resp.register == "1") {
                    res.send({ code: 400, msg: 'this mobile not already register' })
                }
                else {
                    var healthObj = new HealthWorker(req.body)
                    healthObj.save(async (err, data) => {
                        if (err) {
                            res.json({ code: 400, msg: 'health worker is not add' })
                        }
                        else {
                            if (req.files) {
                                var certificate = req.files.certificate
                                var clinic = req.files.clinic

                                const uploaderF = async (path) => await cloud.Certificate(path, 'Certificates')
                                const uploaderS = async (path) => await cloud.Clinic(path, 'Clinics')

                                const urlsF = []
                                for (const fileF of certificate) {
                                    const { path } = fileF
                                    const newpathF = await uploaderF(path)
                                    urlsF.push(newpathF)
                                    fs.unlinkSync(path)
                                }

                                const urlsS = []
                                for (const fileS of clinic) {
                                    const { path } = fileS
                                    const newpathS = await uploaderS(path)
                                    urlsS.push(newpathS)
                                    fs.unlinkSync(path)
                                }
                                HealthWorker.findByIdAndUpdate(data._id, { $set: { certificate_img: urlsF, register: "1", clinic_img: urlsS } })
                                    .exec((err, healthWorker) => {
                                        if (err) {
                                            res.json({ code: 400, msg: 'images not add in healthworker' })
                                        }
                                        else {
                                            res.json({ code: 200, msg: 'health worker register with image', data: healthWorker })
                                        }
                                    })

                            }
                            else {
                                res.json({ msg: 'health worker register successfully', data: data })
                            }
                        }
                    })

                }
            }
        })

}






exports.findhealthworker = async (req, res) => {
    console.log('fds')
    try {
        const workersData = await HealthWorker.find({ register: 1 });
        res.send(workersData);
    } catch (e) {
        res.send(e);
    }
};


exports.healthworkerVarify = (req, res) => {
    var _pageNumber = req.body.pageNumber,
        _pageSize = 10;
    HealthWorker.find({ $and: [{ register: 1 ,status:"1"}] })
        .skip(_pageNumber > 0 ? ((_pageNumber - 1) * _pageSize) : 0)
        .limit(_pageSize)
        .exec((err, doctor_list) => {
            if (err) {
                console.log(err)
                res.send('HealthWorker list not found')
            }
            else {
                console.log(doctor_list.length)
                res.send(doctor_list)
            }
        })
}

exports.searchHelthworker = async (req, res) => {
    const { search } = req.body
    var blog_name = new RegExp('^' + search, 'i');
    var findQuery = { $and: [{ register: 1 }, { $or: [{ username: { $regex: blog_name } }, { mobile: blog_name }, { email: blog_name }] }] }
    try {
        const workersData = await HealthWorker.find(findQuery);
        res.send(workersData);
    } catch (e) {
        res.send(e);
    }
}



exports.DeleteHealthworker = (req, res) => {
    HealthWorker.remove({ _id: req.body._id }, (err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(resp)
        }
    })
};


exports.helthworker_status = (req, res) => {
    if (req.body.status == 1 || req.body.status == "1") {
        HealthWorker.updateOne({ _id: req.body._id }, { $set: { status: '1' } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    }
    else if (req.body.status == 0 || req.body.status == "0") {
        HealthWorker.updateOne({ _id: req.body._id }, { $set: { status: '0' } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    } else if (req.body.status == 2 || req.body.status == "2") {
        console.log("pending")
    }
}
