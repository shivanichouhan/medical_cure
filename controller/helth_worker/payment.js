const Razorpay = require('razorpay')
const shortid = require('shortid')
const Crypto = require('crypto')
const patient_data = require("../../model/helth_worker/patient_registration")
const health_credit = require("../../model/helth_worker/payment")
const doctor_data = require("../../model/Doctor/doctor_regis")
const helthworkers = require("../../model/helth_worker/users")

var razorpay = new Razorpay({
    key_id: 'rzp_test_71bMsZX0h63757',
    key_secret: 'BaXwG1Ey4z1m440ZsQZPcV5b'
})

exports.gen_orderId = async (req, res) => {
    const currency = 'INR'
    const payment_capture = '1'
    const amount = req.body.amount

    const info = {
        amount: amount.toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
    }
    try {
        const response = await razorpay.orders.create(info)
        const data = {}
        data.amount = response.amount
        data.order_id = response.id,
            data.currency = response.currency
        data.key_id = 'rzp_test_71bMsZX0h63757'
        console.log(response)

        res.send({ code: 200, msg: data })
    } catch (error) {
        console.log(error)
    }
}

exports.payment_verfiy = async (req, res) => {
    const { doctor_id, helthworker_id, amount } = req.body;
    console.log(req.body)
    var body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var exp_signature = Crypto.createHmac('sha256', 'BaXwG1Ey4z1m440ZsQZPcV5b')
        .update(body.toString())
        .digest('hex')
    console.log('real_sign', req.body.razorpay_signature)
    console.log('exp_sign', exp_signature)
    const newcredit = new health_credit({
        health_workerId: helthworker_id,
        doctor_id: doctor_id,
        amount: amount
    })
    const doctors = await doctor_data.findOne({ _id: doctor_id })
    if (doctors) {
        const helthmitra = await helthworkers.findOne({ _id: helthworker_id })
        if (helthmitra) {
            if (exp_signature === req.body.razorpay_signature) {
                newcredit.status = "success"
                newcredit.save()
                    .then((resp) => {
                        res.send({ code: 200, msg: 'payment successfully' })
                    })
            } else {
                newcredit.status = "failed"
                newcredit.save()
                    .then((resp) => {
                        res.send({ code: 400, msg: 'payment failure' })
                    })
            }
        } else {
            res.send({ code: 400, msg: 'helth worker not found' })
        }
    } else {
        res.send({ code: 400, msg: 'doctor not found' })

    }
}


exports.creditHistory = (req, res) => {
    const { helthworker_id } = req.body
    health_credit.find({ health_workerId: helthworker_id })
        .then((responce) => {
            res.json({ code: 200, msg: responce })
        }).catch((err) => {
            res.json({ code: 400, msg: "something went wrong" })
        })
}