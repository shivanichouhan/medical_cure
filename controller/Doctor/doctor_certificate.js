const Certificates = require('../../model/Doctor/doctor_regis')
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.doctor_certificate = async (req, res) => {
    const uploader = async (path) => await cloud.Certificate(path, 'certificate')

    const urls = []
    const files = req.files

    for (const file of files) {
        const { path } = file
        const newpath = await uploader(path)
        urls.push(newpath)
        fs.unlinkSync(path)
    }
    var cert = new Certificates({
        certificate: urls
    })
    console.log(urls)
    Certificates.updateOne({ _id: req.params.user_id },{ $push: { certificate: urls }})
        .then((resp) => {
            res.json({ code: 200, msg: "Certificate Uploaded" })
        })
}





