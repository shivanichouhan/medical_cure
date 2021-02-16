const product = require('../model/products');

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'integer-infotech',
    api_key: '564957891162557',
    api_secret: '6IfVSBeHWKxZsTbVbbb3pitajlE'
})


exports.add_image = (req, res) => {
    const { title, summery } = req.body
    if (req.file) {
        const uniqueFilename = new Date().toISOString()
        cloudenary.uploader.upload(
            path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, image) {
                if (err) return res.send(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(path)
                const data = new product({
                    title: title,
                    summery: summery,
                    image: image.secure_url
                })
                data.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "data save" })
                    })
                product
            }
        )
    } else {
        res.send("you dint choose image file")
    }

}