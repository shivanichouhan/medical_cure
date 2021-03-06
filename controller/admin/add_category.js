const category = require('../../model/admin/add_category')

exports.list_cat =(req,res)=>{
    category.find()
    .populate('sub_category')
    .exec((err,list)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(list)
        }
    })
}

exports.create_cat= (req,res)=>{
    console.log(req.body)
    var catObj = new category(req.body)
    console.log(catObj)
    catObj.save((err,cat)=>{
        if(err){
            res.json(err)
        }
        else{
            res.send(cat)
        }
    })
}

exports.edit_cat =(req,res)=>{
    console.log(req.body)
    category.updateOne({_id:req.params.catId},req.body,(err,catUpdte)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({catUpdte})
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