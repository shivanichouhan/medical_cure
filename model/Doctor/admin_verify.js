const doc = require("../../model/Doctor/doctor_regis")
const subCategories = require("../../model/Doctor/doctor_subcategory")
const availabiltyHour = require("../../model/Doctor/availability_hour")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var otpGenerator = require('otp-generator')
const otp = require("../../otp")
const _ = require('lodash')
const cloud = require("../../cloudinary")
const fs = require('fs')



