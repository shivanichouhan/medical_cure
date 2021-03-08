const AdminApprove = require('../../model/helth_worker/users')

exports.AdminApprove = async (req, res) => {
    const {
        approval_status
    } = req.body

    if (approval_status == '0') {
        res.send("not approve")
    } else if (approval_status == "1") {

        const data_find = await AdminApprove.findById(req.params.id)
        if (!data_find) {
            res.send('this is not already exist')
        } else {
            AdminApprove
                .findByIdAndUpdate(req.params.id, { $set: { approval_status: "1" } })
                .then((resp) => {
                    res.json({ HealthWorker_details: "Approve Successfuly" })
                })
                .catch(e => {
                    res.send(e)
              })
        }
    }
}
