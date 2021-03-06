const product = require('../../model/helth_worker/products');
const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
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
                data.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "data save" })
                    })
                // product
            }
        )
    }else{
        res.send("you dint choose image file")
    }

}

exports.image_data =(req,res)=>{
    product.find()
    .then((resp)=>{
        res.json({code:200,msg:resp})
    })
}