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
const app = express()


const product = require('./routes/products');
const Users = require('./routes/users')


mongoose.Promise = global.Promise
const PASSWORD = encodeURIComponent('@123navgurukul');
const database = 'xpresscure' 
const databs =  encodeURI(``)
mongoose.set('useFindAndModify', false);

mongoose
  .connect( 
    'mongodb+srv://xpresscure:@123navgurukul@123s.jvop3.mongodb.net/<dbname>?retryWrites=true&w=majority',
    // process.env.MONGO_URI,   
 {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }
  )

  .then(() => console.log('DB Connected'))
  .catch(()=> console.log('not conected'))


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


app.get("/demo",(req,res)=>{
    res.send("good shivani")
})

app.use('/', product)
app.use('/',Users)


const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

