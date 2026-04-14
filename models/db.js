require("dotenv").config();
var mysql = require("mysql2");
var util = require("util");

var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("MySQL Database Connection Failed");
        console.log(err);
    } else {
        console.log("MySQL Database Connected Successfully");
        connection.release();
    }
});

var exe = util.promisify(pool.query).bind(pool);

module.exports = exe;

