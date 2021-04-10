function otp(){
  this.send_otp = (str,OTP)=>{
    console.log(str)
    console.log(OTP)
      return new Promise((resolve,reject)=>{
      var unirest = require('unirest');
      var req = unirest("GET", "http://byebyesms.com/app/smsapi/index.php?");
      req.query({
      "key": "46041D0DD2BF5B",
      "campaign":"10072",
      "routeid": "7",
      "type":"text",
      "contacts": `${str}`,
      "senderid": "XPCURE",
      "msg": `Please do not share this OTP ${OTP}`,
      });
 
     req.headers({
        "cache-control": "no-cache"
     });
 
    req.end(function(resp){
      console.log('run',resp.raw_body)
      if(resp.raw_body == 'ERR: INVALID ROUTE ID SUPPLIED.'){
      console.log('reject')
        reject('error')
      }else{
      resolve('success')
      }
      });
    })  
  }
}

module.exports = new otp()