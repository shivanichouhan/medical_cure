const Razorpay = require('razorpay')
const shortid = require('shortid')

var razorpay = new Razorpay({
    key_id:'rzp_live_uroygFNlI2ROD9',
    key_secret:'RO60jVm7adVvv1KCagTT92ZL'
})

exports.gen_orderId = async(req,res)=>{

const currency = 'INR'
const payment_capture = 1
const amount =req.body.amount

const info={
    amount:amount.toString(),
    currency,
    receipt:shortid.generate(),
    payment_capture,
}
try{
    const response = await razorpay.orders.create(info)
    const data = {}
    data.amount = response.amount
    data.order_id = response.id,
    data.currency = response.currency
    res.send({code:200,msg:data})
}catch(error){
    console.log(error)
}
}