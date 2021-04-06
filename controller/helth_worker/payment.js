const Razorpay = require('razorpay')
const shortid = require('shortid')
const Crypto =require('crypto')

var razorpay = new Razorpay({
    key_id:'rzp_test_71bMsZX0h63757',
    key_secret:'BaXwG1Ey4z1m440ZsQZPcV5b'
})

exports.gen_orderId = async(req,res)=>{
const currency = 'INR'
const payment_capture = '1'
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
    data. key_id = 'rzp_test_71bMsZX0h63757'
    console.log(response) 

    res.send({code:200,msg:data})
}catch(error){
    console.log(error)
}
}

exports.payment_verfiy = (req,res)=>{
    var body = req.body.razorpay_order_id+ "|" +req.body.razorpay_payment_id;
    var exp_signature = Crypto.createHmac('sha256','BaXwG1Ey4z1m440ZsQZPcV5b')
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