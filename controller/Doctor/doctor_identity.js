const Identity = require('../../model/Doctor/doctor_regis')

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})



exports.doctor_identity = (req, res) => {
    const {
        select_identity,
        PAN_Number,
        PanCard_front_side_img,
        PanCard_back_side_img

    } = req.body
    console.log(req.files)
    if (req.files) {
        const data = {
            select_identity: select_identity,
            PAN_Number: PAN_Number,
            PanCard_front_side_img: PanCard_front_side_img,
            PanCard_back_side_img: PanCard_back_side_img
        }
        const uniqueFilename = new Date().toISOString()
        console.log(req.files)

        const pancard = req.files.PanCard_front_side_img
        const pancard_front = pancard[0].path
        cloudenary.uploader.upload(
            pancard_front,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, 
            function (err, pancardimg) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(pancard_front)
                data.PanCard_front_side_img = pancardimg.secure_url
            })

        const path = req.files.PanCard_back_side_img;
        const image_path = path[0].path
        cloudenary.uploader.upload(
            image_path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, 
            
            // directory and tags are optional
            function (err, pancardimg) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(image_path)
                data.PanCard_back_side_img = pancardimg.secure_url
                Identity.updateOne({_id:req.params.user_id},{$set:data})
                    .then((resp) => {
                        res.json({
                            code: 200, msg: "Doctor Identity Details Uploaded"
                        })
                    })
            }
        )
    } else {
        res.send("you dint choose PanCard_image file")
    }
}

