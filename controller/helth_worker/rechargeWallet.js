const Razorpay = require('razorpay')
const shortid = require('shortid')
const Crypto = require('crypto')
const helthWorkers = require("../../model/helth_worker/recharge_wallet")
const helthdata = require("../../model/helth_worker/users")
var razorpay = new Razorpay({
    key_id: 'rzp_test_71bMsZX0h63757',
    key_secret: 'BaXwG1Ey4z1m440ZsQZPcV5b'
})

exports.generate_orderId = async (req, res) => {
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


exports.recharge_verify = async (req, res) => {
    const { helthworker_id, amount } = req.body;
    console.log(req.body)
    var body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var exp_signature = Crypto.createHmac('sha256', 'BaXwG1Ey4z1m440ZsQZPcV5b')
        .update(body.toString())
        .digest('hex')
    console.log('real_sign', req.body.razorpay_signature)
    console.log('exp_sign', exp_signature)

    const helthworkerdata = await helthdata.findOne({ _id: helthworker_id })
    console.log(helthworkerdata)
    if (helthworkerdata) {
        console.log(helthworkerdata)
        const dataresp = new helthWorkers({
            helthworker_id: helthworker_id,
            amount: amount,
            email: helthworkerdata.email,
            username: helthworkerdata.username,
            photo: helthworkerdata.photo,
            mobile: helthworkerdata.mobile
        })
        if (exp_signature === req.body.razorpay_signature) {
            dataresp.status = "success"
            dataresp.save()
                .then((resp) => {
                    res.send({ code: 200, msg: 'payment successfully' })
                })
            // patient_data.updateOne({$and:[{doctor_id:doctor_id,_id:patient_id}]},{status:"booked"})
            // .then((responce)=>{

            // })
        } else {
            dataresp.status = "failed"
            dataresp.save()
                .then((resp) => {
                    res.send({ code: 400, msg: 'payment failure' })
                })
        }
    } else {
        res.send({ code: 400, msg: 'helthworker not exist' })

    }
}


exports.recharge_history = (req, res) => {
    const { helthworker_id } = req.body;
    helthWorkers.findOne({ helthworker_id: helthworker_id })
        .then((resp) => {
            res.json({ code: 200, msg: resp })
        }).catch((err) => {
            res.json({ code: 400, msg: "something went wrong" })
        })
}

exports.helthworkerwallet =async (req, res) => {
    const { helthworker_id } = req.body;
    helthWorkers.find({ helthworker_id: helthworker_id }).sort({ createdAt: -1 })
        .then(async(resp) => {
            const obj = {}
            let count_price = 0
            console.log("resp",resp)
            await Promise.all(resp.map(items => {
                console.log(items)
                if (items) {
                    var jj = items.amount
                    var price = parseInt(jj)
                    count_price = count_price + price
                }else{
                    console.log("something went wrong ")
                }
            })).then((resped)=>{
                obj.wallet = count_price
                obj.last_transaction = resp[0]
                obj.helthworker_id = helthworker_id
                res.json({code:200,msg:obj})
            })
        })
}