const Contact = require('../../model/helth_worker/Contacts_model');

const cloudenary = require('cloudinary').v2

cloudenary.config({
    cloud_name: 'dha2sjb75',
    api_key: '893623795746522',
    api_secret: '3dwh3SUUvf0yEsLU-Fl1O-yi8Tw'
})


exports.Contact_data = (req, res) => {
    const {
        image,
        Description,
        Contact_No,
        Emailid,
        Website } = req.body

    const data = new Contact({
        image: image,
        Description: Description,
        Contact_No: Contact_No,
        Emailid: Emailid,
        Website: Website,
        image: image.secure_url
    })
    data.p_id = data._id
    data.save()
        .then((resp) => {
            res.json({ code: 200, msg: "data save" })
        })
}


