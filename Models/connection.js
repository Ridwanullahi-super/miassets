const mysql = require('mysql2')
// const util = require("util")
 
const connection = mysql.createConnection({
    // host:"localhost",
    // user:"root",
    // password:'',
    // database:"mi_assets"

    host: 'db4free.net',
    user: 'super123',
    password: 'asdfghjkl',
    database: 'mi_assets',
    port:3306
})

connection.connect(err =>console.log(err || "database is connected!" ));
// let query = util.promisify(connection.query.bind(connection))
// var conn = connection.promise()
module.exports = connection.promise();
// module.exports = {conn, query}