const Certificates = require('../../model/Doctor/doctor_regis')
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.doctor_certificate = async (req, res) => {
    const uploader = async (path) => await cloud.Certificate(path, 'doctor_certificate')

    const urls = []
    const files = req.files

    for (const file of files) {
        const { path } = file
        const newpath = await uploader(path)
        urls.push(newpath)
        fs.unlinkSync(path)
    }
    var ctf = new Certificates({
        offer_img: urls
    })
    ctf.save((err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json(resp)
        }
    })
}

/*
const Certificates = require('../../model/Doctor/doctor_regis')

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})


exports.doctor_certificate = (req, res) => {
    const { certificate } = req.body
    if (req.file) {
        const uniqueFilename = new Date().toISOString()

        console.log(req.file)
        const path = req.file.path
        cloudenary.uploader.upload(
            path,
            { public_id: `Certificate/${uniqueFilename}`, tags: `Certificate` }, // directory and tags are optional
            function (err, certificate_Img) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(path)
                const data = {

                    certificate: certificate,
                    certificate: certificate_Img.secure_url
                }
                //data.p_id = data._id
                Certificates.updateOne({ _id: req.params.user_id }, { $push: data })
                //({'blog_img':req.body.imgId},{$set:{"blog_img.$.url":resp.url,"blog_img.$.imgId":resp.imgId}})
                    .then((resp) => {
                        res.json({ code: 200, msg: "Certificate Uploaded" })
                    })
            }
        )
    } else {
        res.send("you didn't choose Certificate")
    }

}*/


