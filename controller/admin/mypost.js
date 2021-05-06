const myPost = require("../../model/admin/mypost")
const Doctor = require("../../model/Doctor/doctor_regis")
const cloud = require("../../cloudinary")

exports.listmypost_doc = (req,res)=>{
    myPost.find({_id:req.body.docId}).exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'my post data not found'})
        }else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.myXpost = (req,res)=>{
    myPost.find().exec((err,resp)=>{
        if(err){
            res.json({code:400,msg:'my post data not found'})
        }else{
            res.json({code:200,msg:resp})
        }
    })
}

exports.mypostAdd = async(req,res)=>{
   var docData = await Doctor.findOne({_id:req.body.docId})
   if(docData){
   var mypostObj = new myPost({
            title:req.body.title,
            discription:req.body.discription
        })

        mypostObj.doc_name = docData.email
        mypostObj.doc_profile = docData.profile_pic
        mypostObj.doc_id = docData._id

        mypostObj.save((err,resp)=>{
            if(err){
                res.send({code:400,msg:'my post detail not save'})
            }else{
                if(req.file){
                    const { path } = req.file
                    cloud.xpost(path).then(async(myPostUrl)=>{
                        console.log(myPostUrl)
                        await myPost.updateOne({_id:resp._id},{$set:{poster:myPostUrl.url}})
                        res.send({code:200,msg:'my post add with poster'})
                    }).catch((err)=>{
                        console.log(err)
                        res.send({code:400,msg:'img url not create'})
                    })
                }else{
                    res.send({code:400,msg:'my post detail not save'})
                }
            }
        })

   }else{
       res.send({code:400,msg:'doctor data not found'})
   }

}

exports.editmypost =(req,res)=>{
    
}

exports.remove_myxpost =(req,res)=>{
    myPost.remove({_id:req.params.mypostId}).exec((err,resp)=>{
        if(err){
            res.send({code:400,msg:'myxpost not remove'})
        }else{
            res.send({code:200,msg:'myxpost remove successfully'})
        }
    })
}