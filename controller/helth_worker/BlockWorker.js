const Blockworker = require('../../model/helth_worker/users')

exports.Blockworker = async (req, res) => {
    const {
        BlockUser_status
    } = req.body

    if (BlockUser_status == '0') {
        res.send({ HealthWorker_details: " Health Worker UNBlocked" })
    } else if (BlockUser_status == "1") {
        const data_find = await Blockworker.findById(req.params.id)
        if (!data_find) {
            res.send('this is not already exist')
        } else {
            Blockworker
                .findByIdAndUpdate(req.params.id, { $set: { BlockedUser_status: "1" } })
                .then((resp) => {
                    res.json({ HealthWorker_details: "Health Worker Blocked" })
                })
                .catch(e => {
                    res.send(e)
                })
        }
    }
}