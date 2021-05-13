const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema


const docDegSchema = new schema(
    {
        category: {
            type: String
        }, subCategory: [
            {
                type: ObjectId,
                ref: "DoctorSubCategory"
            }
        ]
    },
    { timestamps: true }

)

module.exports = mongoose.model('DoctorCategory', docDegSchema)
