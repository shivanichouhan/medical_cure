const Feedback = require('../../model/helth_worker/feedback_model');
const fs = require("fs")
const cloudenarys = require("../../cloudinary")


exports.add_feedback = async (req, res) => {
    const {
        Rate_Us,
        Rate_Status,
        Comment,
        helth_worker_id
    } = req.body
    const datacheck = await Feedback.findOne({ helth_worker_id: helth_worker_id })
    if (datacheck) {
        const obj = {}
        if (Rate_Us) {
            obj.Rate_Us = Rate_Us
        } if (Rate_Status) {
            obj.Rate_Status = Rate_Status
        } if (Comment) {
            obj.Comment = Comment
        }
        const datas = req.files
        console.log(datas,"kkkkk")
        const image_arr = []

        if (req.files) {
            console.log("edit images")
            const details = req.files
           await Promise.all(details.map(async (item) => {
                const images = await cloudenarys.Certificate(item.path)
                console.log(images, "jijiihhh")
                image_arr.push(images.url)
                fs.unlinkSync(item.path)
            })).then((resp) => {
                obj.User_Image = image_arr
            })
        }
        const update_data = await Feedback.updateOne({ helth_worker_id: helth_worker_id }, { $set: obj })
        res.json({ code: 200, msg: "update feedback successfully" })

    } else {
        if (req.files) {
            const details = req.files
            const image_arr = []
            await Promise.all(details.map(async (item) => {
                const images = await cloudenarys.Certificate(item.path)
                console.log(images, "jijiihhh")
                image_arr.push(images.url)
                fs.unlinkSync(item.path)
            })).then((resp) => {

                const data = new Feedback({
                    Rate_Us: Rate_Us,
                    Rate_Status: Rate_Status,
                    Comment: Comment,
                    User_Image: image_arr,
                    helth_worker_id: helth_worker_id
                })
                data.save()
                    .then((resp) => {
                        res.json({ code: 200, msg: "Successfully add Feedback" })
                    })
            })
        } else {
            res.send({ code: 400, msg: "you dint choose image file" })
        }
    }

}


