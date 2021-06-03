const sendgrid = require('sendgrid-v3-node');





function otp() {
  this.send_otp = (str, OTP) => {
    console.log(str)
    console.log(OTP)
    return new Promise((resolve, reject) => {
      var unirest = require('unirest');
      var req = unirest("GET", "http://byebyesms.com/app/smsapi/index.php?");
      req.query({
        "key": "46041D0DD2BF5B",
        "campaign": "10072",
        "routeid": "7",
        "type": "text",
        "contacts": `${str}`,
        "senderid": "XPCURE",
        "msg": `Please do not share this OTP ${OTP}`,
      });

      req.headers({
        "cache-control": "no-cache"
      });

      req.end(function (resp) {
        var str = resp.raw_body
        console.log('run', str, resp.code)

        if (str.match(/SMS-SHOOT-ID/g)) {
          console.log('match')
          resolve('success')
        } else {
          console.log('not match')
          reject('error')
        }
      });
    })
  }

  this.Pending_msg = (str, OTP) => {
    console.log(str)
    console.log(OTP)
    return new Promise((resolve, reject) => {
      var unirest = require('unirest');
      var req = unirest("GET", "http://byebyesms.com/app/smsapi/index.php?");
      req.query({
        "key": "46041D0DD2BF5B",
        "campaign": "10072",
        "routeid": "7",
        "type": "text",
        "contacts": `${str}`,
        "senderid": "XPCURE",
        "msg": `Dear Doctor, Your Application on XpressCure portal is pending. Please check you email for further details. Thank You.`,
      });

      req.headers({
        "cache-control": "no-cache"
      });

      req.end(function (resp) {
        var str = resp.raw_body
        console.log('run', str, resp.code)

        if (str.match(/SMS-SHOOT-ID/g)) {
          console.log('match')
          resolve('success')
        } else {
          console.log('not match')
          reject('error')
        }
      });
    })
  }

  this.Cancel_msg = (str, OTP) => {
    console.log(str)
    console.log(OTP)
    return new Promise((resolve, reject) => {
      var unirest = require('unirest');
      var req = unirest("GET", "http://byebyesms.com/app/smsapi/index.php?");
      req.query({
        "key": "46041D0DD2BF5B",
        "campaign": "10072",
        "routeid": "7",
        "type": "text",
        "contacts": `${str}`,
        "senderid": "XPCURE",
        "msg": ` Dear Applicant, Regret to inform that your application could not be processed on XpressCure. Thanks!`,
      });

      req.headers({
        "cache-control": "no-cache"
      });

      req.end(function (resp) {
        var str = resp.raw_body
        console.log('run', str, resp.code)

        if (str.match(/SMS-SHOOT-ID/g)) {
          console.log('match')
          resolve('success')
        } else {
          console.log('not match')
          reject('error')
        }
      });
    })
  }

  this.approve_msg = (str, OTP) => {
    console.log(str)
    console.log(OTP)
    return new Promise((resolve, reject) => {
      var unirest = require('unirest');
      var req = unirest("GET", "http://byebyesms.com/app/smsapi/index.php?");
      req.query({
        "key": "46041D0DD2BF5B",
        "campaign": "10072",
        "routeid": "7",
        "type": "text",
        "contacts": `${str}`,
        "senderid": "XPCURE",
        "msg": `Dear Doctor, Your Application on XpressCure Portal has been approved. Your Username - ${OTP}`,
      });

      req.headers({
        "cache-control": "no-cache"
      });

      req.end(function (resp) {
        var str = resp.raw_body
        console.log('run', str, resp.code)

        if (str.match(/SMS-SHOOT-ID/g)) {
          console.log('match')
          resolve('success')
        } else {
          console.log('not match')
          reject('error')
        }
      });
    })
  }

  this.approve_email = (email) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        sendgrid_key: process.env.EMAIL_KEY,
        from_email: 'info.xpresscure@gmail.com',
        from_name: 'kumar saurabh',
        to: email // REQUIRED: `string` email
      };

      mailOptions.subject = 'approve Mail';
      mailOptions.content = `<p><b>Dear Doctor</b>,</p>
    <p>Thank You for registering and sharing the required details with XpressCure.<br>
    Your registration has been approved and we welcome you onboard. We value your trust.<br>
    Lets work together to serve millions and achieve our mission.<br>
   <ul>
    <li>Thanking you,</li>
    <li>Support Team,</li>
    <li>XpressCure.</li>
    </ul>
    IMPORTANT: The contents of this email and any attachments are confidential. They are intended for the named recipient(s) only.<br>
    <br>
    If you have received this email by mistake, please notify the sender immediately and do not disclose the contents to anyone or <br>
    make copies thereof.<br>
    For any query reach out to out Support Team at info.xpresscure@gmail.com.<br>
    </p>
    `;
      sendgrid.send_via_sendgrid(mailOptions).then(resp => {
        console.log(resp)
        resolve('success')
      }).catch(error => {
        reject('fail')
      })
    })
  }

  this.disapprove_email = (email) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        sendgrid_key: process.env.EMAIL_KEY,
        from_email: 'info.xpresscure@gmail.com',
        from_name: 'kumar saurabh',
        to: email // REQUIRED: `string` email
      };

      mailOptions.subject = 'disapprove Mail';
      mailOptions.content = `<p><b>Dear Doctor</b>,</p>
    <p>Your registered application has been unapproved on grounds of mismatch with required qualification.<br>
    We regret for the same.<br>
   <ul>
    <li>Thanking you,</li>
    <li>Support Team,</li>
    <li>XpressCure.</li>
    </ul>
    IMPORTANT: The contents of this email and any attachments are confidential. They are intended for the named recipient(s) only.<br>
    <br>
    If you have received this email by mistake, please notify the sender immediately and do not disclose the contents to anyone or <br>
    make copies thereof.<br>
    For any query reach out to out Support Team at info.xpresscure@gmail.com.<br>
    </p>
    `;
      sendgrid.send_via_sendgrid(mailOptions).then(resp => {
        console.log(resp)
        resolve('success')
      }).catch(error => {
        reject('fail')
      })
    })
  }
  
  this.pending_email = (email) => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        sendgrid_key: process.env.EMAIL_KEY,
        from_email: 'info.xpresscure@gmail.com',
        from_name: 'kumar saurabh',
        to: email // REQUIRED: `string` email
      };

      mailOptions.subject = 'approve Mail';
      mailOptions.content = `<p><b>Dear Doctor</b>,</p>
    <p>Thank You for registering and sharing the required details with XpressCure.<br>
    Your registration is pending for the following information:<br>
   <ol>
    <li>Thanking you,</li>
    <li>Support Team,</li>
    <li>XpressCure.</li>
    </ol>
      <br>
    Kindly share the above documents for your registration approval.
    <ul>
    <li>Thanking you,</li>
    <li>Support Team,</li>
    <li>XpressCure.</li>
    </ul>
    IMPORTANT: The contents of this email and any attachments are confidential. They are intended for the named recipient(s) only.<br>
    <br>
    If you have received this email by mistake, please notify the sender immediately and do not disclose the contents to anyone or <br>
    make copies thereof.<br>
    For any query reach out to out Support Team at info.xpresscure@gmail.com.<br>
    </p>
    `;
      sendgrid.send_via_sendgrid(mailOptions).then(resp => {
        console.log(resp)
        resolve('success')
      }).catch(error => {
        reject('fail')
      })
    })
  }

  // home page suscribe function
  this.suscribe_mail = (email) => {
    return new Promise((resolve, reject) => {
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
      sendgrid.send_via_sendgrid(mailOptions).then(resp => {
        console.log(resp)
        resolve('success')
      }).catch(error => {
        reject('fail')
      })
    })
  }

  // doctor mitra suscribe function
  this.suscribe_doctor_mitra = (email) => {
    return new Promise((resolve, reject) => {

      const mailOptions = {
        sendgrid_key: process.env.EMAIL_KEY,
        from_email: 'info.xpresscure@gmail.com',
        from_name: 'kumar saurabh',
        to: email // REQUIRED: `string` email
      };

      mailOptions.subject = 'Suscribe Mail Doctor Mitra';
      mailOptions.content = `<p>Dear Health Guardian, <br>
  Thank You for registering with XpressCure.<br>
  At XpressCure, we are working to create the largest network for online consultations across India.<br>
  The mission is aimed at:<br>
  <ul> 
   <li>Helping Specialist Doctors, reach to the most underserved populations.</li>
   <li>Helping Patients get consultations with the best of doctors.</li>
   <li>Helping Health workers register their digital clinics.</li>
   </ul>
  XpressCure is building an online consultation platform but retains the human touch through the Doctor Mitras spread across India.<br>
  We value<br>
  Our app is in getting ready to serve you better. Please wait for our reply with the launch date. <br>
  Yours, <br>
  Kumar Saurabh<br>
  Founder, XpressCure.</p>
  `;
      sendgrid.send_via_sendgrid(mailOptions).then(resp => {
        resolve('success')
      }).catch(error => {
        reject('fail')
      })
    })
  }

  // doctor mitra suscribe function
  this.suscribe_doctor = (email) => {
    return new Promise((resolve, reject) => {

      const mailOptions = {
        sendgrid_key: process.env.EMAIL_KEY,
        from_email: 'info.xpresscure@gmail.com',
        from_name: 'kumar saurabh',
        to: email // REQUIRED: `string` email
      };

      mailOptions.subject = 'Suscribe Mail Doctor';
      mailOptions.content = `<p>Dear Doctor,<br>
  Thank You for registering with XpressCure.<br>
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
  Founder, XpressCure.</p>
  `;
      sendgrid.send_via_sendgrid(mailOptions).then(resp => {
        resolve('success')
      }).catch(error => {
        reject('fail')
      })
    })
  }

  // forget password sent otp on send email 
  this.forget_email_otp = (email, otp) => {
    return new Promise((resolve, reject) => {
      var OTP = otp
      console.log(email, OTP, 'inside email function')
      const mailOptions = {
        sendgrid_key: process.env.EMAIL_KEY,
        from_email: 'info.xpresscure@gmail.com',
        from_name: 'noreply@gmail.com',
        to: email // REQUIRED: `string` email
      };

      mailOptions.subject = 'Reset Password Otp';
      mailOptions.content = `your otp is ${OTP}`;
      sendgrid.send_via_sendgrid(mailOptions).then(resp => {
        resolve('success')
      }).catch(error => {
        reject('fail')
      })
    })
  }
}

module.exports = new otp()

