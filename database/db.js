const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'Azula93!$%',
  database: process.env.DB_DATABASE || 'fitdataDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('MySQL connected as id ' + connection.threadId);
});

module.exports = connection;
