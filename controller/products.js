const product = require('../model/products');

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dph53engs',
    api_key: '844719118241756',
    api_secret: '6IPsNfYyr9i43_qOhNPvLTh7Tg4'
})


exports.add_image = (req, res) => {
    const { title, summery } = req.body
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
                const data = new product({
                    title: title,
                    summery: summery,
                    image: image.secure_url
                })
                data.p_id = data._id
                data.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "data save" })
                    })
                // product
            }
        )
    } else {
        res.send("you dint choose image file")
    }

}



exports.image_data =(req,res)=>{
    product.find()
    .then((resp)=>{
        res.json({code:200,msg:resp})
    })
}