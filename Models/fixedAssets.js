const Model = require("./model");
const conn = require("./connection");


class Fixed_assets extends Model {
    static async adminID(id){
        let result = [];
        let sql = `SELECT * FROM fixed_assets WHERE admin_id = ? `
        let [rows] = await conn.query(sql,id);
        for(const row of rows){
            result.push(new this(row))
        }
        return result;
       
    }
    static async userID(id){
        let result = [];
        let sql = `SELECT * FROM fixed_assets WHERE user_id = ? `
        let [rows] = await conn.query(sql,id);
        for(const row of rows){
            result.push(new this(row))
        }
        return result;
       
    }
    static async assetId(id){
        let result = []
        let sql = `SELECT id, name FROM fixed_assets WHERE admin_id =? `
        let [rows] = await conn.execute(sql,[id])
         for(const row of rows){
            result.push(new this(row))
  
         }
         return result;
     }
    static async assetDetails(id){
        let result = []
        let sql = `SELECT fs.name, fs.buyers_name, fs.address, fs.company_name, rt.amount, us.surname, us.first_name, rt.due_time FROM renters rt LEFT JOIN fixed_assets fs ON rt.fixed_asset_id = fs.id LEFT JOIN users us ON  rt.user_id = us.id WHERE rt.user_id = ?`
        let [rows] = await conn.execute(sql,[id])
         for(const row of rows){
            result.push(new this(row))
  
         }
         return result;
    }
    static async assetDetailsAdmin(id){
        let result = []
        let sql = `SELECT fs.name, rt.amount, ad.surname, ad.first_name, rt.due_time FROM renters rt LEFT JOIN fixed_assets fs ON rt.fixed_asset_id = fs.id LEFT JOIN admins ad ON  rt.admin_id = ad.id WHERE rt.admin_id = ?`
        let [rows] = await conn.execute(sql,[id])
         for(const row of rows){
            result.push(new this(row))
  
         }
         return result;
    }

}
module.exports = Fixed_assets;
