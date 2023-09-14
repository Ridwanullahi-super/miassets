// const Fixed_assets = require("../../Models/fixedAssets");

// const getDepreciate = (async(req, res)=>{
//         let id = req?.session?.user?.id;
//         let depreciate = await Fixed_assets.adminID(id)
//     let admin_id = req?.session?.Fixed_assets?.admin_id
//     res.render("user/depreciation",{depreciate, admin_id})
// })

// const updateDepreciate = async(req, res)=>{
//     try {
//         let id = req?.params?.id
//         let asset = await Fixed_assets.findId(id)
//         // console.log(asset);
//         asset.setObjProp(req.body)
//         await asset.update()
//         req.flash("success", "Asset updated successfully")
//         res.redirect("back")
//     } catch (error) {
//         req.flash("danger", "unable to update Asset")
//         res.redirect("back")
//      throw error
//     }
// }

// // export part
// module.exports = {getDepreciate,updateDepreciate}