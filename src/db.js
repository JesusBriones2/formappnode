const mysql = require('mysql');

const con = mysql.createConnection({
  user: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWD || "root1234",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "prueba"
});


function connect() {
  con.connect(err => {
    if (err) console.log("Error: connect database.");
    else console.log("Database connected.");
  });
}

function execute(sql, fn) {
  con.query(sql, (err, rows) => {
    err ? fn("Error: execute database.") : fn(rows);
  });

  con.end(err => {
    if (err) console.log("Error: close database.");
    console.log('Database connection closed.');
  });
}


module.exports = {
  connect,
  execute
}