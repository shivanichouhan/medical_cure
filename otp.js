console.log('run')
var unirest = require('unirest');

var req = unirest("GET", "http://sms.webappssoft.com/app/smsapi/index.php?");

req.query({
  "key": "26040A8E6A4428",
  "campaign":"10072",
  "routeid": "7",
  "type":"text",
  "contacts": "9893600766",
  "senderid": "VIRALL",
  "msg": "This is a test message",
});

req.headers({
  "cache-control": "no-cache"
});

req.end(function (res) {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});