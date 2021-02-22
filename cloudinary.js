const cloudenary = require('cloudinary')
const dotenv =require('dotenv')
dotenv.config()

cloudenary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret
});

exports.uploads = (file,folder)=>{
    return new Promise(resolve=>{
        cloudenary.uploader.upload(file,(result)=>{
            resolve({
                url:result.url,
                id:result.public_id
            },{
                resource_type:"auto",
                folder:folder
            })
        }) 
    })
}