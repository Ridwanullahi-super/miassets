const  conn  = require("./connection");
const Model = require( "./model");
const bcrypt = require("bcrypt");
// const saltRound = 4;

class Admin extends Model{
    static async login(email, pass) {
        const sql = `SELECT * FROM admins WHERE admins.email = ?`;
        const [result] = await conn.execute(sql, [email]);
        console.log(result);
        if (result.length > 0) {
          let admin = new Admin(result[0]);
          const match = await bcrypt.compare(pass, admin.password);
          if (match) {
            console.log(match);

            return admin;
          } 
           else {
            return false;

          }
        }
    
        return false;
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
        const sql = `SELECT password FROM admins WHERE id=? `;
        const [result] = await conn.execute(sql, [id]);
        if (result.length > 0) {
          let admin_Password = new Admin(result[0]);
          const match = await bcrypt.compare(admin_Password, suppliedPassword);
          console.log(match,"password correct");
          if (match) {
            return admin_Password;
          } else {
            return false;
          }
        }
      }

      static async checkEmail(email) {
        let sql = `SELECT * FROM admins WHERE email =? `;
        let [result] = await conn.execute(sql, [email]);
        if (result.affectedRows > 0) {
          return result[0];
        }
      }
    
      static async findEmail(email) {
        let sql = `SELECT * FROM admins WHERE email = ?`;
        let [results] = await conn.execute(sql, [email]);
        if (results.length > 0) {
          let result = results[0];
          return new this(result);
        }
        return null;
      }
    
      static async getName(id){
        let sql = `SELECT surname, first_name from admins where id=?`
        let [rows] = await conn.execute(sql,[id])
      if(rows.length>0) {
        let row = rows[0];
        return new this(row);
      }
        return null;
      }
      static async findToken(token){
          let sql = `SELECT * From admins WHERE token = ?`
          let [rows] = await conn.execute(sql,[token])
        if(rows.length>0) {
          let row = rows[0];
          return new this(row);
        }
          return null;
        }
   async latestUpdate(){
          let sql = `UPDATE admins SET surname= ?, first_name = ?, other_name =?, phone_number = ?, address = ?, email = ?, photo =?, password = ?, paystack_secret_key=?, country = ?,  state = ?, token = ? `
          let [result] = await conn.execute(sql, [surname, first_name, other_name, phone_number, address, email, photo, password, patstack_secret_key, country, state, token ])
          return result.affectedRows>0;

        }
      
}



module.exports = Admin;