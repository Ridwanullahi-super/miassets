const  conn  = require("./connection");
const Model = require("./model");
const bcrypt = require("bcrypt");
// const saltRound = 4;

class User extends Model{
    static async login(email, pass) {
        const sql = `SELECT * FROM users WHERE users.email = ?`;
        const [result] = await conn.execute(sql, [email]);
        console.log(result);
        if (result.length > 0) {
          let user = new User(result[0]);
          const match = await bcrypt.compare(pass, user.password);
          if (match) {
            console.log(match);

            return user;
          } 
           else {
            return false;

          }
        }
    
        return false;
      }
      
      static async getName(id){
        let sql = `SELECT surname, first_name from users where id=?`
        let [rows] = await conn.execute(sql,[id])
      if(rows.length>0) {
        let row = rows[0];
        return new this(row);
      }
        return null;
      }
      // static async changePassword(suppliedPassword) {
      //   const sql = `SELECT password FROM admins WHERE id=? `;
      //   const [result] = await conn.execute(sql, [id]);
      //   if (result.length > 0) {
      //     let admin_Password = new Admin(result[0]);
      //     const match = await bcrypt.compare(admin_Password, suppliedPassword);
      //     if (match) {
      //       return admin_Password;
      //     } else {
      //       return false;
      //     }
      //   }
      // }


    name(){
        let fullName =  `${this.surname} ${this.first_name}`
        return fullName;
      }

 static async checkPass(id, suppliedPassword) {
        const sql = `SELECT password FROM users WHERE id=? `;
        const [result] = await conn.execute(sql, [id]);
        if (result.length > 0) {
          let user_Password = new User(result[0]);
          const match = await bcrypt.compare(user_Password, suppliedPassword);
          console.log(match,"password correct");
          if (match) {
            return user_Password;
          } else {
            return false;
          }
        }
      }

      static async checkEmail(email) {
        let sql = `SELECT * FROM users WHERE email =? `;
        let [result] = await conn.execute(sql, [email]);
        if (result.affectedRows > 0) {
          return result[0];
        }
      }
    
      static async findToken(token) {
        let sql = `SELECT * FROM users WHERE token = ?`;
        let [results] = await conn.execute(sql, [token]);
        if (results.length > 0) {
          let result = results[0];
          return new this(result);
        }
        return null;
      }
      
    static async userID(id){
      let result = []
      let sql = `SELECT ad.first_name, ad.surname, ad.other_name, ad.email, ad.phone_number, ad.address FROM renters rt LEFT JOIN admins ad ON rt.admin_id = ad.id  WHERE user_id =? `
      let [rows] = await conn.execute(sql,[id])
       for(const row of rows){
          result.push(new this(row))

       }
       return result;
  }
  fullName(){
    let fullname =  (` ${this.surname} ${this.first_name} ${this.other_name}`)
    return fullname;
   } 
   static async findEmail(email) {
    let sql = `SELECT * FROM users WHERE email = ?`;
    let [results] = await conn.execute(sql, [email]);
    if (results.length > 0) {
      let result = results[0];
      return new this(result);
    }
    return null;
  }
      
}



module.exports = User;