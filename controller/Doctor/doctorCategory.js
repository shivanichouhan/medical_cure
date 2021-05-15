const doctor_category = require("../../model/Doctor/doctor_category")
const subCategories = require("../../model/Doctor/doctor_subcategory")
const doct = require("../../model/helth_worker/recharge_wallet")
const addmemberModal = require("../../model/Doctor/notification")
const responce_time = require("../../model/Doctor/responce_time")

exports.createDoctor_cat = (req, res) => {
  const { category } = req.body;
  const data = new doctor_category({
    category: category
  })
  data.save()
    .then((resp) => {
      res.send("category create")
    })
}


exports.createSubCategory = (req, res) => {
  const { subCategory, categ_id } = req.body
  const data = new subCategories({
    subCategory: subCategory
  })
  data.save()
    .then((resp) => {
      console.log(resp)
      doctor_category.updateOne({ _id: categ_id }, { $push: { subCategory: resp._id } })
        .then((responce) => {
          res.json({ code: 200, msg: responce })
        })
    })

}

exports.all_category = async (req, res) => {
  var lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 15);
  const details = await doct.find({ "createdAt": { $gte: lastWeek } });
  subCategories.find({}).populate("DoctorList")
    .then((resp) => {
      res.send(details)
    })
}







exports.last_three_month = async (req, res) => {

  // responce_time.aggregate([{ $match: { patient_id: "6065f6bd6b98a35ead850d4c" } },
  // {
  //   $project: {
  //     dateDifference:
  //       { $subtract: ["$ongoing_time", "$accepted_time"] }
  //   }
  // }])

  let date = new Date();
  date.setMonth(date.getMonth() - 01);
  let dateInput = date.toISOString();
  responce_time.aggregate([
    {
      $match: {
        $and: [
          { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
        ]
      },
    },
    {
      $project: {
        ongoing_time: 1,
        accepted_time: 1,
        duration: { $divide: [{ $subtract: ["$ongoing_time", "$accepted_time"] }, 3600000] }
      }
    }
  ])
    .exec((err, mon) => {
      const d = mon[0]
      let minutes = (d.duration * 60.00);
      let j = parseInt(minutes, 10)
      console.log(mon)
      console.log(err)
      res.send({ code: 222, msg: mon, jj: minutes, ss: j })
    })



  // let date = new Date();
  // date.setMonth(date.getMonth() - 01);
  // let dateInput = date.toISOString();
  // addmemberModal
  //   .aggregate([
  //     {
  //       $match: {
  //         $and: [
  //           { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
  //         ]
  //       },
  //     },
  //     {
  //       $project: {
  //         email: 1,
  //         createdAt: 1,
  //         username: 1
  //       },
  //     },
  //   ])
  //   .exec((err, mon) => {
  //     if (err) {
  //       res.send("data not found");
  //       console.log(err);
  //     } else {
  //       res.send(mon);
  //     }
  //   });
};