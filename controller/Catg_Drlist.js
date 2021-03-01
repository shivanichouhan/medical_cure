const Drlist = require('../model/Drlist_model');

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})



exports.specilist_image = (req, res) => {
    const { Diabetilogy,
        Pulmunology,
        Neurology,
        Dermotology,
        Orthopaedics,
        Cardiology,
        General_physician,
        Corona_expert

    } = req.body
    console.log(req.files)
    if (req.files) {
        const data = new Drlist({
            Diabetilogy: Diabetilogy,
            Pulmunology: Pulmunology,
            Neurology: Neurology,
            Dermotology: Dermotology,
            Orthopaedics: Orthopaedics,
            Cardiology: Cardiology,
            General_physician: General_physician,
            Corona_expert: Corona_expert
        })
        const uniqueFilename = new Date().toISOString()
        console.log(req.files)

        const diabetilogy = req.files.Diabetilogy
        const diabetilogy_path = diabetilogy[0].path
        cloudenary.uploader.upload(
            diabetilogy_path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, diabetilogyimage) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(diabetilogy_path)
                data.Diabetilogy = diabetilogyimage.secure_url
            })

        const path = req.files.Pulmunology;
        const pulmunology_path = path[0].path
        cloudenary.uploader.upload(
            pulmunology_path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, pulmunologyimage) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(pulmunology_path)
                data.Pulmunology = pulmunologyimage.secure_url

                /*const path = req.files.Neurology;
                const neurology_path = path[0].path
                cloudenary.uploader.upload(
                    neurology_path,
                    { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
                    function (err, neurologyimage) {
                        if (err) console.log(err)
                        console.log('file uploaded to Cloudinary')
                        const fs = require('fs')
                        fs.unlinkSync(pulmunology_path)
                        data.Neurology = neurologyimage.secure_url*/

                data.p_id = data._id
                data.save()
                    .then((resp) => {
                        res.json({
                            code: 200, msg: "SpecilistImages Uploaded"
                        })
                    })

                    
            }
        )
    } else {
        res.send("you dint choose image file")
    }
}

exports.specilist_image_data = (req, res) => {
    Drlist.find()
        .then((resp) => {
            res.json({ code: 200, msg: resp })
        })
}
