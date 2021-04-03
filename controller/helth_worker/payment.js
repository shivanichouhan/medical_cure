const Razorpay = require('razorpay')
const shortid = require('shortid')
const Crypto =require('crypto')

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
    console.log(response) 

    res.send({code:200,msg:data})
}catch(error){
    console.log(error)
}
}

exports.payment_verfiy = (req,res)=>{
    var body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var exp_signature = Crypto.createHmac('sha256','RO60jVm7adVvv1KCagTT92ZL')
                    .update(body.toString())
                    .digest('hex')
                    console.log('real_sign',req.body.razorpay_signature)
                    console.log('exp_sign',exp_signature)
  
    if(exp_signature === req.body.razorpay_signature){
       res.send({code:200,msg:'payment successfully'})
   }else{
    res.send({code:400,msg:'payment failure'})
   }                 
}