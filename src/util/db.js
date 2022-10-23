//Conexion con la base de datos de mysql
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "217.21.78.231",
  user: "admin",
  database: "time_att_db",
  password: "c200464786",
  port: "3306",
});

module.exports = pool.promise();
