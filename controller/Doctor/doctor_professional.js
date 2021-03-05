const Professional = require('../../model/Doctor/doctor_regis')

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})



exports.doctor_professional = (req, res) => {
    const {

        Employment_status,
        Specialization,
        Experience,
        State,
        City,
        Address,
        pincode,
        Lincense_no,
        issued_date,
        License_img_front_side,
        License_img_back_side

    } = req.body
    console.log(req.files)
    if (req.files) {
        const data = {
            Employment_status:Employment_status,
            Specialization:Specialization,
            Experience:Experience,
            State:State,
            City:City,
            Address:Address,
            pincode:pincode,
            Lincense_no:Lincense_no,
            issued_date:issued_date,
            License_img_front_side:License_img_front_side,
            License_img_back_side:License_img_back_side
        }
        const uniqueFilename = new Date().toISOString()
        console.log(req.files)

        const lincense = req.files.License_img_front_side
        const lincense_front = lincense[0].path
        cloudenary.uploader.upload(
            lincense_front,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, lincenseimage) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(lincense_front)
                data.License_img_front_side = lincenseimage.secure_url
            })

        const path = req.files.License_img_back_side;
        const image_path = path[0].path
        cloudenary.uploader.upload(
            image_path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, licenseimg) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(image_path)
                data.License_img_back_side = licenseimg.secure_url
                data.p_id = data._id
                Professional.updateOne({_id:req.params.user_id},{$set:data})
                    .then((resp) => {
                        res.json({
                            code: 200, msg: "License_Image Uploaded"
                        })
                    })
            }
        )
    } else {
        res.send("you dint choose license_image file")
    }
}


