const cloudenary = require('cloudinary').v2
const dotenv = require('dotenv')
const Path = require('path')
const fs = require('fs')
dotenv.config()

// uploads/Clinic
// {
//   asset_id: 'bb0f2f6fa10700ff9e139a3361a9574b',
//   public_id: 't0y97igz3iarglzdskfq',
//   version: 1619263272,
//   version_id: '91951946ac18312d8ab5ef489c70b3d2',
//   signature: '641599c0a9700fb0278b3c189de71deb1fe4a217',
//   resource_type: 'raw',
//   created_at: '2021-04-24T11:21:12Z',
//   tags: [],
//   bytes: 12797,
//   type: 'upload',
//   etag: '4e813d53054a802702d5402d90a577f3',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dha2sjb75/raw/upload/v1619263272/t0y97igz3iarglzdskfq',
//   secure_url: 'https://res.cloudinary.com/dha2sjb75/raw/upload/v1619263272/t0y97igz3iarglzdskfq',
//   original_filename: 'Clinic'
// }

cloudenary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloud_api_key,
    api_secret: process.env.cloud_api_secret
});

exports.prescription_patient = (file) => {
  
    console.log(file)
    var File = file.split('.')
    console.log(file,File[0],'oldfilename')
  
    var Pa = Path.join('uploads',file)
    console.log(Pa)

    fs.rename(Pa, 'uploads/output', () => {
        console.log("\nFile Renamed!\n");
      });
   
      var nePath = File[0]
      var nPa = Path.join('uploads',nePath)
      console.log(nePath,'newfilename')
 
    return new Promise(resolve => {
        cloudenary.uploader.upload(nPa, {resource_type: "raw" },  (err, result) => {
            if(err){
                console.log(err,'fsdf')
            }else{
            // console.log(result)}
            resolve({ url: result.url, imgId: result.asset_id ,fileP :nPa})
            }
        })
    })
}

exports.xpost = (file) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `xpost/${uniqueFilename}`, tags: `xpost` }, (err, result) => {
            console.log(result)
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.Blogs = (file) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `Blogs/${uniqueFilename}`, tags: `Blogs` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

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



exports.patient = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `patient/${uniqueFilename}`, tags: `patient` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.dep_images = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `depart/${uniqueFilename}`, tags: `depart` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
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


exports.cure_blogs = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `cure_blog/${uniqueFilename}`, tags: `cure_blog` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

exports.specilist = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `specialist/${uniqueFilename}`, tags: `specialist` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
};

exports.emp_profile = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `employee/${uniqueFilename}`, tags: `employee` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
};

exports.doctor_profile_pic = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `employee/${uniqueFilename}`, tags: `employee` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
};



exports.videoUpload = (file, folder) => {
    return new Promise(resolve => {
        console.log(file, "file path")
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(
            file,
            {
                resource_type: 'video',
                public_id: 'my_folder/my_sub_folder/' + uniqueFilename,
                chunk_size: 6000000,
                eager: [
                    {
                        width: 300,
                        height: 300,
                        crop: 'pad',
                        audio_path_codec: 'none'
                    },
                    {
                        width: 160,
                        height: 100,
                        crop: 'crop',
                        gravity: 'south',
                        audio_path_codec: 'none'
                    }
                ],
                eager_async: true
            },
            function (err, video_image) {
                resolve({ url: video_image.url,imgId:video_image.asset_id })
            });
    });
};

exports.videoImages = (file, folder) => {
    return new Promise(resolve => {
        var uniqueFilename = Date.now()
        cloudenary.uploader.upload(file, { public_id: `video_thum/${uniqueFilename}`, tags: `specialist` }, (err, result) => {
            resolve({ url: result.url, imgId: result.asset_id })
        })
    })
}

