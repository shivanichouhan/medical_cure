const Contact = require('../../model/helth_worker/Contacts_model');

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})


exports.Contact_data = (req, res) => {
    const { 
        image,
        Description,
        Contact_No,
        Emailid,
        Website } = req.body
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
                const data = new Contact({
                    image:image,
                    Description: Description,
                    Contact_No: Contact_No,
                    Emailid:Emailid,
                    Website:Website,
                    image: image.secure_url
                })
                data.p_id = data._id
                data.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "data save" })
                    })
            }
        )
    } else {
        res.send("you dint choose image file")
    }

}


