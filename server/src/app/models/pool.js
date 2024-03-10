const mysql = require('mysql');
const sql = require('mssql')
const sqlConfig = require('../configs/db')


const pool = mysql.createPool(sqlConfig);
pool.query('SELECT 2001 + 79 AS solution', function (error, results, fields) {
    if (error) throw error;
        console.log('Connect to MySql successfully with password: ', results[0].solution);
    });

  
module.exports = pool;


//const pool = sql.connect(sqlConfig);
// async () => {
//   try {
//     // 
//     await sql.connect(sqlConfig)
//     const result = await sql.query`SELECT 2001 + 79 AS pass`
//     console.log('Connect to MySql successfully with password: ', result[0].pass)
//   } catch (err) {
//   // ... error checks
//   }
// }