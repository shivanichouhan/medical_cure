const Doct = require("../../model/Doctor/doctor_regis")
const not = require("../../model/Doctor/notification")

var notification_firebase = require("../../firebase_notification")

exports.notification = async (req, res) => {
  var data = await Doct.findOne({ _id: req.body.docId })
  console.log(data)
  if (data) {
    var msg = {}
    var Notification = {}
    msg.to = data.firebase_token
    msg.collapse_key = 'XXX'
    msg.data = { my_key: 'my value', contents: "abcv/" }
    Notification.title = `${data.username} Title of the notification`
    Notification.body = req.body.msg
    msg.notification = Notification

    notification_firebase.Notification(msg).then(async (resp) => {
      console.log(resp)
      var obj = {}
      obj.username = data.username
      obj.email = data.email
      obj.profile_pic = data.profile_pic
      obj.notification_text = req.body.msg
      obj.docId = req.body.docId
      var notObj = new not(obj)
      var notData = await notObj.save()
      if (notData) {
        var notCount = data.notification_count + 1
        console.log(notCount)
        var docupdate = await Doct.updateOne({ _id: req.body.docId }, { $set: { notification_count: notCount } })
        if (docupdate) {
          res.json({ code: 200, msg: 'notification send successfully' })
        } else {
          res.json({ code: 400, msg: 'notification count not increase' })
        }
      } else {
        res.json({ code: 400, msg: 'notification detail no save' })
      }
    }).catch((err) => {
      console.log(err)
      res.json({ code: 400, msg: 'notification not send' })
    })

  }
  else {
    res.json({ code: 400, msg: 'doctor not find' })
  }
}

exports.list_notification = async (req, res) => {
  var not_data = await not.find({ docId: req.body.docId })
  if (not_data.length > 0) {
    var docUp = await Doct.updateOne({ _id: req.body.docId }, { $set: { notification_count: 0 } })
    if (docUp) {
      res.json({ code: 200, msg: not_data })
    } else {
      res.json({ code: 400, msg: 'notification count not update' })
    }
  } else {
    res.json({ code: 400, msg: 'notification data not found' })
  }
}