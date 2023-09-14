const User = require("../../Models/user");
const Fixed_assets = require("../../Models/fixedAssets");
const Renters = require("../../Models/renters");
const Admin = require("../../Models/admin");
const axios = require('axios');
const FormData = require("form-data")



const getAsset = async (req, res) => {
  let Assets = await Fixed_assets.fetch()

  for (let asset of Assets) {
    asset.admin = await Admin.findId(asset.admin_id)
  }
  let user_id = req?.session?.user?.id
  let RentOutstanding = await Renters.findOutRenter(user_id)
  let id = req?.session?.user?.id
  let name = await User.getName(id)
  let user = await User.findId(id)

  res.render("user/available_assets", { Assets, RentOutstanding, name,user})
}

const RentAsset = async (req, res) => {
  let id = req?.params?.id
  let Asset = await Fixed_assets.findId(id)
  let user_id = req?.session?.user?.id
  let RentOutstanding = await Renters.findOutRenter(user_id)
  Asset.admin = await Admin.findId(Asset.admin_id)
  let userId = req?.session?.user?.id
  let name = await User.getName(userId)
  let user = await User.findId(userId)

  res.render("user/payment", { Asset, RentOutstanding,name,user })
}
const postRenter = async (req, res) => {
  let user = req?.session?.user
  let id = req?.params?.id
  let Asset = await Fixed_assets.findId(id)
  let renter = new Renters(req.body)
  renter.user_id = user.id
  renter.fixed_asset_id = Asset.id
  renter.admin_id = Asset.admin_id
  renter.rent_time = new Date(new Date().getTime() + (41.66 * 24 * 60 * 60)).toISOString().slice(0, -5).replace('T', ' ')
  renter.due_time = (new Date(Number(new Date()) + (renter.month * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0, -5).replace('T', ' '))
  renter.amount = Asset.amount * renter.month;
  await renter.save()
  let user_id = req?.session?.user?.id
  let RentOutstanding = await Renters.findOutRenter(user_id)
  let name = await User.getName(user_id)
  res.redirect("/user/checkout/" + renter.id, {name})
}
// console.log(new Date(Number(new Date()) + (1 * 30 * 24 * 60 * 60 * 1000)).toISOString().slice(0,-5).replace('T', ''));

const checkout = async (req, res, next) => {
  let user = req?.session?.user;
  let user_id = req?.session?.user?.id
  let userCheck = await User.findId(user_id)
  let RentOutstanding = await Renters.findOutRenter(user_id)
  let renter = await Renters.findId(req.params.id);
  renter.asset = await Fixed_assets.findId(renter.fixed_asset_id);
  renter.user = await User.findId(renter.user_id);
  renter.admin = await Admin.findId(renter.admin_id);
  var domain = req.protocol + '://' + req.get('host');
  var data = JSON.stringify({
    "email": user.email,
    "amount": renter.amount * 100,
    "callback_url": `${domain}/user/transaction/verification/${renter.id}`,
    "metadata": {
      "cancel_action": `${domain}/user/cancel/transaction/${renter.id}`,
      "custom_fields": [
        {
          "display_name": user.first_name + " " + user.surname + " " + user.other_name,
          "variable_name": "mobile_number",
          "value": user.phone_number
        }
      ]
    }
  });

  var config = {
    method: 'post',
    url: 'https://api.paystack.co/transaction/initialize',
    headers: {
      'Authorization': `Bearer ${renter.admin.paystack_secret_key}`,
      'Content-Type': 'application/json'
    },
    data: data
  };
  axios(config)
    .then(function (response) {
      let data = response.data
      let payment_link = data.data.authorization_url

      res.render('user/checkout', {
        payment_link,
        renter,
        RentOutstanding,
        userCheck
      })
    })
    .catch(function (error) {
      console.log(error);
    });
}

let verify = async (req, res, next) => {
  let renter = await Renters.findId(req.params.id);
  var data = new FormData();
  var config = {
    method: 'get',
    url: `https://api.paystack.co/transaction/verify/${req.query.reference}`,
    headers: {
      'Authorization': `Bearer ${renter.admin.paystack_secret_key}`,
      ...data.getHeaders()  // check the console: http://miasset.com:4200/user/transaction/verification/1?trxref=ud2emeu7qq&reference=ud2emeu7qq // 
    },
    data: data
  };

  axios(config)
    .then(async function (response) {
      renter.payment_status = response.data.data.status;
      renter.payment_ref_no = req.query.reference;
      await renter.update();
      req.flash('success', 'Your payment was successful')
      res.redirect('/user/assets/')
    })
    .catch(function (error) {
      console.log(error);
    });

}

let cancel = async (req, res, next) => {
  let renter = await Renters.findId(req.params.id);
  renter.payment_status = 'cancelled';
  renter.payment_ref_no = 'payment cancelled';
  req.flash('danger', 'Payment has been cancelled')
  res.redirect('/user/checkout/' + renter.id)
  await renter.update();
}

const rentdetails = async (req, res) => {
  let id = req?.session?.user?.id
  let Assets = await Fixed_assets.assetDetails(id)
  //  let admin = await Admin?.findId(id)
  // for (let asset of Assets) {
  //   asset.renter = await Renters.findId(asset.renter_id)
  //   console.log(asset.renter)
  // }

  let user_id = req?.session?.user?.id
  let RentOutstanding = await Renters.findOutRenter(user_id)
  let name = await User.getName(user_id)
  let user = await User.findId(user_id)

  res.render("user/rent-detail", { Assets, RentOutstanding,name,user })
}

const DueDate = async (req, res) => {
  let user_id = req?.session?.user?.id
  let RentOutstanding = await Renters.findOutRenter(user_id)
  let name = await User.getName(user_id)
  let dues = await Renters.fetchAssetRent(user_id)
          let user = await User.findId(user_id)

  // console.log(dues);
  // for(let due of dues){
  //   due.asset = await Fixed_assets.findId(due.fixed_asset_id)
  // }

  
  res.render("user/due_date", { RentOutstanding,name,dues,user })
}


const getHome = (async (req, res) => {
  // console.log("session", req.session.user);
  let user_id = req?.session?.user?.id
  let RentOutstanding = await Renters.findOutRenter(user_id)
  let name = await User.getName(user_id)
  let Assets = await Fixed_assets.assetDetails(user_id)
  let asset_number = Assets.length
  let user = await User.findId(user_id)
  let RentNum = await Renters.countOutstand(user_id)
  let upperRent = await Renters.uppermostDeadline(user_id)
  let totalamount = await Renters.totalRent(user_id)
  console.log(RentNum.num,upperRent,totalamount)

  res.render('user/index.ejs', { RentOutstanding,name, asset_number,user,RentNum,upperRent,totalamount })
})


module.exports = { getHome, getAsset, RentAsset, rentdetails, DueDate, postRenter, checkout, verify, cancel }