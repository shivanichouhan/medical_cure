var pdf = require("pdf-creator-node");
var fs = require("fs");
var html = fs.readFileSync("index.html", "utf8");

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
      height: "10mm",
      contents: "Xpress Cure"
      
  },
  footer: {
      height: "28mm",
      contents: {
          first: 'Cover page',
          2: 'Second page', // Any page number is working. 1-based index
          default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: 'Last Page'
      }
  }
};
const path = require('path')
var imgSrc = 'file://' + __dirname + '/logo/xpress.png';
imgSrc = path.normalize(imgSrc);
console.log(imgSrc)
var users = [
  {
    name: "Shyam",
    age: "26",
    height:"6.1",
    weight:"70kg",
    disease:"harniya"
  },
];
var document = {
  html: html,
  data: {
    users: users,
  },
  path: "./output.pdf",
  type: "",
  // result:"<div id='pageHeader'><img src='" + imgSrc + "' /><div style='text-align: center;'>Author: Marc Bachmann</div></div>"
};

pdf
  .create(document,options)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(error);
  });