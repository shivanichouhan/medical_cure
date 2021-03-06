const Socket1 = require("websocket").server;


// var firebase = require("firebase/app");

// Add the Firebase products that you want to use
// require("firebase/auth");
// require("firebase/firestore");

const { ExpressPeerServer } = require("peer");


var express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
require('dotenv').config()
var expressValidator = require('express-validator')
var path = require('path')
const cors = require('cors')
const morgan = require('morgan')

const fs = require("fs")
// const autoIncrement = require('mongoose-auto-increment');
const app = express()
const http = require('http').Server(app)
var https = require('https');

// const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
var PeerServer = require('peer').PeerServer;

const io = require('socket.io')(http,
  {
    cors: {
      origin: '*'
    }
  });


// var httpsServer = https.createServer(credentials, app);


app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '/public')));
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/sender'));
app.use(express.static(__dirname + '/receiver'));
app.use(express.static(__dirname + '/server'));
app.use(express.static('public'))


if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
//email
const mail = require("./routes/admin/suscribe")

const cloudenary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()

cloudenary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.cloud_api_key,
  api_secret: process.env.cloud_api_secret
});



const chat_msg = require("./model/chat_msg")

//hel[line ===
const helpline_specelize = require("./routes/helpLines/helpline_specelization")
const helpline_patient =require("./routes/helpLines/patient_ragister")

//user routes
const Faq = require("./routes/helth_worker/faq")
const payment = require('./routes/helth_worker/payment')
const product = require('./routes/helth_worker/products');
const Users = require('./routes/helth_worker/users')
const list_state_district = require('./routes/helth_worker/city_list')

// const Doctors = require('./routes/register_doctors')
const categories = require("./routes/Doctor/doctor_category")
const Contact = require('./routes/helth_worker/Contacts')
const rechargewallet = require("./routes/helth_worker/recharge_wallet")
const Health_Worker = require('./routes/admin/Admin_add_healthworker')
const Admin_approve = require('./routes/admin/Admin_approve')
const Block_Worker = require('./routes/helth_worker/BlockWorker')
const courseHealth = require('./routes/helth_worker/courseList')
const states = require('./routes/helth_worker/state');
const dep_health = require('./routes/helth_worker/list_dep')
const dashboard_img = require('./routes/helth_worker/dashboard_img_list')
const patient = require('./routes/helth_worker/patient_registration')
const conversation = require("./routes/helth_worker/jia_conversation")
//Doctor
// const dashboard_img = require('./routes/helth_worker/dashboard_img_list')
// const patient = require('./routes/helth_worker/patient_registration')
// const doctor_reg = require("./routes/Doctor/doctor_signin")
// const listDepartment = require("./routes/Doctor/area_of_interest")
// const doc_deg = require("./routes/Doctor/degree_list")
// const cureBlogList = require("./routes/Doctor/search_cureblog")
// const
// const Doctor = require('./routes/Doctor/Registration')
const push_notification = require("./routes/Doctor/notification")
const Educational = require('./routes/Doctor/doctor_educational')
const Professional = require('./routes/Doctor/doctor_professional')
const Identity = require('./routes/Doctor/doctor_identity')
const Bank_Account = require('./routes/Doctor/doctor_bankaccount')
const doctor_reg = require("./routes/Doctor/doctor_signin")
const listDepartment = require("./routes/Doctor/area_of_interest")
const doc_deg = require("./routes/Doctor/degree_list")
const cureBlogList = require("./routes/Doctor/search_cureblog")
const Prescription = require("./routes/Doctor/prescription")
//
const Doctor_Certificate = require('./routes/Doctor/doctor_certificate')
const Phone_varify = require('./routes/Doctor/phone_varify')
const Review = require('./routes/Doctor/Reviews');
const appoinement_list = require("./routes/Doctor/appointment_lists")


//admin routes 
const add_question = require("./routes/admin/question_add")
const addClg = require("./routes/admin/add_clg")
const comment = require("./routes/admin/blog_comment")
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
const childCat_blog = require("./routes/admin/blog_child_cat")
const appoinment = require("./routes/admin/appoinment/appoinments")
const department = require("./routes/admin/department/departments")
const employee = require("./routes/admin/employee/emp_reg")
const medicine = require("./routes/admin/pharmacy/medicine")
const labs = require("./routes/admin/investigation_daignosic/lab")
const lab_test = require("./routes/admin/investigation_daignosic/lab_test")
const listPatient = require("./routes/admin/patient")
const analytics = require("./routes/admin/analytics")
const inspire = require("./routes/admin/inspire")
const cureBlogs = require("./routes/admin/marketing/cure_blog")
const cityAdd = require("./routes/admin/state_city/add_city")
const Comission = require("./routes/admin/comission")
const rechargePoint = require("./routes/admin/recharge_point")
const Xpost = require("./routes/admin/xpost")
const MyPost = require("./routes/admin/mypost")
const helthnotifications = require("./routes/helth_worker/helthwork_notification")
//

