const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const imageSchema = mongoose.Schema({

    p_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    summery: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

// var connection = mongoose.createConnection(
//     "mongodb+srv://xpresscure:@123navgurukul@123s.jvop3.mongodb.net/xpresscure?retryWrites=true&w=majority");
// autoIncrement.initialize(connection);
// imageSchema.plugin(autoIncrement.plugin, {
//   model: 'product',
//   field: 'p_id',
//   type:String,
//   startAt: "1"
// });


module.exports = mongoose.model('product', imageSchema);