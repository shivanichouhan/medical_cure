const desease_name = require("../../model/admin/add_disease");
const patient_name = require("../../model/helth_worker/patient_registration")


exports.greetings =async(req,res)=>{
    const {patient_id,desease_id,depart_name,helthwork_id}=req.body;
    const patients = await patient_name.findOne({_id:patient_id})
    const depart_data = await desease_name.find({department_name:depart_name},{department_name:1,disease_name:1})
    let greet = '';
    const details = {}
    if(patients.gender == "Male"){
        greet = "Mr"
    }else {
        greet =  Miss
    }
    const texts = `Good Morning/Afternoon/Evening ${greet} ${patients.patient_name} Namaste! Welcome to tele-consultation by XpressCure. I am Jia. I shall get the best treatment for you. Please provide your chief complaint.`
    details.text = texts;
    details.disease = depart_data
    res.json({code:200,msg:details})
}


exports.greetings1 = async(req,res)=>{
    const {patient_id,desease_id,depart_name,helthwork_id}=req.body;
    const patients = await patient_name.findOne({_id:patient_id})
    let greet = '';
    const details = {}
    if(patients.gender == "Male"){
        greet = "Mr"
    }else {
        greet =  Miss
    }
    const texts = `Alright ${greet}. ${patients.patient_name}, since how long has this problem troubled you?`
    details.text = texts;
    const dats = ["1Week","1Month","2Month","1Year"]
    details.problem_time = dats
    res.json({code:200,msg:details});
}