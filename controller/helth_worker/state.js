const states = require('../../model/helth_worker/state')
const bank = require("../../model/helth_worker/bankList")

exports.bankadd =(req,res)=>{
    var bankObj = new bank(req.body)
    bankObj.save((err,data)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json(data)
        }
    })
}

exports.listBank =(req,res)=>{
    bank.find().exec((err,ListBank)=>{
        if(err || !ListBank){
            res.json({code:400,msg:'bank list not found'})
        }
        else{
            res.json({code:200,msg:ListBank})
        }
    })
}

exports.add_state = (req, res) => {
    const { state } = req.body;
    const data = new states({
        State: state
    })
    data.save()
        .then((response) => {
            res.json({ code: 200, msg: "state save" })
        })

}

exports.state_list = (req, res) => {
    states.find()
        .then((resp) => {
            res.json({ code: 200, msg: resp })
        }).catch((err) => {
            res.json({ code: 400, msg: "something wrong" })
        })
}

exports.delete_state = (req, res) => {
    const {state_id}=req.body
    states.deleteOne({ _id: state_id })
        .then((resp) => {
            res.send("delete states")
        }).catch((err) => {
            res.send("something wrong")
        })
}