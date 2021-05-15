const helpLineSpecelization = require("../../model/helpLine_App/helpLine _specelization");


exports.helpLine_specelization = (req, res) => {
    var stateObj = new helpLineSpecelization(req.body)
    stateObj.save((err, resp) => {
        if (err) {
            res.json(err)
        }
        else {
            res.json({ data: resp })
        }
    })
}


exports.helpLine_specelization_list = (req, res) => {
    helpLineSpecelization.find()
        .exec((err, st) => {
            if (err) {
                res.json({ code: 400, msg: 'specelization list not found' })
            }
            else {
                res.json({ code: 200, 'specelization': st })
            }
        })
}