var express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
require('dotenv').config()
var expressValidator = require('express-validator')
var path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const autoIncrement = require('mongoose-auto-increment');
const product = require('./routes/products')

const app = express()

mongoose.Promise = global.Promise
mongoose
    .connect(
        // 'mongodb://127.0.0.1:27017/litlight',   
        // 'mongodb+srv://shivani:123navgurukul@cluster0.kpjuc.mongodb.net/medical?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )

    .then(() => console.log('DB Connected'))

// app.use(expressValidator())
app.set('view engine', 'ejs')
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000
}));




app.use('/', product)


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

