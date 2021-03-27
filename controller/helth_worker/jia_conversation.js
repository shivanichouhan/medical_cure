const desease_name = require("../../model/admin/add_disease");
const patient_name = require("../../model/helth_worker/patient_registration")
var colors = require('colors');
const chalk = require('chalk'); 


const greeting_time = (today) => {
    var curHr = today.getHours()
    console.log(curHr,"nnno")
    if (curHr <= 12) {
        return 'Good morning'
    } else if (curHr <= 16 && curHr>=12) {
        return 'Good afternoon'
    } else if (curHr <= 18 && curHr>=16 ) {
        return 'Good evening'
    }
    else if (curHr <= 24  && curHr>=18) {
        return 'Good night'
    }
}

exports.greetings = async (req, res) => {
    const { patient_id, desease_id, depart_name, helthwork_id } = req.body;
    const patients = await patient_name.findOne({ _id: patient_id })
    const depart_data = await desease_name.find({ department_name: depart_name }, { department_name: 1, disease_name: 1 })
    let greet = '';
    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr"
    } else {
        greet = "Miss"
    }
    var today = new Date()
    console.log(today,"klkjhjhjk")
    console.log('hello'.green); // outputs green text
    console.log(colors.red.underline('i like cake and pies')) // outputs red underlined text

    const gree_time = greeting_time(today)
    const mornings = chalk.blue(gree_time)
    console.log(mornings)
    const texts = `${mornings} ${greet}. ${patients.patient_name} Namaste! Welcome to tele-consultation by XpressCure. I am Jia. I shall get the best treatment for you. Please provide your chief complaint.`
    details.text = texts;
    const texts2 = `${greet}. ${patients.patient_name}, since how long has this problem troubled you?`
    details.texts = texts2;
    const dats = ["1Week", "1Month", "2Month", "1Year"]
    details.problem_time = dats
    // details.disease = depart_data
    res.json({ code: 200, msg: details })
}


exports.greetings1 = async (req, res) => {
    const { patient_id, disease_id, helthwork_id } = req.body;
    const patients = await patient_name.findOne({ _id: patient_id })

    let greet = '';
    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr"
    } else {
        greet = "Miss"
    }
    const texts = `Alright ${greet}. ${patients.patient_name}, since how long has this problem troubled you?`
    details.text = texts;
    const dats = ["1Week", "1Month", "2Month", "1Year"]
    details.problem_time = dats
    res.json({ code: 200, msg: details });
}

exports.greetings2 = async(req,res)=>{
    const {patient_id,disease_id,helthwork_id,week ,depart_ment}=req.body;
    console.log(req.body);
    const depart_data = await desease_name.findOne({ _id: disease_id }, { department_name: 1, disease_name: 1 })
    console.log(depart_data)
    const details = {}

    const texts = `Thanks for your reply. When does this ${depart_data.disease_name} affect you the most?`
    details.text = texts
    res.json({code:200,msg:details})
}

exports.greetings3 =async(req,res)=>{
    const {patient_id,disease_id,helthwork_id,week ,depart_ment}=req.body;
    const depart_data = await desease_name.findOne({ _id: disease_id }, { department_name: 1, disease_name: 1 })
  if(depart_data){
    const details = {}

    const texts = `Can you describe your ${depart_data.disease_name} problem?`
    details.text = texts
    res.json({code:200,msg:details})
  }else{
    res.json({code:200,msg:"desease not defind"})

  }
}

exports.greetings4 =async(req,res)=>{
    const {text_msg,disease_id,patient_id,department}=req.body;
    let greet = '';
    const patients = await patient_name.findOne({ _id: patient_id })

    const details = {}
    if (patients.gender == "Male") {
        greet = "Mr."
    } else {
        greet = "Miss."
    }
    const texts = `Thank you. ${greet} ${patients.patient_name}.We are finding the most suitable doctor for you. `
    details.text = texts
    res.json({code:200,msg:details})
}

exports.greetings5 =async(req,res)=>{
    const {text_msg,disease_id,patient_id,department}=req.body;
    const depart_data = await desease_name.findOne({ _id: disease_id }, { department_name: 1, disease_name: 1 })

    const details = {}

    const text_ms = `Congratulations! We have found the best ${depart_data.disease_name} doctor for you! `
    details.text = text_ms
    res.json({code:200,msg:details})
}