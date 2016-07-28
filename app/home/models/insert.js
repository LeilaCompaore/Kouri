
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'leila',
    password: 'password',
    database: 'Kouri-schema'
});
connection.connect();