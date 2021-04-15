const sendgrid = require('sendgrid-v3-node');

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

  this.suscribe_mail = (email)=>{
      return new Promise((resolve,reject)=>{
      
        const mailOptions = {
          sendgrid_key: process.env.EMAIL_KEY,
          from_email: 'info.xpresscure@gmail.com',
          from_name: 'kumar saurabh',
          to: email // REQUIRED: `string` email
      };
      
      mailOptions.subject = 'Suscribe Mail';
      mailOptions.content = `<p><b>Dear Patron</b>,</p>
      <p>Thank You for subscribing with XpressCure.<br>
      At XpressCure, we are working to create the largest network for online consultations across India.<br>
      The mission is aimed at:<br>
     <ul>
      <li>Helping Specialist Doctors like you, reach to the most underserved populations.</li>
      <li>Helping Patients get consultations with the best of doctors.</li>
      <li>Helping Health workers register their digital clinics.</li>
      </ul>
      XpressCure is building an online consultation platform but retains the human touch through the Doctor Mitras spread across India.<br>
      We value your TRUST.<br>
      Our app is in getting ready to serve you better. Please wait for our reply with the launch date. <br>
      Yours, <br>
      Kumar Saurabh<br>
      Founder, XpressCure.<br>
      </p>
      `;
      sendgrid.send_via_sendgrid(mailOptions).then(resp=>{
        resolve('success')
      }).catch(error=>{
        reject('fail')
      })
  })
}

}

module.exports = new otp()