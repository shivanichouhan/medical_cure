const mongoose = require('mongoose')
const schema = mongoose.Schema
const { ObjectId } = mongoose.Schema


const docDegSchema = new schema(
    {
        subCategory: {
            type: String
        }, DoctorList: [
            {
                type: ObjectId,
                ref: "Doctor_Registration"
            }
        ]
    },
    { timestamps: true }

)

module.exports = mongoose.model('DoctorSubCategory', docDegSchema)
