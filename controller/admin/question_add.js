var question_add = require("../../model/admin/question_add")
var user = require("../../model/helth_worker/users")




exports.addQuestions = (req, res) => {
    const { text,text1 } = req.body;
    const que = new question_add({
        text: text,
        text2:text1
    })
    que.save()
        .then((resp) => {
            res.send("questions save successfully")
        })
}

exports.editQuestions =(req,res)=>{
    const {id,text1,text2}=req.body;
    let obj ={}
    if(text1){
        obj.text = text1
    }if(text2){
        obj.text2 = text1
    }
    if(id){
        question_add.updateOne({_id:id},{$set:obj})
        .then((responce)=>{
            res.json({code:200,msg:"update question successfully"})
        })
    }else{
        res.json({code:200,msg:"id not define"})
    }
}