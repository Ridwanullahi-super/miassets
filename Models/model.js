  const conn = require("./connection");
const pluralize = require("pluralize");
const bcrypt = require("bcrypt");
// const User = require("./user");
const salt = 10;

class Model {
  constructor(obj = {}) {
    this.setObjProp(obj);
  }
  setObjProp(obj) {
    for (const key in obj) {
      this[key] = obj[key];
    }
  }

  static get tableName() {
    return pluralize(
     this.name.replace(/.[A-Z]/, (v) => v[0] + "_" + v[1])
    ).toLowerCase();
  }

  async save() {
    try {
      if (this.password) {
        this.password = await bcrypt.hash(this.password, salt);
      }
      let columns = Object.keys(this);
      let values = Object.values(this);
      console.log(columns, values);
      let sql = `INSERT INTO ${this.constructor.tableName} (${columns.join(
        ", "
      )}) VALUES (${"?".repeat(columns.length).split("").join(", ")})`;
      let [result] = await conn.execute(sql, values);
      this.id = result.insertId;
      return result.insertId;
    } catch (error) {
      console.log(error);
    }
  }

  static async fetch(filter = {}) {
    let results = [];
    let sql = `SELECT * FROM ${this.tableName}`;
    if (Object.keys(filter).length > 0) {
      let i = 0;
      for (const prop in filter) {
        if (i == 0) sql += ` WHERE ${prop} = ?`;
        else sql += ` AND ${prop} = ?`;
        i++;
      }
    }
    let [rows] = await conn.execute(sql, Object.values(filter));
    for (let row of rows) {
      results.push(new this(row));
    }
    return results;
  }

  static async findId(id) {
    let sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    let [results] = await conn.execute(sql, [id]);
    if (results.length > 0) {
      let result = results[0];
      return new this(result);

    }
    return null;
  }

  async update() {
    try {
      
      if (this.password) {
        this.password = await bcrypt.hash(this.password, salt);
      }
      let sql = `UPDATE ${this.constructor.tableName} SET `;
      let { id, ...prop } = this;
      let columns = Object.keys(prop);
      let values = Object.values(prop);
      let i = 0;
      for (const column of columns) {
        sql += ` ${column} = ?${i < columns.length - 1 ? "," : ""}`;
        i++;
      }
      sql += ` WHERE id = ${this.id}`;
      let [result] = await conn.execute(sql, values);
      // console.log(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.log(error)
    }
  }

  async updateWithOutPassword() {
    try {
      let sql = `UPDATE ${this.constructor.tableName} SET `;
      let { id, ...prop } = this;
      let columns = Object.keys(prop);
      let values = Object.values(prop);
      let i = 0;
      for (const column of columns) {
        sql += ` ${column} = ?${i < columns.length - 1 ? "," : ""}`;
        i++;
      }
      sql += ` WHERE id = ${this.id}`;
      let [result] = await conn.execute(sql, values);
      // console.log(sql, values);
      return result.affectedRows > 0;
    } catch (error) {
      console.log(error)
    }
  }

 async delete() {
    let sql = `DELETE FROM ${this.constructor.tableName} where id = ${this.id}`;

    console.log(sql);
    let [result] = await conn.execute(sql);


      return result.affectedRows > 0;
  }

  // to construct methods


  toString() {
    return this.name || "No string representation of the object";
  }
}
module.exports = Model;
