const HealthWorker = require('../model/Add_Healthworker');

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})



exports.Add_Health_Worker = (req, res) => {
    const {
        health_worker_course, Certificate, experience, state, city, pincode, address, Clinic, dob, gender, blood_group, adhar_no, account_no, ifsc_code

    } = req.body
    console.log(req.files)
    if (req.files) {
        const data = new HealthWorker({
            health_worker_course: health_worker_course,
            Certificate: Certificate,
            experience: experience,
            state: state,
            city: city,
            pincode: pincode,
            address: address,
            Clinic: Clinic,
            dob: dob,
            gender: gender,
            blood_group: blood_group,
            adhar_no: adhar_no,
            account_no: account_no,
            ifsc_code: ifsc_code
        })
        const uniqueFilename = new Date().toISOString()
        console.log(req.files)

        const certificate = req.files.Certificate
        const certificate_path = certificate[0].path
        cloudenary.uploader.upload(
            certificate_path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, certificateimage) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(certificate_path)
                data.Certificate = certificateimage.secure_url
            })

        const path = req.files.Clinic;
        const clinic_path = path[0].path
        cloudenary.uploader.upload(
            clinic_path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, clinicimage) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(clinic_path)
                data.Clinic = clinicimage.secure_url
                data.p_id = data._id
                data.save()
                    .then((resp) => {
                        res.json({
                            code: 200, msg: "Certificate Uploaded"
                        })
                    })
            }
        )
    } else {
        res.send("you dint choose image file")
    }
}

exports.findhealthworker = async (req, res) => {
    try {
        const workersData = await HealthWorker.find();
        res.send(workersData);
    } catch (e) {
        res.send(e);
    }
};

exports.DeleteHealthworker = (req, res) => {
    HealthWorker.findByIdAndRemove(req.params.healthworkerId)
        .then(healthworker => {
            if (!healthworker) {
                return res.status(404).send({
                    message: "Healthworker Not found with id " + req.params.healthworkerId
                });
            }
            res.send({ message: "HealthWorker deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "HealthWorker not found with id " + req.params.healthworkerId
                });
            }
            return res.status(500).send({
                message: "Could not delete Healthworker  with id " + req.params.healthworkerId
            });
        });
};
