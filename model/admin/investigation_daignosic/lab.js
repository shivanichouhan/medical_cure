const mongoose = require('mongoose')
const schema = mongoose.Schema

const labschema = new schema(
  {
    name:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    person:{
        type:String
    },
    city:{
        type:String
    },
    area:{
        type:String
    },
    status:{
        type:String,
        default:'Deactive'
    },
    test_lab:[{
        type:schema.Types.ObjectId,
        ref:'lab_test'
    }],
   
  }
,
  { timestamps: true }
)

module.exports = mongoose.model('lab', labschema)
