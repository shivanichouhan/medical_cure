const Feedback = require('../../model/helth_worker/feedback_model');

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})


exports.add_feedback = (req, res) => {
    const {
        Rate_Us,
        Rate_Status,
        Comment,
        User_Image
    } = req.body
    if (req.file) {
        const uniqueFilename = new Date().toISOString()
        const path = req.file.path
        cloudenary.uploader.upload(
            path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, image) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(path)
                const data = new Feedback({
                    Rate_Us: Rate_Us,
                    Rate_Status: Rate_Status,
                    Comment: Comment,
                    User_Image: User_Image,
                    image: image.secure_url
                })
                data.p_id = data._id
                data.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "Successfully Feedback" })
                    })
            }
        )
    } else {
        res.send("you dint choose image file")
    }

}


