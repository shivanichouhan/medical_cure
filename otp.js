function otp(){
 
  this.send_otp = (str,OTP)=>{
    console.log(str)
    console.log(OTP)
      return new Promise((resolve,reject)=>{
      var unirest = require('unirest');
      var req = unirest("GET", "http://sms.webappssoft.com/app/smsapi/index.php?");
   
      req.query({
      "key": "46041D0DD2BF5B",
      "campaign":"10072",
      "routeid": "7",
      "type":"text",
      "contacts": `${str}`,
      "senderid": "VIRALL",
      "msg": `Please do not share this OTP ${OTP}`,
      });
 
     req.headers({
        "cache-control": "no-cache"
     });
 
    req.end(function(resp){
      if(resp.error){
        reject(resp.error)
        if (resp.body == 'ERR: NOT VALID SENDERID'){
          reject(resp)
        }
      }
      else{
          resolve(resp)
          console.log('resolve')
        }
      });
    })
  }
}

module.exports = new otp()