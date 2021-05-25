const Faq= require("../../model/helth_worker/faq")

exports.faqQuestionList =(req,res)=>{
    Faq.find().exec((err,faqQuestion)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json({code:200,List:faqQuestion})
        }
    })

}

exports.addFaqQuestion =(req,res)=>{
    var cObj = new Faq(req.body)
    cObj.save((err,resp)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(resp)
        }
    })
}
