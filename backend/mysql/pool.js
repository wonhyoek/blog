const mysql   = require("mysql2/promise"),
      dbInfo = require('../Config/key');


const DB_INFO = {
  host     : dbInfo.DB_HOST,
  user     : dbInfo.DB_USER,
  password : dbInfo.DB_PASSWORD,
  database : dbInfo.DB_DEFAULT_DB,
  multipleStatements: true,
  connectionLimit:5,
  waitForConnections:false
};


module.exports = mysql.createPool(DB_INFO);