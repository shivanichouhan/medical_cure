const add_banner = require("../../model/admin/banner_img")
const cloud = require("../../cloudinary")
const fs = require('fs')
const { url } = require("inspector")

exports.banner = async (req,res)=>{
const uploader = async (path)=> await cloud.uploads(path,'Images')
if(req.method === 'POST'){
    const urls =[]
    const files = req.files

    for(const file of files){
        const { path } =file
        const newpath = await uploader(path)
        urls.push(newpath)
        fs.unlinkSync(path)
    }
    var img = new add_banner({
        banner_img:urls
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
else{
    res.status(405).json({
        err:"image not uploads"
    })
}
}

exports.list_img =(req,res)=>{
    add_banner.findOne()
    .select('banner_img')
    .then((resp)=>{
        res.json(resp)
    }).catch((error)=>{
        res.json({error:'banner image not find'})
    })
}

