const doctor_category = require("../../model/Doctor/doctor_category")
const subCategories = require("../../model/Doctor/doctor_subcategory")


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
            .then((responce)=>{
                res.json({code:200,msg:responce})
            })
        })

}

exports.all_category = (req,res)=>{
    doctor_category.findOne({}).populate("subCategory")
    .then((resp)=>{
        res.send(resp)
    })
}