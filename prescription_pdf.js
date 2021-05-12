
function Prescription() {
 
this.patPrescription = (presInfo,patientInfo,docInfo)=>{
return new Promise((resolve,reject)=>{  
var pdf = require("pdf-creator-node");
function TimeZone(){
    const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const date_time =str.split(',')
    console.log(date_time)
    const date = date_time[0]
    const time = date_time[1]
    return ({Date:date,Time:time})
  }
  
var time_date =  TimeZone()
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

// var docInfo = [
//   {

//   }
// ]

// var patInfo = [
//   {
//     patId:patientInfo._id,
//     name:patientInfo.patient_name,
//     age:patientInfo.age,
//     height:patientInfo.height,
//     weight:patientInfo.weight,
//     gender:patientInfo.gender,
//     diagnosis:presInfo.daignosis,
//     alergies:presInfo.alergies,
//     date_of_consult:time_date.Date
//   },

// ];
var path = require('path')
var img = path.join(__dirname,'./logo/xpressimg.png')
console.log(img,'mfd')
var users1 = [
  {
    imgurl:img,
    name:'myworkd'
  }
]
var dt = '.pdf'
var document = {
  html: html,
  data: {
    users1:users1
    // medicine_info: presInfo.medicine,
    // patInfo: patInfo,
    // doctor_info:,

  },
  path: "./uploads/output"+`${dt}`,
  type: "",
};

pdf
  .create(document,options,)
  .then((resp) => {
    console.log(resp);
    // resolve(resp.filename)
  })
  .catch((error) => {
    console.error(error);
  });
})
  }
}

module.exports =  new Prescription()
