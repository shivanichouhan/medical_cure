
function Prescription() {
  // this.send_otp = (str,OTP)=>{
  this.patPrescription = (patData)=>{
  return new Promise((resolve,reject)=>{  
var pdf = require("pdf-creator-node");
var fs = require("fs");
var html = fs.readFileSync("index.html", "utf8");

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
      height: "10mm",
      contents: `<div style="text-align:center"><h2>Xpress Cure</h2></div>`
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
var users = [
  {
    name:"",
    age:"26",
    height:"6.1",
    weight:"70kg",
    disease:"harniya",
    
  },
];
var document = {
  html: html,
  data: {
    users: users,
  },
  path: "./output.pdf",
  type: "",
};

pdf
  .create(document,options)
  .then((resp) => {
    console.log(resp);
    resolve(resp.filename)
  })
  .catch((error) => {
    console.error(error);
  });
})
  }
}

module.exports =  new Prescription()
