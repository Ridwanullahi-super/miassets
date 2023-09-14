const Renters = require("../../Models/renters")
const User = require("../../Models/user")
const {resolve} = require("path")

const getProfile =  (async(req, res)=>{
    let id = req?.session?.user?.id
    let user = await User.findId(id)
    let user_id =req?.session?.user?.id
    let RentOutstanding = await Renters.findOutRenter(user_id)
    let name = await User.getName(id)
    res.render('user/profile.ejs',{user,RentOutstanding,name})

})

const updateProfile = (async(req, res)=>
{
         let id = req?.params?.id
        let user = await User.findId(id)
        let {surname,first_name, other_name,phone_number, address, email, photo,country, state} = req.body
        console.log(req.body);
        console.log(req.files);
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
            user.setObjProp(req.body); 
            const fileName = `${(Math.random() * 10).toString(36) + Number(new Date())}.${ photos.mimetype.split('/')[1]}`
            photos.mv(resolve('uploads/user/' + fileName), (err) => {
                if (!err) {
                    user.photo = '/user/' + fileName
                    console.log(user);
                   user.updateWithOutPassword()
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
            await user.updateWithOutPassword()
            req.flash('Sucess', "picture upload successfullly");
            res.redirect('back');
            
    }
)

const changePass = async(req, res)=>{
let id = req?.session?.user?.id
let user = await User.findId(id)
// let {current_password, password} = req.body;/
let  current_password = req.body.current_password;
   let correct = await User.checkPass(id, current_password)
   console.log(correct);

   if(correct){
  let user =  user.setObjProp(req.body) 
console.log(user);
     
      await user.update()
       req.flash("success", "password successfully change!")
       res.redirect("back")
   }else{
    req.flash("danger", "password entered is not correct")
    res.redirect("back")
   }

}


module.exports = {getProfile, updateProfile,changePass};