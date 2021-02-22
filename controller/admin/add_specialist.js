const specialist = require("../../model/admin/add_specialist")
const cloudenary = require('cloudinary').v2
const dotenv =require('dotenv')
dotenv.config()

exports.create =(req,res)=>{
    console.log('run')
    var specialObj = new specialist(req.body)
    specialObj.save((err,sp)=>{
        if(err){
            res.json(err)
        }
        else{
            cloudenary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.cloud_api_key,
                api_secret: process.env.cloud_api_secret
            });

        var filename = req.file.originalname;
        var path = req.file.path;
        var uniquefilename = filename+(Date.now())

        cloudenary.uploader.upload(
            path, { public_id: `specialist/${uniquefilename}`, tags: `special` }, // directory and tags are optional
            function (err, image){
                if (err) return res.send(err)
                console.log(image)
                specialist.findByIdAndUpdate({_id:sp._id},{$set:{ specialist_img:image.url}})
                    .then((response) => {
                        res.send(response)
                }).catch((error)=>{
                    res.send("image not add in program")
                    console.log(error)
                });
            }
          );
        }
    })
}