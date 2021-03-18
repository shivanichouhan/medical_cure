const cloudenary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()

cloudenary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret
});

exports.uploads = (file) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `medial/${uniqueFilename}`, tags: `medical` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.Certificate = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `certificate/${uniqueFilename}`, tags: `certificate` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.Clinic = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `clinic/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
};

exports.edit_profile = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `profile/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.doctor_reg = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `doctor/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.licence_front = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `doctor/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.licence_back = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `doctor/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.doc_pass = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `doctor/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.iden_front = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `doctor/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.iden_back = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `doctor/${uniqueFilename}`, tags: `clinic` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.emp_iden_front = (file, folder) => {

    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `employee/${uniqueFilename}`, tags: `employee` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}



exports.patient = (file,folder)=>{
    return new Promise(resolve=>{
        var uniqueFilename=Date.now()
        cloudenary.uploader.upload(file,{public_id: `patient/${uniqueFilename}`, tags: `patient`},(err,result)=>{
            resolve({url:result.url,imgId:result.asset_id})
        }) 
    })
}

exports.dep_images = (file,folder)=>{
    return new Promise(resolve=>{
        var uniqueFilename=Date.now()
        cloudenary.uploader.upload(file,{public_id: `depart/${uniqueFilename}`, tags: `depart`},(err,result)=>{
            resolve({url:result.url,imgId:result.asset_id})
        }) 
    })
}
exports.emp_iden_back = (file, folder) => {

    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `employee/${uniqueFilename}`, tags: `employee` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.License_front_side = (file, folder) => {

    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `Doctor/${uniqueFilename}`, tags: `medical` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.License_back_side = (file, folder) => {

    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `Doctor/${uniqueFilename}`, tags: `medical` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.certificate_Img = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `Doctor/${uniqueFilename}`, tags: `medical` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}


exports.cure_blogs = (file,folder)=>{
    return new Promise(resolve=>{
        var uniqueFilename=Date.now()
        cloudenary.uploader.upload(file,{public_id: `cure_blog/${uniqueFilename}`, tags: `cure_blog`},(err,result)=>{
            resolve({url:result.url,imgId:result.asset_id})
        }) 
    })
}
