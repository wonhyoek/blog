const mysql   = require("mysql"),
      Promise = require("bluebird");
      dbInfo = require('../Config/key');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_INFO = {
  host     : dbInfo.DB_HOST,
  user     : dbInfo.DB_USER,
  password : dbInfo.DB_PASSWORD,
  database : dbInfo.DB_DEFAULT_DB,
  multipleStatements: true,
  connectionLimit:5,
  waitForConnections:false
};


module.exports = class {
    constructor(dbinfo) {
      dbinfo = dbinfo || DB_INFO;
      this.pool = mysql.createPool(dbinfo);
    }
  
    connect() {
      return this.pool.getConnectionAsync().disposer(conn => {
        return conn.release();
      });
    }
  
    end() {
      this.pool.end( function(err) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>> End of Pool!!");
        if (err)
          console.log("ERR pool ending!!");
      });
    }
  };
  