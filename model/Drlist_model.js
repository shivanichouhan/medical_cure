const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
require('mongoose-double')(mongoose)

var SchemaTypes = mongoose.Schema.Types

const EventSchema = new mongoose.Schema(

    {
        Diabetilogy:{
            type: String,
            default:''
        },
        Pulmunology:{
            type: String,
            default:''
        },
        Neurology:{
            type: String,
            default:''
        },
        Dermotology:{
            type: String,
            dafault:''
        },
        Orthopaedics:{
            type: String,
            default:''
        },
        Cardiology:{
            type:String,
            default:''
        },
        General_physician:{
            type:String,
            default:''
        },
        Corona_expert:{
            type:String,
            default:''
        }

    }
)

module.exports = mongoose.model('Drlist', EventSchema)
