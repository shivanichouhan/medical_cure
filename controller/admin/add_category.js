const category = require('../../model/admin/add_category')
const cloud = require("../../cloudinary")
const fs = require('fs')

exports.list_cat =(req,res)=>{
    category.find()
    .exec((err,list)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(list)
        }
    })
}

exports.create_cat= async (req,res)=>{
    var catObj = new category(req.body)
    catObj.save(async(err,cat)=>{
        if(err){
            res.json(err)
        }
        else{
            if(req.file){
                  const { path }  =req.file
                  const cat_path = async (path)=> await cloud.uploads(path)
                  const newpath = await cat_path(path)
                  console.log(newpath)
                  fs.unlinkSync(path)
                  category.findByIdAndUpdate({_id:cat._id},{$set:{category_img:newpath.url}},(err,resp)=>{
                    if(err){
                        res.json(err)
                    }
                    else{
                        res.json({code:200,result:resp})
                    }
                })    
            }
            else{
                res.json({code:200,resp:cat})
            }
        }
    })
    
}

exports.edit_cat =(req,res)=>{
    console.log(req.body)
    category.updateOne({_id:req.params.catId},req.body,async(err,catUpdte)=>{
        if(err){
            res.json(err)
        }
        else{
            if(req.file){
                const { path }  =req.file
                const cat_path = async (path)=> await cloud.uploads(path,'Images')
                const newpath = await cat_path(path)
                console.log(newpath)
                fs.unlinkSync(path)
              
                category.updateOne({_id:req.params.catId},{$set:{category_img:newpath.url}},(err,resp)=>{
                  if(err){
                      res.json(err)
                  }
                  else{
                      res.json({msg:'category is update with image',result:resp})
                  }
              })    
            }
            else{
                res.json({msg:'category is update',result:catUpdte})
            }
        }
    })

}

exports.remove_cat =(req,res)=>{
    category.deleteOne({_id:req.params.catId},(err,del_cat)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({code:200,resp:del_cat})
        }
    })
}