const mongoose = require('mongoose')
const schema = mongoose.Schema

const commentblogSchema = new schema(
    {
      name:{
          type:String
      },
      email:{
          type:String
      },
      website:{
          type:String
      },
      comment:{
          type:String
      },
      date:{
          type:String
      },
      time:{
          type:String
      }
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('blog_comment', commentblogSchema)
