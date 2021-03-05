const Bankaccount = require('../../model/Doctor/doctor_regis')

exports.doctor_bank = async (req, res) => {
    const {

        select_bank,
        Account_No,
        IFSC_Code,
        Phone_Number,
        Account_holder_name
    } = req.body

    const data_find = await Bankaccount.findOne({ Phone_Number: Phone_Number })

    if (data_find) {
        res.send('this is already exist')
    } else {
        const account_details = {
            select_bank: select_bank,
            Account_No: Account_No,
            IFSC_Code: IFSC_Code,
            Phone_Number: Phone_Number,
            Account_holder_name: Account_holder_name
        }
        account_details
        Bankaccount.updateOne({ _id: req.params.user_id }, { $set: account_details  })
            .then(() => {
                res.json({ Save_account_details: account_details })
            })
            .catch(e => {
                res.send(e)
            })
    }
}