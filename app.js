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
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

//user routes
const product = require('./routes/products');
const Users = require('./routes/users')
const dashboard_img = require('./routes/dashboard_img_list')
const patient = require('./routes/patient_registration')
//

//admin routes 
const img_banner = require("./routes/admin/banner_img")
const img_offer = require("./routes/admin/offer_img")
const specialList = require("./routes/admin/add_speacialist")
const addCategory = require("./routes/admin/add_category")

const admin_data = require('./routes/Admin_route')


//blogs
const blog = require('./routes/blog_list')

//
mongoose.Promise = global.Promise
const PASSWORD = encodeURIComponent('@123navgurukul');
const database = 'xpresscure' 
const databs =  encodeURI(``)
mongoose.set('useFindAndModify', false);

mongoose
  .connect(process.env.MONGO_URI,{
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
.then(() => console.log('DB Connected'))
.catch(()=> console.log('not conected'))


// app.use(expressValidator())
app.set('view engine', 'ejs')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());



app.get("/demo",(req,res)=>{
    res.send("good shivani")
})
//users middleware
app.use('/api',dashboard_img)
app.use('/api', product)
app.use('/api',Users)
app.use('/api',patient)
//

//admin middleware
app.use('/api',img_banner)
app.use('/api',img_offer)
app.use('/api',specialList)
app.use('/api',addCategory)
app.use('/api',admin_data)
app.use('/api',blog)


app.get("/admin_login",(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/login.html'));

})


//
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${`port`}`)
});



