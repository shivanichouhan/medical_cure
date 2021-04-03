function otp(){

  this.send_otp = (str,OTP)=>{
    console.log(str)
    console.log(OTP)
      return new Promise((resolve,reject)=>{
      var unirest = require('unirest');
      
      var req = unirest("GET", "http://sms.webappssoft.com/app/smsapi/index.php?");
        
      req.query({
      "key": "25E15B5643C006",
      "campaign":"XXXXXX",
      "routeid": "AIRTEL",
      "type":"text",
      "contacts": `${str}`,
      "senderid": "XPCURE",
      "msg": `Please do not share this OTP ${OTP}`,
      });
 
     req.headers({
        "cache-control": "no-cache"
     });
 
    req.end(function(resp){
      if(!resp){
        reject({msg:'otp not sent'})
      }
      else{
        resolve(resp)
      }
      // if (resp.body == 'ERR: NOT VALID SENDERID'){
      //     reject(resp)
      //     console.log('resolve')
      //   }
   
      // else{
      //     resolve(resp)
      //     console.log('resolve')
      //   }
      });
    })
  }
}

module.exports = new otp()