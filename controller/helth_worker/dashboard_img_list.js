const { response } = require("express")
const listBanner = require("../../model/admin/banner_img")
const listOffer = require("../../model/admin/offer_img")

exports.bannerList =(req,res)=>{
listBanner.findOne()
.select('banner_img')
.then((resp)=>{
    res.json(resp)
}).catch((error)=>{
    res.json(error)
})
}

exports.offerList =(req,res)=>{
    listOffer.findOne()
    .select('offer_img')
    .then((resp)=>{
        res.json(resp)
    }).catch((error)=>{
        res.json(error)
    })
}
    