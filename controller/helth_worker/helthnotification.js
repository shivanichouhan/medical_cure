const Patient = require("../../model/helth_worker/patient_registration")
const Doct = require("../../model/Doctor/doctor_regis")
const helthworkers = require("../../model/helth_worker/users")
const not = require("../../model/Doctor/notification")
var notification_firebase = require("../../firebase_notification")






function NotificationData(userdata, senderData, callback) {
    console.log(userdata.firebase_token, "tokennnnnnnnnnnn",senderData)
    var msg = {}
    var Notification = {}
    // msg.to ="esed0YcuSNmd5V4ndADDfo:APA91bHD20VlzC4HkDILzcBpbtmr-0e_Xv4SMp7Jf6dt_hzJjlBxyx7wYzUB_BEleVKnpBNroDoxi_hBBybOJypXO8CoFMtFpmOK1s7Q1dE7dqxcpXxeCH6IcA71PAKqSxM3ZKPrQOEx"
    msg.to = userdata.firebase_token
    // "eJrtPtR0Rj6jaL5kDn_KGj:APA91bFDveVG4ZV4KOepK3F9T2Qzv_VVheeArUFgsOSbuu47c_aftUvLCt1CmC68KHgiDAT0CT1ZQ6-HRsaydL5QxuxB2bsb0lzGxln1ivAnGnL3rr59KoSkoV6YeH87wZB5wFa2Xjpu"
    msg.collapse_key = 'XXX'
    msg.data = { my_key: 'my value', contents: "abcv/" }
    Notification.title = `Incoming video call`
    Notification.body = senderData
    msg.notification = Notification
    notification_firebase.NotificationForHelthworker(msg).then(async (resp) => {
        console.log(resp)
        callback(true)

    }).catch((Err) => {
        console.log(Err)
        callback(false)
    })
}


exports.helthNotification = async (req, res) => {
    const { helthworker_id, doctor_id, patient_id, room_id } = req.body
    const array = {}
    console.log(req.body,"jhjhjjhjhjh")
    const helthworkerData = await helthworkers.findOne({ _id: helthworker_id })
    const DcotorData = await Doct.findOne({ _id: doctor_id },{username:1,_id:1,Specialization:1,profile_pic:1})
    const PatientData = await Patient.findOne({ _id: patient_id },{patient_name:1,_id:1,disease:1,patient_img:1,disease_id:1})
    console.log(helthworkerData)
    if (!helthworkerData) {
        res.json({ code: 400, "msg": "helthworker not find" })
    } else if (!DcotorData) {
        res.json({ code: 400, "msg": "Dcotor not find" })
    } else if (!PatientData) {
        res.json({ code: 400, "msg": "Patient not find" })
    } else {
        array.DcotorData =DcotorData
        array.PatientData = PatientData
        array.notification_type = "incoming_call"
        array.room_id = room_id
        NotificationData(helthworkerData, array, function (data) {
            if (data) {
                res.json({ code: 200, msg: "notification send" ,room_id:room_id})
            } else {
                res.json({ code: 400, msg: "something went wrong",room_id:room_id })

            }
        })
    }
}