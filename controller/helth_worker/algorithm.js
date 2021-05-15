const desease_name = require("../../model/admin/add_disease");
const patient_name = require("../../model/helth_worker/patient_registration")
var colors = require('colors');
const chalk = require('chalk');
const Doctor_data = require("../../model/Doctor/doctor_regis")
const patient_data = require("../../model/helth_worker/patient_registration")
const helth_workers = require("../../model/helth_worker/users")
const doctor_patientChat = require("../../model/Doctor/doctor_patient_chat")
const Jiaquestion = require("../../model/admin/question_add")
const Doct = require("../../model/Doctor/doctor_regis")
// const patients = require("../../model/Doctor/notification")
var availabilityTime = require("../../model/Doctor/availability_hour")
var responce_time = require("../../model/Doctor/responce_time")
const rating = require("../../model/Doctor/rating")



exports.algo_method = async (req, res) => {
    let date = new Date();
    date.setMonth(date.getMonth() - 01);
    let dateInput = date.toISOString();
    const mon = await responce_time.aggregate([
        {
            $match: {
                $and: [
                    { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
                ]
            },
        }
        ,
        {
            $group:
            {
                _id: null,
                Response_rating: { $sum: "$Response_rating" }
            }
        }
    ])
    const monrating = await rating.aggregate([
        {
            $match: {
                // totalValue: {$sum: "$rating"},
                $and: [
                    { $expr: { $gt: ["$date", { $toDate: dateInput }] } },
                ]
            },
        },
        {
            $group:
            {
                _id: null,
                rating: { $sum: "$rating" }
            }
        }

    ])

    const availabilityTimes = await availabilityTime.aggregate([
        {
            $match: {
                $and: [
                    { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
                ]
            },
        },
        {
            $group:
            {
                _id: null,
                availability_hour: { $sum: "$availability_hour" }
            }
        }
    ])
    const numberOfCases = await patient_data.aggregate([
        {
            $match: {
                $and: [
                    { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
                ]
            }
        }])

    const ratingdata = monrating[0]
    const ratingAvarage = ratingdata.rating / 30

    const available = availabilityTimes[0]
    const availableAvarage = available.availability_hour / 30 

    const responceTime =mon[0]
    const responceAvarage = responceTime.Response_rating/30

    const patient_detail = numberOfCases.length
    

    const methods = ratingAvarage + (2 * responceAvarage) + (2*availableAvarage) +patient_detail/4
  
    console.log(methods,"methods")

    res.json({ rating: monrating, responce_time: mon, avail: availabilityTimes, numberOfCases: numberOfCases.length })



    // ,
    // {
    //     $project: {
    //         ongoing_time: 1,
    //         accepted_time: 1,
    //         duration: { $divide: [{ $subtract: ["$ongoing_time", "$accepted_time"] }, 3600000] }
    //     }
    // }

}



// 1. Covid Related(कोरोना संबंधी) 
// 2. Medicine(बीपी, शुगर, थायराइड) 
// 3. Orthopedics( हड्डी रोग) 
// 4. Gynecology( महिला एवं प्रसूति रोग) 
// 5. Pediatrics ( शिशु एवं बाल रोग) 
// 6. Surgery ( सर्जरी विभाग) 
// 7. Dermatology (चर्म रोग)
// 8. Ear, Nose and Throat ( कान, नाक, गला) 
// 9. Opthalmology (नेत्र रोग) 
// 10. Dental (दंत रोग)