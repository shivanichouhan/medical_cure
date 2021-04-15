const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogSchema = new schema(
    {
        name: {
            type: String
        },
        blog_img: {
            type: Array
        },
        blog_cat_name: {
            type: String
        },
        blog_sub_cat: {
            type: String
        }, child_cate: {
            type: String
        },
        discription: {
            type: String
        },
        status: {
            type: String,
        },
        video_image:{
            type: Array
        },
        video_file: {
            type: Array
        },
        comment_count:{
            type:Number,
            default:0
        },
        comment:[{
            type:schema.Types.ObjectId,
            ref:'blog_comment'
        }]
    }
    ,
    { timestamps: true }
)

module.exports = mongoose.model('blog', blogSchema)
