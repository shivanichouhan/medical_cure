const doctor_category = require("../../model/Doctor/doctor_category")
const subCategories = require("../../model/Doctor/doctor_subcategory")
const doct = require("../../model/helth_worker/recharge_wallet")
const addmemberModal = require("../../model/Doctor/notification")


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


exports.last_three_month = (req, res) => {
  let date = new Date();
  date.setMonth(date.getMonth() - 01);
  let dateInput = date.toISOString();
  addmemberModal
    .aggregate([
      {
        $match: {
          $and: [
            { $expr: { $gt: ["$createdAt", { $toDate: dateInput }] } },
          ]
        },
      },
      {
        $project: {
          email: 1,
          createdAt: 1,
          username: 1
        },
      },
    ])
    .exec((err, mon) => {
      if (err) {
        res.send("data not found");
        console.log(err);
      } else {
        res.send(mon);
      }
    });
};