const contact_us = require('./routes/admin/contact_us')
const Feedbacks = require("./routes/helth_worker/feedback")


//Patient
const patients = require("./routes/patient/patient_signin")



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
//email
app.use('/api', mail)


//helpline numberss
app.use("/api",helpline_specelize)
app.use("/api",helpline_patient)

//helthworker middleware
app.use("/api",Faq)
app.use("/api", Feedbacks)
app.use('/api', dashboard_img)
app.use('/api', product)
app.use('/api', Users)
app.use('/api', patient)
app.use('/api', courseHealth)
app.use('/api', list_state_district)
app.use('/api', product)
app.use('/api', Users)
app.use('/api', Contact)
app.use('/api', Health_Worker)
app.use('/api', Admin_approve)
app.use('/api', Block_Worker)
app.use('/api', states);
app.use('/api', dep_health)
app.use("/api", conversation)
app.use('/api', payment)
app.use("/api", rechargewallet)
app.use("/api",helthnotifications)
//

//admin middleware
app.use("/api", add_question)
app.use('/api', addClg)
app.use('/api', adminReg)
app.use('/api', comment)
app.use('/api', docRegistration)
app.use('/api', img_banner)
app.use('/api', img_offer)
app.use('/api', specialList)
app.use('/api', addCategory)
app.use('/api', blog)
app.use('/api', employee)
app.use('/api', medicine)
app.use('/api', addsubCategory)
app.use('/api', disease)
app.use('/api', blogs)
app.use('/', cat_blog)
app.use('/api', subcat_blog)
app.use('/api', childCat_blog)
app.use('/api', appoinment)
app.use('/api', department)
app.use('/api', labs)
app.use('/api', lab_test)
app.use('/api', listPatient)
app.use("/api", analytics)
app.use('/api', inspire)
app.use('/api', cureBlogs)
app.use('/api', cityAdd)
app.use('/api', Prescription)
app.use('/api', contact_us)
app.use('/api', Comission)
app.use('/api', rechargePoint)
app.use('/api', Xpost)
app.use('/api', MyPost)
//

//doctor
// app.use('/api', Doctor)
app.use("/api", categories)
app.use('/api', Educational)
app.use('/api', Professional)
app.use('/api', Identity)
app.use('/api', Bank_Account)
app.use('/api', doctor_reg)
app.use('/api', listDepartment)
app.use('/api', doc_deg)
app.use('/api', cureBlogList)
app.use('/api', Prescription)
app.use('/api', push_notification)
//
app.use('/api', doctor_reg)
app.use('/api', Phone_varify)
app.use('/api', Phone_varify)
app.use('/api', Review)
app.use('/api', appoinement_list)


app.get("/pdf", (req, res) => {
res.render('pre.ejs')
  // res.sendFile(path.join(__dirname + '/views/login.html'));
});
app.get("/deshboard", (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'));
})


//Patient 
app.use('/api', patients)

app.post("/data_resp", (req, res) => {
  console.log(req.body)
  res.send("good shivani")
})

//
app.use('/api', addsubCategory)
app.use('/api', disease)
app.use('/api', blogs)
app.use('/api', cat_blog)
app.use('/api', subcat_blog)
app.use('/api', appoinment)
app.use('/api', department)
//


app.get("/start_call", (req, res) => {
  res.sendFile(
    path.join(__dirname + '/server/call.html')
  )
})

app.get("/sender_call", (req, res) => {
  res.sendFile(
    path.join(__dirname + '/sender/sender.html')
  )
}
)

app.get("/anathor_call", (req, res) => {
  res.sendFile(
    path.join(__dirname + '/views/index.html')
  )
}
)

app.get("/recieve_call", (req, res) => {
  res.sendFile(
    path.join(__dirname + '/receiver/receiver.html')
  )
}
)

app.post('/all_msg', async (req, res) => {
  //find chats between two users
  const { room_id } = req.body
  console.log(req.body)
  chat_msg.find({ rooms_name: room_id })
    .sort({ createdAt: 1 })
    .then(messages => {
      res.json({ code: 200, msg: messages })
      console.log(messages, "shivani messages")
    });
});

