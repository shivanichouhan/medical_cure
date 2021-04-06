const multer = require('multer')

 const storage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'./uploads')
        },
        filename:function(req,file,cb){
            cb(null,Date.now() +'-'+file.originalname)
        },
     
    })
   
 const upload = multer({
        storage:storage,
        limits:500000,
        fileFilter:(req, file, cb)=>{
            // if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
            //     cb(new Error('file is not supported'),false)
            //     return
            // }
            cb(null ,true)
        },
})

module.exports = upload;
