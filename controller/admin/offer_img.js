const add_offers = require("../../model/admin/offer_img")
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.offers = async (req,res)=>{
    const uploader = async (path)=> await cloud.uploads(path,'Offers')
        const urls =[]
        const files = req.files

        for(const file of files){
            const { path } =file
            const newpath = await uploader(path)
            urls.push(newpath)
            fs.unlinkSync(path)
        }
        var img = new add_offers({
            offer_img:urls
        })
        img.save((err,resp)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(resp)
            }
        })
    }
