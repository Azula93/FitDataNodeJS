const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || '',
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('MySQL connected as id ' + connection.threadId);
});

module.exports = connection;
