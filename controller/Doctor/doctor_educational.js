const Educational = require('../../model/Doctor/doctor_regis')

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})


exports.doctor_edu = (req, res) => {
    const {

        UGCollege_University,
        Course,
        passing_year,
        PGCollege_or_University,
        Courses,
        pass_year,
        Certificate_University,
        certificate_Img,
        passing_year_certificate

    } = req.body
    if (req.file) {
        const uniqueFilename = new Date().toISOString()

        console.log(req.file)
        const path = req.file.path
        cloudenary.uploader.upload(
            path,
            { public_id: `blog/${uniqueFilename}`, tags: `blog` }, // directory and tags are optional
            function (err, certificate_Img) {
                if (err) console.log(err)
                console.log('file uploaded to Cloudinary')
                const fs = require('fs')
                fs.unlinkSync(path)
                const data = {
                    UGCollege_University: UGCollege_University,
                    Course: Course,
                    passing_year: passing_year,
                    PGCollege_or_University: PGCollege_or_University,
                    Courses: Courses,
                    pass_year: pass_year,
                    Certificate_University: Certificate_University,
                    certificate_Img: certificate_Img,
                    passing_year_certificate: passing_year_certificate,
                    certificate_Img: certificate_Img.secure_url
                }
                //data.p_id = data._id
                Educational.updateOne({_id:req.params.user_id},{$set:data})
                    .then((resp) => {
                        res.json({ code: 200, msg: "data save" })
                    })
            }
        )
    } else {
        res.send("you didn't choose Certificate")
    }

}


