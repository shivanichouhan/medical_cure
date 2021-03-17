
const Educational = require('../../model/Doctor/doctor_regis')
const cloud = require('../../cloudinary')
const fs = require("fs")

exports.doctor_edu = async (req, res) => {

    Educational.updateOne({ _id: req.params.user_id }, { $set: req.body },
        (async (err, resp) => {
            if (err) {
                console.log(err,"kjkj")
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





