// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/8.5.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/8.5.0/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>



// firebase cloud dataaaaaaaaaaaaaaaaa


var pdf = require('html-pdf');
var options = {format: 'Letter'};
exports.Topdf = function (req, res) {
var info = {

"Company": "ABC",
"Team": "JsonNode",
"Number of members": 4,
"Time to finish": "1 day"
}
res.render('path to your tempalate', {
   info: info,
}, function (err, HTML) {
   pdf.create(HTML, options).toFile('/employee.pdf', function (err, result) {
       if (err) {
          //  return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
          //  });
          console.log(err)
       }else{
            console.log("file created sucess")
       }
   })
 })
}


