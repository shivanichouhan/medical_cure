const depart = require("../../../model/admin/department/departments")
const path = require("path")
const url =require("url")
exports.list_dep =(req,res)=>{
    depart.find({},{department_name:1,department_status:1,_id:1})
    // .select('department_name')
    // .populate('disease','disease_name icon')
    .exec((err,depList)=>{
        if(err){
            res.json(err)
        }
        else{
            // res.json({data:depList})
            res.render(
                path.join(__dirname, '../../../views/departments.ejs'),
                { data: depList }
              )
        }
    })
}


exports.edit_department=(req,res)=>{
    const all = url.parse(req.url,true).query
    console.log(all)
    depart.find({_id:all.k},{department_name:1,department_status:1})
    .exec((err,depList)=>{
        if(err){
            res.json(err)
        }
        else{
            // res.json({data:depList})
            console.log(depList)
            res.render(
                path.join(__dirname, '../../../views/edit-department.ejs'),
                { data: depList }
              )
        }
    })
}

exports.create_dep =(req,res)=>{
    var departObj = new depart(req.body)
    departObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}

exports.edit_dep =(req,res)=>{
    depart.updateOne({_id:req.params.depId},req.body,(err,depUpdate)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(depUpdate)
        }
    })
}

exports.dep_status =(req,res)=>{
    if(req.body.department_status == 1){
        depart.updateOne({_id:req.params.depId},{$set:{department_status:'Active'}},(err,resp)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(resp)
            }
        })
    }
    else if(req.body.department_status == 0){
        depart.updateOne({_id:req.params.depId},{$set:{department_status:'Inactive'}},(err,resp)=>{
            if(err){
                res.json(err)
            }
            else{
                res.json(resp)
            }
        })
    }
}

exports.remove_dep =(req,res)=>{
    depart.remove({_id:req.params.depId},(err,depRemove)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(depRemove)
        }
    })
}