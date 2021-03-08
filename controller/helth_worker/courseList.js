const course = require("../../model/helth_worker/courseList")

exports.cList =(req,res)=>{
    course.find().exec((err,listCourse)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({List:listCourse})
        }
    })

}

exports.addcourse =(req,res)=>{
    var cObj = new course(req.body)
    cObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}
