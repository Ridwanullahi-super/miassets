const {Router} = require('express');
const { addAssets, sendAssets, getAsset, updateAsset, deleteAsset, getHome } = require('../controller/admin/assetController');
const { addRenters, sendRenter, getRenters, deleteRenter, updateRenter } = require('../controller/admin/renterController');
const { getProfile, updateProfile, changePass } = require('../controller/admin/profileController');
const { getDepreciate, updateDepreciate } = require('../controller/admin/depreciationController');
const { getProfit } = require('../controller/admin/profitController');
const { getRemind, sendEmail } = require('../controller/admin/remiderController');
const assetValidator = require('../validators/assetValidator');
const { creatAccount, newadmin } = require('../controller/admin/adminController');

const admin = Router ();




// create account handleler
admin.get('/add-admin', creatAccount)
admin.post('/add-admin', newadmin)



admin.get("/add-asset", addAssets)
admin.post("/add-asset", assetValidator, sendAssets)

admin.get("/add-renter", addRenters)
admin.post("/add-renter", sendRenter)
admin.get("/renters", getRenters)
admin.get("/renter/delete/:id", deleteRenter)
admin.post("/renter/update/:id", updateRenter)

admin.get("/assets", getAsset)
admin.post("/asset/update/:id", updateAsset)
admin.get("/asset/delete/:id", deleteAsset)

admin.get('/home', getHome )
    
admin.get('/profile', getProfile)
admin.post('/profile', changePass)
admin.post('/profile/update/:id', updateProfile)

admin.get("/depreciate", getDepreciate)
admin.post("/depreciate/update/:id", updateDepreciate)

admin.get("/profit", getProfit)

admin.get("/reminder", getRemind)
admin.post("/reminder", sendEmail)

// export part
module.exports = admin;