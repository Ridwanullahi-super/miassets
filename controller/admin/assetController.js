const { name } = require("ejs");
const Admin = require("../../Models/admin");
const Fixed_assets = require("../../Models/fixedAssets");
const Renters = require("../../Models/renters");

const addAssets = async(req, res)=>{
    let id = req?.session?.admin?.id;
    let name = await Admin.getName(id)
    console.log(name.surname)
    let Assets = await Fixed_assets.adminID(id)
    let admin_id = req?.session?.Fixed_assets?.admin_id
    let admin = await Admin.findId(id)
    res.render('admin/add-asset.ejs',{admin_id,Assets, name, admin});
}

const sendAssets = async (req, res)=>{
    let admin = req?.session?.admin?.id
    try {
        let asset = new Fixed_assets(req.body)
        asset.admin_id = admin
        await asset.save()
        req.flash("success","you successfully added one assets")
        res.redirect('/admin/assets')
    } catch (error) {
        console.log(error.status);
        req.flash("danger","Failed! to add new asset")
        req.redirect("back")
    }
}

 const getAsset = (async(req, res)=>{
    let id = req?.session?.admin?.id;
    let Assets = await Fixed_assets.adminID(id)
    let admin_id = req?.session?.Fixed_assets?.admin_id
    let name = await Admin.getName(id)
    let admin = await Admin.findId(id)

        res.render("admin/fixed_assets",{Assets, admin_id,name,admin})
 })

const deleteAsset = (async(req, res)=>{
    try {
        let asset = await Fixed_assets.findId(req?.params?.id)
        await asset.delete();
        req.flash("success", "Asset deleted successfully!")
        res.redirect("back")
        
    } catch (error) {
        console.log(error,);
        req.flash("danger","unable to delete Asset")
        res.redirect("back")
    }
})

const updateAsset = (async (req, res)=>{
    try {
        let id = req?.params?.id
        let asset = await Fixed_assets.findId(id)
        // console.log(asset);
        console.log();
        asset.setObjProp(req.body)
        await asset.update()
        req.flash("success", "Asset updated successfully")
        res.redirect("/admin/assets")
    } catch (error) {
        req.flash("danger", "unable to update Asset")
        res.redirect("/admin/assets")
     throw error
    }
})
const getHome = (async(req, res)=>{
    console.log("session",req.session.admin);
    let id = req?.session?.admin?.id;
    let graphs = await Fixed_assets.assetDetailsAdmin(id)
//     const asset_names = graphs.map((item)=>item.name)
//     const due_times = graphs.map((item)=>item.due_time)
//     for (let i = 0; i<asset_names.length; i++) {
//         const asset_name = asset_names[i];
//         const due_time = due_times[i];
// console.log(asset_name, due_time)       
//     }
let assetName = []
let assetDueDate = []
for (let graph of graphs) {
    
    var assname= assetName.push(graph.name);
    var assedue = assetDueDate.push(graph.due_time)
  
   console.log(assedue,assname)
}
    let adminAssets = await Fixed_assets.adminID(id)
    let AssetNumber = adminAssets.length
    let RentoutAsset = await Renters.fetchRenterByAdminID(id)
   let outasset = RentoutAsset.length
    let name = await Admin.getName(id)
    let admin = await Admin.findId(id)
    let expense = await Renters.adminExpense(id)
    let expenses = expense.expenses

    console.log(AssetNumber);
    res.render('admin/index.ejs',{name, graphs, admin, AssetNumber, outasset, expenses})
})


module.exports ={addAssets, getHome, getAsset, sendAssets,deleteAsset, updateAsset}