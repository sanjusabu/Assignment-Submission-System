const sql = require("mysql2");
require("dotenv").config()
const pool = sql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    port: process.env.DBPORT,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
});

module.exports = pool.promise();