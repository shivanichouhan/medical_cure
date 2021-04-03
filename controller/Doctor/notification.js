const Doct = require("../../model/Doctor/doctor_regis")
var FCM = require('fcm-node');

exports.notification = async(req,res)=>{
var data = await Doct.find({_id:req.body.docId})    
if(data){
var serverkey = process.env.FIREBASE_KEY  
var fcm = new FCM(serverkey);
var message = {  
			to : data.firebase_token,
			collapse_key : 'XXX',
			data : {my_key: 'my value', contents: "abcv/"},
			notification : {
			    title : `${data.username} Title of the notification`,
				body  :  req.body.msg
			}
        };
fcm.send(message,(err,response)=>{  
if(err){
       console.log(err) 
       res.json({code:400,msg:'notification not send'}) 
}else{
     console.log(response);
     res.json({code:200,msg:'notification send successfully'}) 
    }
 });	
}
else{
    res.json({code:400,msg:'doctor not find'})
  }
}