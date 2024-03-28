const sql = require("mysql2");
require("dotenv").config()
console.log(process.env.HOST,process.env.DBPORT,process.env.DBUSER)
const pool = sql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
});

module.exports = pool.promise();