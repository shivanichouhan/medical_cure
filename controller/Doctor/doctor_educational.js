
const Educational = require('../../model/Doctor/doctor_regis')
const cloud = require('../../cloudinary')
const fs = require("fs")

exports.doctor_edu = async (req, res) => {

    Educational.updateOne({ _id: req.params.user_id }, { $set: req.body },
        (async (err, resp) => {
            if (err) {
                //console.log(err,"kjkj")
                res.json(err)
            }
            else {
                if (req.files.length > 0) {

                   
                    const certificateF = async (path) => await cloud.certificate_Img(path)
            
                    const urlsF = []
                    const file_data = req.files
                    await Promise.all(file_data.map(async(fileF)=>{
                        const { path } = fileF
                        const newpathF = await certificateF(path)
                        urlsF.push(newpathF)
                        fs.unlinkSync(path)
                        const data = await Educational.updateOne({ _id: req.params.user_id }, { $push: { certificate_Img: urlsF } })
                        //console.log(data)
                    
                    })).then((resp)=>{

                    })
                    res.send("Data Saved")
                   
                }
                else {
                    res.json(med)
                }
            }
        }))
}

exports.edit_educational = (req, res) => {
    console.log(req.body)
    Educational.updateOne({ _id: req.params.user_id }, req.body)
        .exec((err, updtedoctor) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
            else {
                console.log(req.files, "hgghfthftyfuyfit")
                if (req.files.length > 0) {
                    console.log("shubham")
                    for (row of req.files) {
                        console.log(row)
                        var p = row.path
                    }
                    const path = p
                    console.log(path)
                    cloud.certificate_Img(path).then((resp) => {
                        console.log(req.body)
                        console.log(resp)
                        Educational.updateOne({ 'certificate_Img.imgId': req.body.imgId }, { $set: { "certificate_Img.$.url": resp.url, "certificate_Img.$.imgId": resp.imgId } })
                            .exec((err, doctorUpdte) => {
                                if (err) {
                                    console.log(err)
                                    res.json(err)
                                }
                                else {
                                    res.json({ doctorUpdte })
                                }
                            })
                    }).catch((error) => {
                        res.json(error)
                    })
                }
                else {
                    res.json({ msg: 'Educational details updated successfully' })
                }
            }
        })
}




