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

//user routes
const product = require('./routes/products');
const Users = require('./routes/users')
const dashboard_img = require('./routes/dashboard_img_list')
const patient = require('./routes/patient_registration')
//

//admin routes 
const adminReg = require("./routes/admin/admin_login")
const docRegistration = require("./routes/admin/Doctor/doctor_reg")
const img_banner = require("./routes/admin/banner_img")
const img_offer = require("./routes/admin/offer_img")
const specialList = require("./routes/admin/add_speacialist")
const addCategory = require("./routes/admin/add_category")
const addsubCategory = require("./routes/admin/add_sub_category")
const disease = require("./routes/admin/add_disease")
const blogs = require("./routes/admin/blog")
const cat_blog = require("./routes/admin/blog_cat")
const subcat_blog = require("./routes/admin/blog_sub_cat")
const appoinment = require("./routes/admin/appoinment/appoinments")
const department = require("./routes/admin/department/departments")
//

//doctor routes
const doctor_reg = require("./routes/doctor/doctor_registration")
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
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({
//     limit: '50mb',
//     extended: false,
//     parameterLimit: 50000
// }));


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
app.use('/api',adminReg)
app.use('/api',docRegistration)
app.use('/api',img_banner)
app.use('/api',img_offer)
app.use('/api',specialList)
app.use('/api',addCategory)
app.use('/api',addsubCategory)
app.use('/api',disease)
app.use('/api',blogs)
app.use('/api',cat_blog)
app.use('/api',subcat_blog)
app.use('/api',appoinment)
app.use('/api',department)
//

//doctor middleware
app.use('/api',doctor_reg)
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

