const Doct = require("../../model/Doctor/doctor_regis")

var notification_firebase = require("../../firebase_notification")

exports.notification = async(req,res)=>{
var data = await Doct.findOne({_id:req.body.docId})  
console.log(data)  
if(data){

var msg ={}
var Notification={}
msg.to = data.firebase_token
msg.collapse_key = 'XXX'
msg.data = {my_key: 'my value', contents: "abcv/"}
Notification.title =`${data.username} Title of the notification`
Notification.body = req.body.msg
msg.notification = Notification

notification_firebase.Notification(msg).then((resp)=>{
  console.log(resp)
  res.send({code:200,msg:'notification send successfully'})
}).catch((err)=>{
  res.send({code:400,msg:'notification not send'})
  console.log(err,'fsd')
})

}
else{
    res.json({code:400,msg:'doctor not find'})
  }
}