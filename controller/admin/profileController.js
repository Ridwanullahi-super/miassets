const Admin = require("../../Models/admin")
const {resolve} = require("path")

const getProfile =  (async(req, res)=>{
    let id = req?.session?.admin?.id
    let admin = await Admin.findId(id)
    let name = await Admin.getName(id)
    res.render('admin/profile.ejs',{admin,name})

})

const updateProfile = (async(req, res)=>
{
         let id = req?.params?.id
        let admin = await Admin.findId(id)
        let {surname,first_name, other_name,phone_number, address, email, photo, paystack_secret_key, country, state} = req.body
        console.log(req.body);
        console.log(req.files)
        const  photos = req.files.photo
        console.log(photos);
        if (photos) {
            if (!photos.mimetype.startsWith('image/')) {
                req.flash('Error', "only image file is allowed");
                req.session.formBody = req.body
                req.session.formErrors = {}
               
            }
            if (photos.size > 5 * 1024 * 1024) {
                req.flash('Error', "File is too large. Maximum of 5mb is allowed");
                req.session.formBody = req.body
                req.session.formErrors = {}
               
            }
            admin.setObjProp(req.body); 
            const fileName = `${(Math.random() * 10).toString(36) + Number(new Date())}.${ photos.mimetype.split('/')[1]}`
            photos.mv(resolve('uploads/admin/' + fileName), (err) => {
                if (!err) {
                    admin.photo = '/admin/' + fileName
                    console.log(admin);
                   admin.updateWithOutPassword()
                  req.flash('Sucess', "picture upload successfullly");

                    // res.redirect("back")
                } else {
                    req.session.formBody = req.body
                    req.session.formErrors = {}
                    req.flash('Error', "Unable to upload your file");
                    res.redirect('back')
                }
            })
        } else
            await admin.updateWithOutPassword()
            req.flash('Sucess', "picture upload successfullly");
            res.redirect('back');
            
    }
) 
const changePass = async(req, res)=>{
let id = req?.session?.admin?.id
let admin = await Admin.findId(id)
// let {current_password, password} = req.body;/
let  current_password = req.body.current_password;
   let correct = await Admin.checkPass(id, current_password)
   console.log(correct);

   if(correct){
  let admin =  admin.setObjProp(req.body) 
console.log(admin);
     
      await admin.update()
       req.flash("success", "password successfully change!")
       res.redirect("back")
   }else{
    req.flash("danger", "password entered is not correct")
    res.redirect("back")
   }

}


module.exports = {getProfile, updateProfile,changePass};