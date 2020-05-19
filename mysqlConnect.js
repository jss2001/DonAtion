var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0525',
  database : 'fintech'
});
 
connection.connect();
 
connection.query('SELECT * FROM fintech.user;', function (error, results, fields) {
  if (error) throw error;
  console.log('user list is : ', results);
});
 
connection.end();