function randomString(len, charSet) {
  charSet = charSet || '0123456789'
  var randomString = ''
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length)
    randomString += charSet.substring(randomPoz, randomPoz + 1)
  }
  return randomString
}


const chat_room = require("./model/chat_room")
app.post("/chat_room", (req, res) => {
  const { user_one, user_two } = req.body;
  console.log(req.body)
  var otps = randomString(10, '123456abcdefghijklmnopqrstuvwxyz7890')
  chat_room.findOne({ $and: [{ user_one: user_one, user_two: user_two }] })
    .then(async (resp) => {
      if (resp) {
        console.log(resp)
        res.json({ code: 200, msg: { room: resp.room, status: "room already exist" } })
      } else {
        const store_datas = await chat_room.findOne({ $and: [{ user_two: user_one, user_one: user_two }] })
        if (store_datas) {
          res.json({ code: 200, msg: { room: store_datas.room, status: "room already exist" } })
        } else {
          const video_store = new chat_room({
            user_one: user_one,
            user_two: user_two,
            room: otps
          })
          video_store.save()
            .then((responce) => {
              console.log(responce)
              res.json({ code: 200, msg: { room: responce.room, status: "chat room created" } })

            })
        }
      }

    })
})

// var socket = io.connect();
console.log("shivani socket connected")
io.on('connection', function (socket) {
  console.log("shivani socket is connected")
  console.log('User Conncetion');
 
  socket.on('connect user', async function (user) {
    console.log(user, "user details");
    io.emit('connect user', user);
    console.log(user, "user fffffff   details");
    console.log(user)
    socket.join(user.room_id);
    console.log('check 2', socket.connected);
    console.log(socket.id, "this is connected iiiii uuuuusssseeeerrr ")
    console.log("join in room")

    // var clients = io.sockets.clients('chatroom1');
    // console.log(clients, "connected user on room......................")
    
    var clientsList = io.sockets.adapter.rooms["chatroom1"];
    var numClients = clientsList;
    console.log(numClients, "shivaniiihhygyggiiiiiiiiiiiiiiiiiiiiiii")

  });

  socket.on('on typing', function (typing) {
    console.log("Typing.... ", typing);
    io.emit('on typing', typing);
  });
  socket.on('new message', async function (username) {
    console.log("new msg", username)
    var dataURI = username.dataURI;
    if (dataURI) {
      const chatdata = new chat_msg({
        msg: username.message,
        drId: username.drId,
        pid: username.pid,
        h_name: username.h_name,
        currentTime: username.currentTime,
        rooms_name: username.room_id,
        username: username.username
      })
      var uploadStr = 'data:image/jpeg;base64,' + dataURI;

      cloudenary.uploader.upload(uploadStr, {
        overwrite: true,
        invalidate: true,
        width: 810, height: 456, crop: "fill"
      },
        async function (error, result) {
          console.log(result, "image urls")
          username.dataURI = result.secure_url
          chatdata.chat_image = result.secure_url
          chatdata.save()
          io.emit('new message', username);
        });
    } else {
      const chatdata = new chat_msg({
        msg: username.message,
        drId: username.drId,
        pid: username.pid,
        h_name: username.h_name,
        currentTime: username.currentTime,
        rooms_name: username.room_id,
        username: username.username
      })
      chatdata.save()
      io.emit('new message', username);
    }

  });

  //prescription start path
  const patient_pres = require("./prescription_pdf")
  const Prescription = require("./model/Doctor/prescription")
  const cloud = require("./cloudinary")
  const Patient = require("./model/helth_worker/patient_registration")
  const Fs = require('fs')
  const Doct = require("./model/Doctor/doctor_regis")
  const not = require("./model/Doctor/notification")
  var notification_firebase = require("./firebase_notification")
  var helth_workers = require("./model/helth_worker/users")

 //prescription end path

 

  socket.on("prescription", async function (patDetail) {
    console.log('prescription', patDetail)
    var patientInfo = await Patient.findOne({ _id: req.body.patientId })
    var preObj = new Prescription(req.body)
    preObj.save((err, resp) => {
      if (err) {
        console.log('prescription not add')
      } else {
        console.log(resp)
        patient_pres.patPrescription(resp, patientInfo).then((filePath) => {
          console.log(filePath)
          var sp = filePath.split('/')
          console.log(sp)
          var lst = sp.slice(-1).pop()
          console.log(lst, 'last')

          cloud.prescription_patient(lst).then((pdf) => {
            console.log(pdf, 'url')
            Fs.unlinkSync(pdf.fileP)

            Patient.updateOne({ _id: req.body.patientId }, { $push: { prescription: resp.id, prescription_url: pdf.url } }, (err, resp) => {
              if (err) {
                console.log('prescription not add in patient')
              } else {
                // var datas = await helth_workers.findOne({ _id: health_worker_id })
                //        const datadoctor =await Doct.findOne({_id:patDetail.})
                // var msg = {}
                // var Notification = {}
                // msg.to = data.firebase_token
                // msg.collapse_key = 'XXX'
                // msg.data = { my_key: 'my value', contents: "abcv/" }
                // Notification.title = `${datas.username} Title of the notification`
                // Notification.body = `Doctor Has Send prescription To you.`
                // msg.notification = Notification
                // notification_firebase.Notification(msg).then(async (resp) => {
                //   console.log(resp)
                //   var obj = {}
                //   obj.username = datas.username
                //   obj.email = datas.email
                //   obj.profile_pic = datas.profile_pic
                //   obj.notification_text = `Doctor Has Send prescription To you.`
                //   obj.healthworker_id = health_worker_id
                //   obj.docId = doctor_id;
                //   var notObj = new not(obj)
                //   var notData = await notObj.save()
                console.log('prescription add successfully')
                io.emit("prescription", { url: pdf.url })
                // })
              }
            })
          })

        })
      }
    })
    // }
  })
  // })


  socket.on("accept_petient", async function (datas) {
    if (datas.type == "1") {
      socket.join(datas.p_id);
      socket.join(datas.d_id);
    }
  })

  // socket.on('chat message', async function (msg) {
  //   console.log("Message " + msg['message']);
  //   io.emit('chat message', msg);
  //   io.emit('chat message', msg);
  // });
});


