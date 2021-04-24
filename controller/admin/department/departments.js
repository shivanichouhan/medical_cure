const depart = require("../../../model/admin/department/departments")
const path = require("path")
const cloud = require("../../../cloudinary")
const url = require("url")

exports.list_dep = (req, res) => {
    depart.find()
        .exec((err, depList) => {
            if (err) {
                res.json({code:400,msg:'department list not found'})
            }
            else {
                res.json({code:400,msg:depList})
            }
        })
}


exports.edit_department = (req, res) => {
    const all = url.parse(req.url, true).query
    console.log(all)
    depart.findOne({ _id: all.k }, { department_name: 1, department_status: 1 })
        .exec((err, depList) => {

            if (err) {
                res.json(err)
            }
            else {
                // if(req.file){

                // }
                // res.json({data:depList})
                // console.log(depList,"kjhkjhjkhjkgjhg")
                res.render(
                    path.join(__dirname, '../../../views/edit-department.ejs'),
                    { data: depList }
                )
            }
        })
}

exports.create_dep = (req, res) => {
    var departObj = new depart(req.body)
    departObj.save((err, resp) => {
        if (err) {
            res.json({code:400,msg:'department not add'})
        }
        else {
            res.json({code:400,msg:resp})
        }
    })
}

// exports.add_department = (req, res) => {
//     // add-department
//     res.render(
//         path.join(__dirname, '../../../views/add-department.ejs')

//     )
// }

exports.edit_dep =async (req, res) => {
    const { department_name, depId, description, status } = req.body
    console.log(req.body)
    const obj = {}
    if (department_name) {
        obj.department_name = department_name
    } if (description) {
        obj.description = description
    } if (status) {
        if (status == "option1") {
            obj.department_status = "Active"

        } else {
            obj.department_status = "Inactive"
        }
    } if (req.file) {
        const path_file = req.file.path
        const dep_img = await cloud.dep_images(path_file);
        console.log(dep_img, "hghghuyufgyfyt")
        obj.dep_images = dep_img.url
        depart.updateOne({ _id: depId }, { $set: obj }, (err, depUpdate) => {
            if (err) {
                res.json(err)
            }
            else {
                console.log(depUpdate)
                res.json(depUpdate)
                // res.redirect("/list_department")
            }
        })
    } else {
        depart.updateOne({ _id: depId }, { $set: obj }, (err, depUpdate) => {
            if (err) {
                res.json(err)
            }
            else {
                console.log(depUpdate)
                res.json(depUpdate)
                // res.redirect("/list_department")
            }
        })
    }
    // console.log(obj)

    // const all = url.parse(req.url,true).query
    // console.log(all,"hjghghjhgfghfghdf")

}

exports.dep_status = (req, res) => {
    if (req.body.department_status == 1) {
        depart.updateOne({ _id: req.params.depId }, { $set: { department_status: 'Active' } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    }
    else if (req.body.department_status == 0) {
        depart.updateOne({ _id: req.params.depId }, { $set: { department_status: 'Inactive' } }, (err, resp) => {
            if (err) {
                res.json(err)
            }
            else {
                res.json(resp)
            }
        })
    }
}

exports.remove_dep = (req, res) => {
    const { ids } = req.body
    console.log(req.body)
    depart.remove({ department_name: ids }, (err, depRemove) => {
        if (err) {
            res.json({code:400,msg:'department is not remove'})
        }
        else {
            res.json({code:400,msg:'department is remove'})
        }
    })
}