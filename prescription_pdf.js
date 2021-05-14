
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
var path = require('path')  
var html = fs.readFileSync( path.join(__dirname,'views/pre.html'), "utf8");


var Pa = path.join('logo','xpressimg.png')
console.log(Pa,'filepath')

var options = {
  format: "A3",
  orientation: "portrait",
  border: "10mm",
  header: {
      height: "10mm",
      
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

// var DocInfo = [
//   {
//     doc_name: docInfo.username,
//     course: docInfo.Course
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

// var ary1 = []
// var ary2 = [] 

// var medicines = presInfo.medicine_details
// var labTest = presInfo.lab_test_details

//  medicines.forEach((ele,index) => {
//    console.log('indexing',index)
//     const detail = {
//       medicine:ele.medicine,
//       dosage:ele.dosage,
//       duration:ele.duration,
//       med_instruction:ele.med_instruction,
//       sno:index+1
//     }
//     ary1.push(detail)
//  });

//  labTest.forEach((elem,index) =>{
//    const lab_detail = {
//     lab_test:elem.lab_test,
//     // sno:index+1
//    }
//    ary2.push(lab_detail)
//  })

// var followUp = [{follow:presInfo.follow_up}]
// var docAdvice = [{drAdvice:presInfo.dr_advice}]

// console.log('new arrays',ary1,ary2)
var users1 = [
              {daignos:'a0001 first daignosis'},
              {daignos:'a0002 second daignosis'},
              {daignos:'a0003 third daignosis'},
            ]
var dt = '.pdf'
var document = {
  html: html,
  data: {
    users:users1
    // med: ary1,
    // lab:ary2,
    // DocInfo:DocInfo,
    // patInfo: patInfo,
    // followUp:followUp,
    // docAdvice:docAdvice
  },
  path: "./uploads/output"+`${dt}`,
  type: "",
};

pdf
  .create(document,options)
  .then((resp) => {
    console.log(resp);
    //  
  })
  .catch((error) => {
    console.error(error);
  });
})
  }
}

module.exports =  new Prescription()