//doctor middleware
app.use('/api', doctor_reg)

const port = process.env.PORT || 8000
// const server = http.createServer(app)







function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

app.get('/s', (req, res) => {
  res.redirect(`/${create_UUID()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId)
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)
  })
})


// var webSocket = new WebSocket("wss://backend.xpresscure.com/socketserver", "protocolOne");
// var https = require('http');
// var Server = https.createServer(app);


// const Socket1 = require("websocket").server
// const http1 = require("http")
// .Server(app)
// const server = http1.createServer(app)



// http.listen(port, () => {
//   console.log(`Server is running on port ${port}`)
// })

var privateKey = fs.readFileSync('./ssl/key.pem', "utf-8");
// console.log(privateKey,"kkkkkk")
var certificate = fs.readFileSync('./ssl/cert.pem', "utf-8");;

// var credentials = { key: privateKey, cert: certificate };

var server = PeerServer({
  port: 8000,
  path: '/',
  ssl: {
    key: privateKey,
    cert: certificate
  }
});

// const peerServer = ExpressPeerServer(http, {
//   debug: true,
//   path: '/',
//   host: 5000,
//   secure: true,
// });

app.use('/peerjs', server);




const listener = http.listen(5000, () => {
  console.log("Your app is listening on port " + 5000);
});

const webSocket = new Socket1({ httpServer: http, autoAcceptConnections: false })

let users = []

webSocket.on('request', (req) => {
  const connection = req.accept()

  connection.on('message', (message) => {
    const data = JSON.parse(message.utf8Data)

    const user = findUser(data.username)

    switch (data.type) {
      case "store_user":

        if (user != null) {
          return
        }

        const newUser = {
          conn: connection,
          username: data.username
        }

        users.push(newUser)
        console.log(newUser.username)
        break
      case "store_offer":
        if (user == null)
          return
        user.offer = data.offer
        break

      case "store_candidate":
        if (user == null) {
          return
        }
        if (user.candidates == null)
          user.candidates = []

        user.candidates.push(data.candidate)
        break
      case "send_answer":
        if (user == null) {
          return
        }

        sendData({
          type: "answer",
          answer: data.answer
        }, user.conn)
        break
      case "send_candidate":
        if (user == null) {
          return
        }

        sendData({
          type: "candidate",
          candidate: data.candidate
        }, user.conn)
        break
      case "join_call":
        if (user == null) {
          return
        }

        sendData({
          type: "offer",
          offer: user.offer
        }, connection)

        user.candidates.forEach(candidate => {
          sendData({
            type: "candidate",
            candidate: candidate
          }, connection)
        })

        break
    }
  })

  connection.on('close', (reason, description) => {
    users.forEach(user => {
      if (user.conn == connection) {
        users.splice(users.indexOf(user), 1)
        return
      }
    })
  })
})

function sendData(data, conn) {
  conn.send(JSON.stringify(data))
}

function findUser(username) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username)
      return users[i]
  }
}

