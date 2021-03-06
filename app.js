var express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
require('dotenv').config()
var expressValidator = require('express-validator')
var path = require('path')
const cors = require('cors')
const morgan = require('morgan')
// const autoIncrement = require('mongoose-auto-increment');
const app = express()
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

if(typeof localStorage === "undefined" || localStorage === null){
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

//user routes
const product = require('./routes/helth_worker/products');
const Users = require('./routes/helth_worker/users')
// const Doctors = require('./routes/register_doctors')
const Contact = require('./routes/helth_worker/Contacts')
const Health_Worker = require('./routes/admin/Admin_add_healthworker')
const Admin_approve = require('./routes/admin/Admin_approve')
const Block_Worker = require('./routes/helth_worker/BlockWorker')


//Doctor
const Doctor = require('./routes/Doctor/Registration')
const Educational = require('./routes/Doctor/doctor_educational')
const Professional = require('./routes/Doctor/doctor_professional')
const Identity = require('./routes/Doctor/doctor_identity')
const Bank_Account = require('./routes/Doctor/doctor_bankaccount')
const dashboard_img = require('./routes/helth_worker/dashboard_img_list')
const patient = require('./routes/helth_worker/patient_registration')
const doctor_reg = require("./routes/Doctor/doctor_signin")

//

//admin routes 
const adminReg = require("./routes/admin/admin_login")
const docRegistration = require("./routes/admin/Doctor/doctor_reg")
const img_banner = require("./routes/admin/banner_img")
const img_offer = require("./routes/admin/offer_img")
const specialList = require("./routes/admin/add_speacialist")
const addCategory = require("./routes/admin/add_category")
const blog = require('./routes/helth_worker/blog_list')
const addsubCategory = require("./routes/admin/add_sub_category")
const disease = require("./routes/admin/add_disease")
const blogs = require("./routes/admin/blog")
const cat_blog = require("./routes/admin/blog_cat")
const subcat_blog = require("./routes/admin/blog_sub_cat")
const appoinment = require("./routes/admin/appoinment/appoinments")
const department = require("./routes/admin/department/departments")
//


mongoose.Promise = global.Promise
const PASSWORD = encodeURIComponent('@123navgurukul');
const database = 'xpresscure'
const databs = encodeURI(``)
mongoose.set('useFindAndModify', false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB Connected'))
  .catch(() => console.log('not conected'))

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
// app.use(expressValidator())
app.set('view engine', 'ejs')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());


app.get("/demo", (req, res) => {
  res.send("good shivani")
})
//users middleware
app.use('/api', dashboard_img)
app.use('/api', product)
app.use('/api', Users)
app.use('/api', patient)
//

//admin middleware
app.use('/api', adminReg)
app.use('/api', docRegistration)
app.use('/api', img_banner)
app.use('/api', img_offer)
app.use('/api', specialList)
app.use('/api', addCategory)
app.use('/api', blog)
//


app.use('/api', product)
app.use('/api', Users)
app.use('/api', Contact)
app.use('/api', Health_Worker)
app.use('/api', Admin_approve)
app.use('/api', Block_Worker)



//doctor
app.use('/api', Doctor)
app.use('/api', Educational)
app.use('/api', Professional)
app.use('/api', Identity)
app.use('/api', Bank_Account)
app.use('/api',doctor_reg)
app.get("/admin_login", (req, res) => {
  res.sendFile(path.join(__dirname + '/views/login.html'));
});

app.get("/deshboard", (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));

})

app.use('/api', addsubCategory)
app.use('/api', disease)
app.use('/api', blogs)
app.use('/api', cat_blog)
app.use('/api', subcat_blog)
app.use('/api', appoinment)
app.use('/api', department)
//

//doctor middleware
app.use('/api', doctor_reg)
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

