const Doct = require("../../model/Doctor/doctor_regis")
var FCM = require('fcm-node');

exports.notification = async(req,res)=>{
var data = await Doct.findOne({_id:req.body.docId})  
console.log(data)  
if(data){
var serverkey = process.env.FIREBASE_KEY  
var fcm = new FCM(serverkey);

var msg ={}
var Notification={}
msg.to = data.firebase_token
msg.collapse_key = 'XXX'
msg.data = {my_key: 'my value', contents: "abcv/"}
Notification.title =`${data.username} Title of the notification`
Notification.body = req.body.msg
msg.notification = Notification

fcm.send(msg,(err,resp)=>{  
if(err){
       console.log(err) 
       res.json({code:400,msg:'notification not send'}) 
}else{
     console.log(resp);
     res.json({code:200,msg:'notification send successfully'}) 
    }
 });	
}
else{
    res.json({code:400,msg:'doctor not find'})
  }
}